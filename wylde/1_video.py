import os
import sys
import json
import requests

# Obtener userId desde la línea de comandos
if len(sys.argv) < 2:
    print("Uso: python script.py <USER_ID>")
    sys.exit(1)

USER_ID = sys.argv[1]
BASE_DIR = f"{USER_ID}_videos"
os.makedirs(BASE_DIR, exist_ok=True)

# Leer y parsear el fichero JSON
with open("./cookies.json", "r", encoding="utf-8") as file:
    cookies_data = json.load(file)

# Buscar el valor de la cookie que necesitas
session_token = next(
    (cookie["value"] for cookie in cookies_data if cookie["name"] == "session_token"),
    None,
)

# Headers
headers = {
    "authority": "www.wyylde.com",
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "authorization": f"Bearer {session_token}",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "referer": f"https://www.wyylde.com/es-es/mediacenter/user/{USER_ID}",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    "x-device": "desktop",
    "x-version": "1664363116",
}


# Función para descargar un video
def download_video(url, file_path):
    try:
        with requests.get(url, stream=True) as r:
            r.raise_for_status()
            with open(file_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        print(f"✅ Video descargado: {file_path}")
    except Exception as e:
        print(f"❌ Error al descargar {url}: {e}")


# Obtener videos del usuario
def get_posts(user_id):
    next_id = ""
    num = 0

    while True:
        url = f"https://www.wyylde.com/rest/mc/{user_id}/videos/{next_id}"
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        data = resp.json().get("data", {})

        videos = data.get("videos", [])
        next_id = data.get("next", "")

        if not videos:
            break

        for item in videos:
            filename = f"{item.get('id')}.mp4"
            filepath = os.path.join(BASE_DIR, filename)
            try:
                # download_video(item.get("play"), f"{item.get('id')}.mp4")
                download_video(item.get("play"), filepath)
                num += 1
            except Exception as e:
                print(f"❌ Error con video {item.get('id')}: {e}")

        if not next_id:
            break

    print(f"🎯 Se han obtenido {num} videos del usuario {user_id}")


# Ejecutar
get_posts(USER_ID)
