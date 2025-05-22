#!/bin/bash

TARGET_DIR="./src"
COUNT=0

echo "🔍 Buscando archivos en '$TARGET_DIR' para renombrar..."

find "$TARGET_DIR" -type f | while read -r file; do
  dir=$(dirname "$file")
  filename=$(basename "$file")

  # Si el nombre comienza en minúscula
  if [[ "$filename" =~ ^[a-z] ]]; then
    capitalized="$(echo "$filename" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')"
    temp_path="$dir/__tmp__$capitalized"
    final_path="$dir/$capitalized"

    if [ ! -e "$final_path" ]; then
      # Si el archivo está trackeado por Git
      if git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
        git mv "$file" "$temp_path"
        git mv "$temp_path" "$final_path"
      else
        mv "$file" "$temp_path"
        mv "$temp_path" "$final_path"
        git add "$final_path"
        git rm --cached "$file" 2>/dev/null || true
      fi

      echo "✅ Renombrado y trackeado: $file → $final_path"
      ((COUNT++))
    else
      echo "⚠️ Ya existe: $final_path — omitiendo..."
    fi
  fi
done

echo
echo "📦 Renombramiento completado. Total de archivos renombrados: $COUNT"
