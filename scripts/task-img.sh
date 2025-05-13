#!/usr/bin/env bash
##
## task-img.sh
## Copy or optimize images from src to dist

set -euo pipefail


## TODO: Maybe not like this...
svgo() {
  npx svgo "$@"
}


check-tools() {
  if [ ! -x ./bin/cwebp ]; then
    printf "./bin/cwebp executable not found\n" >&2
    exit 1
  fi

  if [ ! -x ./bin/dwebp ]; then
    printf "./bin/dwebp executable not found\n" >&2
    exit 1
  fi
}


raster-to-webp() {
  printf "Converting raster images to WEBP...\n"

  shopt -s nullglob globstar

  local infile outfile

  for infile in src/assets/img/**/*.{jpg,png}
  do
    ## right-strip file extension
    filestem="${infile%.*}"
    outfile="${filestem/src/dist}.webp"

    if [ ! -f "$outfile" ]; then
      ./bin/cwebp "$infile" -o "$outfile"
    fi

  done

  shopt -u nullglob globstar
}


webp-to-png() {
  printf "Converting WEBP to PNG...\n"

  shopt -s nullglob globstar

  local infile outfile

  for infile in src/assets/img/**/*.webp
  do
    ## right-strip file extension
    filestem="${infile%.*}"
    outfile="${filestem/src/dist}.png"

    if [ ! -f "$outfile" ]; then
      ./bin/dwebp "$infile" -v -o "$outfile"
    fi

  done

  shopt -u nullglob globstar
}


optimize-svg() {
  printf "Optimizing SVG with SVGO...\n"
  printf "  (Slow on first run)...\n"

  shopt -s nullglob globstar

  local infile outfile

  for infile in src/assets/img/**/*.svg
  do
    ## right-strip file extension
    filestem="${infile%.*}"
    outfile="${filestem/src/dist}.svg"

    if [ ! -f "$outfile" ]; then
      svgo "$infile" -o "$outfile"
    fi

  done

  shopt -u nullglob globstar
}


main() {
  check-tools
  raster-to-webp
  webp-to-png
  optimize-svg
}

main
