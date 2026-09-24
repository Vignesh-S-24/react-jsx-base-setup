#!/bin/bash
find src -type f -name "*.d.ts" -exec rm {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) | while read file; do
  npx --yes detype "$file"
  rm "$file"
done
