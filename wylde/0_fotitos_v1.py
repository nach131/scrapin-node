import os
import subprocess
import sys
import json
import requests
from concurrent.futures import ThreadPoolExecutor

# Obtener userId y userName desde los argumentos de la línea de comandos
USER_ID = sys.argv[1]
USER_NAME = sys.argv[2]

# Carpeta raíz para todo el contenido
BASE_DIR = f"{USER_ID}@{USER_NAME}"
os.makedirs(BASE_DIR, exist_ok=True)

# Leer y parsear el fichero JSON
with open("./cookies.json", "r", encoding="utf-8") as file:
    cookies_data = json.load(file)

# Buscar el valor de la cookie que necesitas
session_token = next(
    (cookie["value"] for cookie in cookies_data if cookie["name"] == "session_token"),
    None,
)

if not session_token:
    raise ValueError("No se encontró la cookie 'session_token' en cookies.json")

# Headers
headers = {
    "authority": "www.wyylde.com",
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "authorization": f"Bearer {session_token}",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "referer": f"https://www.wyylde.com/es-es/mediacenter/user/{USER_ID}",
    "sec-ch-ua": '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    "x-device": "desktop",
    "x-version": "1682423351",
}


# Descargar una imagen
def download_file(url, path):
    try:
        r = requests.get(url, stream=True)
        r.raise_for_status()
        with open(path, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Imagen descargada: {path}")
    except Exception as e:
        print(f"❌ Error al descargar {url}: {e}")


# Obtener lista de álbumes
# albums_url = f"https://www.wyylde.com/rest/mc/{USER_ID}/albums"
albums_url = f"https://app.wyylde.com/rest/medias/{USER_ID}"
resp = requests.get(albums_url, headers=headers)
resp.raise_for_status()

content = resp.json().get("data", {}).get("content", [])

# Agregar el álbum "cero"
# albums.append({"id": 0, "url_id": "0", "visibility": "public"})

# Guardar en archivo JSON
with open("content.json", "w", encoding="utf-8") as f:
    json.dump(content, f, ensure_ascii=False, indent=4)

albums = []

for item in content:
    # Ignorar cosas raras tipo {"type": "private_content"}
    if not isinstance(item, dict):
        continue

    # Solo queremos álbumes
    if item.get("type") != "album":
        continue

    album_id = item.get("id")
    title = item.get("title", "")

    # Si tiene parent_album, usar ese ID
    parent = item.get("parent_album")
    if parent and isinstance(parent, dict):
        parent_id = parent.get("id")
        if parent_id:
            album_id = parent_id

    albums.append({"id": album_id, "title": title})

# print(albums)


# Procesar álbumes descarga fotos
def process_album(album):
    url_id = album.get("id")
    album_name = album.get("title", "").strip()

    if not url_id:
        return

    # Nombre seguro de carpeta
    if album_name:
        safe_name = "".join(c for c in album_name if c.isalnum() or c in " _-").strip()
        # album_dir_name = f"{url_id}#{safe_name}"
        album_dir_name = f"{safe_name}"
    else:
        album_dir_name = url_id

    album_dir = os.path.join(BASE_DIR, album_dir_name)
    os.makedirs(album_dir, exist_ok=True)

    album_url = f"https://app.wyylde.com/rest/medias/{USER_ID}?albumId={url_id}"

    try:
        res = requests.get(album_url, headers=headers)
        res.raise_for_status()

        content = res.json().get("data", {}).get("content", [])

        # Filtrar solo imágenes
        pictures = [item for item in content if item.get("type") == "picture"]

        print(f"{len(pictures)} imágenes en álbum {url_id}")

        for pic in pictures:
            img_url = pic.get("properties", {}).get("full")

            if img_url:
                filename = f"{pic['id']}.jpg"
                filepath = os.path.join(album_dir, filename)
                download_file(img_url, filepath)

    except Exception as e:
        print(f"❌ Error al procesar álbum {url_id}: {e}")


def get_best_source(sources):
    priority = ["1080p", "720p", "480p", "360p", "240p"]

    for p in priority:
        for s in sources:
            if s.get("resolution") == p:
                return s.get("url")
    return None


def download_hls_to_mp4(m3u8_url, output_path):
    cmd = [
        "ffmpeg",
        "-y",
        "-loglevel",
        "error",
        "-i",
        m3u8_url,
        "-c",
        "copy",
        "-bsf:a",
        "aac_adtstoasc",
        output_path,
    ]

    result = subprocess.run(cmd)

    if result.returncode != 0:
        print(f"❌ Error descargando: {output_path}")


def process_album_lives(album):
    url_id = album.get("id")
    album_name = album.get("title", "").strip()

    if not url_id:
        return

    # Nombre seguro
    safe_name = "".join(c for c in album_name if c.isalnum() or c in " _-").strip()
    album_dir = os.path.join(BASE_DIR, safe_name or url_id)
    os.makedirs(album_dir, exist_ok=True)

    album_url = f"https://app.wyylde.com/rest/medias/{USER_ID}?albumId={url_id}"

    try:
        res = requests.get(album_url, headers=headers)
        res.raise_for_status()

        content = res.json().get("data", {}).get("content", [])

        # Filtrar lives
        lives = [item for item in content if item.get("type") == "show"]

        print(f"{len(lives)} lives en álbum {url_id}")

        for live in lives:
            sources = live.get("properties", {}).get("sources", [])
            video_url = get_best_source(sources)

            if not video_url:
                print(f"⚠️ Sin source válido: {live['id']}")
                continue

            # Completar URL
            if video_url.startswith("/"):
                video_url = "https://app.wyylde.com" + video_url

            filename = f"{live['id']}.mp4"
            filepath = os.path.join(album_dir, filename)

            # Evitar descargar duplicados
            if os.path.exists(filepath):
                print(f"⏭️ Ya existe: {filename}")
                continue

            print(f"⬇️ Descargando live {live['id']}")

            download_hls_to_mp4(video_url, filepath)

    except Exception as e:
        print(f"❌ Error en lives álbum {url_id}: {e}")


def process_videos(album):
    url_id = album.get("id")
    album_name = album.get("title", "").strip()

    if not url_id:
        return

    # Nombre carpeta
    safe_name = "".join(c for c in album_name if c.isalnum() or c in " _-").strip()
    album_dir = os.path.join(BASE_DIR, safe_name or url_id)
    os.makedirs(album_dir, exist_ok=True)

    album_url = f"https://app.wyylde.com/rest/medias/{USER_ID}?albumId={url_id}"

    try:
        res = requests.get(album_url, headers=headers)
        res.raise_for_status()

        content = res.json().get("data", {}).get("content", [])

        videos = [item for item in content if item.get("type") == "video"]

        print(f"{len(videos)} vídeos en álbum {url_id}")

        for vid in videos:
            props = vid.get("properties", {})
            video_id = vid.get("id")

            filepath = os.path.join(album_dir, f"{video_id}.mp4")

            # 🔹 1. Intentar MP4 directo
            mp4_url = props.get("play")

            try:
                if mp4_url:
                    download_file(mp4_url, filepath)  # reutilizas tu función
                    continue
            except:
                print(f"⚠️ fallback a HLS para {video_id}")

            # 🔹 2. fallback a HLS (1080p)
            sources = props.get("sources", [])
            best_url = get_best_source(sources)

            if best_url:
                download_hls_to_mp4(best_url, filepath)

    except Exception as e:
        print(f"❌ Error en vídeos {url_id}: {e}")


# //=========================================================================
# Ejecutar con concurrencia
with ThreadPoolExecutor(max_workers=2) as executor:
    executor.map(process_album, albums)

with ThreadPoolExecutor(max_workers=3) as executor:
    executor.map(process_album_lives, albums)

with ThreadPoolExecutor(max_workers=2) as executor:
    executor.map(process_videos, albums)


# Eliminar carpetas vacías
def remove_empty_dirs(base_path):
    for root, dirs, files in os.walk(base_path, topdown=False):
        for d in dirs:
            dir_path = os.path.join(root, d)
            if not os.listdir(dir_path):
                os.rmdir(dir_path)
                print(f"🗑 Carpeta vacía eliminada: {dir_path}")


remove_empty_dirs(BASE_DIR)
