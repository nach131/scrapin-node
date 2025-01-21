import argparse
import os

def download_m3u8(m3u8_url, output_dir):
    # Aquí va tu implementación de la función download_m3u8
    pass

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Descargar segmentos de un archivo m3u8.')
    parser.add_argument('m3u8_url', type=str, help='La URL del archivo m3u8.')
    parser.add_argument('output_dir', type=str, default='./downloaded_segments', help='Directorio de salida para los segmentos descargados.')

    args = parser.parse_args()

    m3u8_url = args.m3u8_url
    output_dir = args.output_dir

    # Crear la carpeta de salida, incluyendo "download" si no existe
    download_dir = os.path.join(output_dir, 'download')
    os.makedirs(download_dir, exist_ok=True)

    download_m3u8(m3u8_url, download_dir)
