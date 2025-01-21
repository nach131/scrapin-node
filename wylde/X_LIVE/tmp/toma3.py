import requests
import m3u8
import os
import time


def download_m3u8(m3u8_url, output_dir, sleep_interval=10):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0',
        'Accept': '*/*',
        'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Origin': 'https://www.wyylde.com',
        'Connection': 'keep-alive',
        'Referer': 'https://www.wyylde.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    }

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    downloaded_segments = set()
    while True:
        m3u8_response = requests.get(m3u8_url, headers=headers)
        m3u8_response.raise_for_status()
        m3u8_obj = m3u8.loads(m3u8_response.text)

        new_segments = 0
        for segment in m3u8_obj.segments:
            segment_url = segment.uri
            if not segment_url.startswith('http'):
                segment_url = os.path.join(
                    os.path.dirname(m3u8_url), segment_url)

            segment_filename = os.path.join(
                output_dir, os.path.basename(segment.uri))
            if segment_filename not in downloaded_segments:
                segment_response = requests.get(
                    segment_url, headers=headers, stream=True)
                segment_response.raise_for_status()

                with open(segment_filename, 'wb') as segment_file:
                    for chunk in segment_response.iter_content(chunk_size=8192):
                        if chunk:
                            segment_file.write(chunk)

                downloaded_segments.add(segment_filename)
                new_segments += 1
                print(f"Downloaded segment: {segment_filename}")

        if new_segments == 0:
            print("No new segments found, waiting for new segments...")
            time.sleep(sleep_interval)
        else:
            print(f"{new_segments} new segments downloaded.")


if __name__ == "__main__":
    m3u8_url = "https://cf-2.lives.wyylde.com/live/ngrp:1231895034de2c1a986ba15a6788b9a2f05c00c6_desktop/chunklist_b898000.m3u8"
    output_dir = "./downloaded_segments"
    download_m3u8(m3u8_url, output_dir)
