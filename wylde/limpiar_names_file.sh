#!/bin/bash

folder_path=""./more  # Reemplaza con la ruta de tu carpeta

# Recorre todos los archivos en la carpeta y aplica la transformación al nombre
find "$folder_path" -type f -exec sh -c '
    for file_path do
        file_name=$(basename "$file_path")
        new_file_name=$(echo "$file_name" | sed "s/\?.*$//")
        if [ "$file_name" != "$new_file_name" ]; then
            new_file_path=$(dirname "$file_path")/"$new_file_name"
            mv "$file_path" "$new_file_path"
            echo "Archivo renombrado: $file_name -> $new_file_name"
        fi
    done
' sh {} +

