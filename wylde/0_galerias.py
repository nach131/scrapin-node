import requests
import json
import time
import sys

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

# Construir el header Authorization con Bearer
# headers = {"authorization": f"Bearer {session_token}"}

headers = {
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGV0bSI6MTc1NTAwNzE2NSwiX19pZCI6IjQ3NzE1MDMiLCJfX25hbWUiOiJzb3BoaWVibG9uZGUiLCJfX3N0YXRlcyI6W10sInBhc3N3b3JkX3VwZGF0ZWQiOnsicGFzc3dvcmRfdXBkYXRlZF9kdCI6IjIwMjMtMDMtMzAgMDY6MTk6MjYifX0.IRj6XJrvc68UwA0GiPkdxaPmPXforADjJ3fDBUV0uqc"
}

# Obtener userId y userName desde los argumentos de la línea de comandos
user_id = sys.argv[1]
user_name = sys.argv[2]


def get_galerias(user_id):
    # url = f"https://app.wyylde.com/rest/medias/user:{user_id}"
    url = f"https://www.wyylde.com/rest/mc/{user_id}/albums"

    print("url:", url)

    payload = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    # print(response.text)
    return response.json()


# Ejecutar la función y guardar los resultados
try:
    data = get_galerias(user_id)
    output_file = f"{user_name}_{user_id}.json"
    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    print(f"✅ Archivo guardado correctamente: {output_file}")


except Exception as e:
    print(f"❌ Error al guardar el archivo: {e}")


# Para ejecutar: python script.py userId userName
