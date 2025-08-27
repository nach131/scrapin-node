import requests
import json
import os
import sys

# Obtener userName desde los argumentos de la línea de comandos
user_name = sys.argv[1]


# Función para descargar archivos (imágenes o videos)
def download_file(url, path):
    try:
        response = requests.get(url, stream=True)
        # Lanza una excepción si la solicitud falla
        response.raise_for_status()

        with open(path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    file.write(chunk)
        return True
    except Exception as err:
        print(f"Error downloading {path}: {err}")
        return False


# Crear la carpeta para el usuario
try:
    os.makedirs(user_name, exist_ok=True)  # Crea la carpeta si no existe
except Exception as err:
    print(f"Failed to create folder {user_name}: {err}")
    sys.exit(1)

# Leer el archivo JSON
json_file = f"{user_name}.json"
try:
    with open(json_file, "r", encoding="utf-8") as file:
        json_data = json.load(file)
except Exception as err:
    print(f"Failed to read file {json_file}: {err}")
    sys.exit(1)


# Procesar cada elemento del contenido
content_list = json_data.get("data", {}).get("content", [])

for item in content_list:
    # IMAGEN SOLA
    if item.get("type") == "picture":
        url = item.get("properties", {}).get("full")
        filename = f"{item['id']}.jpg"
        file_path = os.path.join(user_name, filename)
        if download_file(url, file_path):
            print(f"Image {filename} downloaded")

    elif item.get("type") == "video":
        url = item.get("properties", {}).get("play")
        filename = f"{item['id']}.mp4"
        file_path = os.path.join(user_name, filename)
        if download_file(url, file_path):
            print(f"Video {filename} downloaded")
