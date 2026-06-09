import os
import subprocess
import json
import requests
from concurrent.futures import ThreadPoolExecutor

# Obtener userId y userName desde los argumentos de la línea de comandos
# USER_ID = sys.argv[1]
# USER_NAME = sys.argv[2]
USER_ID = "2433312"
USER_NAME = "bbbbb"

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
        r = requests.get(url, stream=True, timeout=60)
        r.raise_for_status()

        with open(path, "wb") as f:
            for chunk in r.iter_content(chunk_size=1024 * 1024):
                if chunk:
                    f.write(chunk)

        print(f"✔️ Descargado: {path}")

    except Exception as e:
        print(f"❌ Error al descargar {url}: {e}")


# Obtener lista de álbumes
albums_url = f"https://app.wyylde.com/rest/medias/{USER_ID}"
resp = requests.get(albums_url, headers=headers)
resp.raise_for_status()

content = resp.json().get("data", {}).get("content", [])

# Guardar en archivo JSON
with open("content.json", "w", encoding="utf-8") as f:
    json.dump(content, f, ensure_ascii=False, indent=4)

# albums = []
albums = [{'id': 'f12f3e90-6aa4-11ef-88e9-af6b7ea3024d', 'title': 'Lives privés'}]
pictures_root = []

# for item in content:
#     if not isinstance(item, dict):
#         continue

#     item_type = item.get("type")

#     # 🔹 Guardar imágenes directas (fuera de álbum)
#     if item_type == "picture":
#         img_url = item.get("properties", {}).get("full")
#         if img_url:
#             pictures_root.append({"id": item.get("id"), "url": img_url})
#         continue

#     # 🔹 Guardar álbumes
#     if item_type == "album":
#         album_id = item.get("id")
#         title = item.get("title", "")

#         parent = item.get("parent_album")
#         if parent and isinstance(parent, dict):
#             parent_id = parent.get("id")
#             if parent_id:
#                 album_id = parent_id

#         albums.append({"id": album_id, "title": title})


root_dir = os.path.join(BASE_DIR, "0")
os.makedirs(root_dir, exist_ok=True)

print(f"Descargando {len(pictures_root)} imágenes root...")


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
    "-headers",
    f"Authorization: Bearer {session_token}\r\n",
    "-i",
    m3u8_url,
    "-c:v",
    "libx264",
    "-c:a",
    "aac",
    output_path,
]
    # cmd = [
    #     "ffmpeg",
    #     "-y",
    #     "-loglevel",
    #     "error",
    #     "-i",
    #     m3u8_url,
    #     "-c",
    #     "copy",
    #     "-bsf:a",
    #     "aac_adtstoasc",
    #     output_path,
    # ]

    result = subprocess.run(cmd)

    if result.returncode != 0:
        print(f"❌ Error descargando: {output_path}")


def normalize_url(url: str) -> str:
    if not url:
        return None
    
    # Caso 1: ruta relativa API
    if url.startswith("/"):
        return "https://app.wyylde.com" + url

    return url


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

        # TODO DEBUG
        # Guardar a fichero JSON
        # with open('content.json', 'w', encoding='utf-8') as f:
        #     json.dump(content, f, ensure_ascii=False, indent=2)

        # Filtrar lives
        lives = [item for item in content if item.get("type") == "show"]

        print(f"{len(lives)} lives en álbum {url_id}")

        for live in lives:
            # sources = live.get("properties", {}).get("sources", [])
            format = live.get("properties", {}).get("format")
            url_play = live.get("properties", {}).get("play")

             # Solo aplicar normalización si es HLS
            if format == "application/x-mpegURL":
                video_url = normalize_url(url_play)
            else:
              print(f"url_play: {url_play}\n")

            # DEBUG ###################################################################
            # r = requests.get(video_url, headers=headers)

            # print("====================================")
            # print("LIVE:", live["id"])
            # print("URL:", video_url)
            # print("STATUS:", r.status_code)
            # print("CONTENT-TYPE:", r.headers.get("content-type"))
            # print(r.text[:1000])
            # print("====================================")
            # #########################################################################

            # filename = f"{live['id']}.mp4"
            # filepath = os.path.join(album_dir, filename)

            # # Evitar descargar duplicados
            # if os.path.exists(filepath):
            #     print(f"⏭️ Ya existe: {filename}")
            #     continue

            # print(f"⬇️ Descargando live {live['id']}")

            # if format == "application/x-mpegURL":
            #     download_hls_to_mp4(video_url, filepath)
            # else:
            #     download_file(video_url, filepath)

    except Exception as e:
        print(f"❌ Error en lives álbum {url_id}: {e}")

# //=========================================================================

with ThreadPoolExecutor(max_workers=3) as executor:
    executor.map(process_album_lives, albums)

# Eliminar carpetas vacías
def remove_empty_dirs(base_path):
    for root, dirs, files in os.walk(base_path, topdown=False):
        for d in dirs:
            dir_path = os.path.join(root, d)
            if not os.listdir(dir_path):
                os.rmdir(dir_path)
                print(f"🗑 Carpeta vacía eliminada: {dir_path}")


remove_empty_dirs(BASE_DIR)
