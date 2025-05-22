#!/bin/bash

TARGET_DIR="./src"
COUNT=0

# Verifica que la carpeta existe
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ La carpeta '$TARGET_DIR' no existe."
  exit 1
fi

echo "🔍 Buscando archivos en '$TARGET_DIR' para renombrar..."

# Recorre todos los archivos en subdirectorios
find "$TARGET_DIR" -type f | while read -r file; do
  dir=$(dirname "$file")
  filename=$(basename "$file")

  # Si el archivo comienza con una letra minúscula
  if [[ "$filename" =~ ^[a-z] ]]; then
    capitalized="$(echo "$filename" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')"
    temp_path="$dir/__tmp__$capitalized"
    final_path="$dir/$capitalized"

    if [ ! -e "$final_path" ]; then
      mv "$file" "$temp_path"
      mv "$temp_path" "$final_path"
      echo "✅ Renombrado: $file → $final_path"
      ((COUNT++))
    else
      echo "⚠️ Ya existe: $final_path — omitiendo..."
    fi
  fi
done

echo
echo "📦 Renombramiento completado. Total de archivos renombrados: $COUNT"
