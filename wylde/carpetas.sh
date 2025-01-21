#!/bin/bash

find . -type d -empty
find . -type d -empty -delete
find . -size 0 -exec rm {} \;
