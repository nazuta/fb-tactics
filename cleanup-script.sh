#!/bin/bash

echo "🧹 Cleaning up Football Formation Builder project files..."
echo "=================================================="

# Remove incorrect LICENSE folder and all .tsx files inside
echo "Removing LICENSE folder with .tsx files..."
rm -rf LICENSE/

# Remove incorrect _gitignore.tsx file
echo "Removing _gitignore.tsx file..."
rm -f _gitignore.tsx

# Remove setup and deployment files (not needed in production)
echo "Removing setup files..."
rm -f deploy-setup.sh
rm -f setup-instructions.md

echo "✅ Cleanup completed!"
echo ""
echo "Removed files:"
echo "- LICENSE/ folder (with all .tsx files)"
echo "- _gitignore.tsx"
echo "- deploy-setup.sh"
echo "- setup-instructions.md"
echo ""
echo "Your project structure is now clean and ready for development!"