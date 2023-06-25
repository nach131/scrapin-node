#!/bin/bash

texto_mayus="$1"
texto_minus=$(echo "$texto_mayus" | tr '[:upper:]' '[:lower:]')

echo "Texto en mayúsculas: $texto_mayus"
echo "Texto en minúsculas: $texto_minus"

