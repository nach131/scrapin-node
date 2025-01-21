from pathlib import Path
import subprocess
import argparse


def create_segments_file(segment_directory, output_file):
    segment_dir_path = Path(segment_directory)
    if not segment_dir_path.exists() or not segment_dir_path.is_dir():
        raise FileNotFoundError(f"Segment directory {
                                segment_directory} does not exist or is not a directory")

    segments = sorted(segment_dir_path.glob("*.ts"))
    if not segments:
        raise ValueError(f"No .ts files found in directory {
                         segment_directory}")

    with open(output_file, 'w') as f:
        for segment in segments:
            f.write(f"file '{segment.resolve()}'\n")

    print(f"Segment list file {output_file} created successfully with {
          len(segments)} segments.")


def combine_segments(segment_list_file, output_video):
    try:
        command = [
            'ffmpeg', '-f', 'concat', '-safe', '0', '-i', segment_list_file, '-c', 'copy', output_video
        ]
        subprocess.run(command, check=True)
        print(f"Video {output_video} created successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error combining segments: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")


if __name__ == "__main__":
    output_dir = "./downloaded_segments"
    segment_list_file = "segments.txt"
    output_video = "output_video.mp4"

    try:
        create_segments_file(output_dir, segment_list_file)
        combine_segments(segment_list_file, output_video)
    except Exception as e:
        print(f"An error occurred: {e}")
