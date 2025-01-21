#!/bin/bash

while IFS= read -r url; do
    curl -O "$url"
done < wyylde.txt

