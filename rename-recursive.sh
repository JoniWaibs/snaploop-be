#!/bin/bash

TARGET_DIR="./src"
COUNT=0

echo "🔍 Forzando renombramiento en '$TARGET_DIR'..."

find "$TARGET_DIR" -type f | while read -r file; do
  dir=$(dirname "$file")
  filename=$(basename "$file")

  # Extraemos nombre base y extensión
  base="${filename%.*}"     # nombre sin extensión
  ext="${filename##*.}"     # extensión (igual al nombre si no hay punto)

  # Si empieza con minúscula (solo en el base)
  first_char="${base:0:1}"
  rest="${base:1}"

  if [[ "$first_char" =~ [a-z] ]]; then
    capitalized_first_char=$(echo "$first_char" | tr '[:lower:]' '[:upper:]')
    new_base="$capitalized_first_char$rest"

    # Reconstruimos el nuevo nombre con extensión (solo si hay extensión)
    if [[ "$filename" == *.* ]]; then
      new_filename="$new_base.$ext"
    else
      new_filename="$new_base"
    fi

    final_path="$dir/$new_filename"

    if [ ! -e "$final_path" ]; then
      temp_path="$dir/__TMP__$filename"

      # Paso 1: renombrar a nombre temporal
      mv "$file" "$temp_path"

      # Paso 2: renombrar a nombre final
      mv "$temp_path" "$final_path"

      # Registrar en git
      git add "$final_path"
      git rm --cached "$file" 2>/dev/null || true

      echo "✅ Renombrado: $filename → $new_filename"
      ((COUNT++))
    else
      echo "⚠️ Ya existe: $final_path — omitiendo..."
    fi
  fi
done

echo
echo "📦 Total de archivos renombrados: $COUNT"
