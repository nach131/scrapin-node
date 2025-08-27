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
def download_image(url, path):
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
albums_url = f"https://www.wyylde.com/rest/mc/{USER_ID}/albums"
resp = requests.get(albums_url, headers=headers)
resp.raise_for_status()

albums = resp.json().get("data", {}).get("albums", [])

# Agregar el álbum "cero"
albums.append({"id": 0, "url_id": "0", "visibility": "public"})

print(f"📂 Álbumes encontrados: {len(albums)}")


# Procesar álbumes
def process_album(album):
    url_id = album.get("url_id")
    album_name = album.get("title", "").strip()  # Eliminar espacios extra

    if not url_id:
        return

    if album_name:
        # Reemplazar caracteres no válidos en nombres de carpetas
        safe_name = "".join(c for c in album_name if c.isalnum() or c in " _-").strip()
        album_dir_name = f"{url_id}#{safe_name}"
    else:
        album_dir_name = url_id

    album_dir = os.path.join(BASE_DIR, album_dir_name)
    os.makedirs(album_dir, exist_ok=True)

    album_url = f"https://www.wyylde.com/rest/mc/{USER_ID}/album/{url_id}?nocache=1677227835635&version=4.1.0"
    try:
        res = requests.get(album_url, headers=headers)
        res.raise_for_status()
        pictures = res.json().get("data", {}).get("pictures", [])

        print(f"  {len(pictures)} imágenes en álbum {url_id}")

        for pic in pictures:
            img_url = pic.get("full")
            if img_url:
                filename = f"{pic['id']}.jpg"
                filepath = os.path.join(album_dir, filename)
                download_image(img_url, filepath)
    except Exception as e:
        print(f"❌ Error al procesar álbum {url_id}: {e}")


# Ejecutar con concurrencia
with ThreadPoolExecutor(max_workers=2) as executor:
    executor.map(process_album, albums)

# Ejecutar 1_video.py con argumento 45454
subprocess.run(["python", "1_video.py", USER_ID])


# Eliminar carpetas vacías
def remove_empty_dirs(base_path):
    for root, dirs, files in os.walk(base_path, topdown=False):
        for d in dirs:
            dir_path = os.path.join(root, d)
            if not os.listdir(dir_path):
                os.rmdir(dir_path)
                print(f"🗑 Carpeta vacía eliminada: {dir_path}")


remove_empty_dirs(BASE_DIR)
