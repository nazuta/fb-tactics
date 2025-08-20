#!/bin/bash

echo "🚀 Football Formation Builder - GitHub Deployment Setup"
echo "======================================================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (18.0.0+) first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Clean up incorrect files
echo "🧹 Cleaning up file structure..."

# Remove incorrect files
rm -f _gitignore.tsx
rm -rf LICENSE/
rm -f LICENSE/Code-component-55-16.tsx
rm -f LICENSE/Code-component-55-31.tsx

echo "✅ File structure cleaned"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"

# Add all files to git
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💬 Creating initial commit..."
git commit -m "🚀 Initial commit: Football Formation Builder

Features:
- Interactive drag-and-drop formation editor
- Tactical stages (Defence, Default, Attack) 
- Custom formation creation and management
- 4 preset formations (4-4-2, 4-3-3, 3-5-2, 4-2-3-1)
- Local storage persistence
- Responsive design with Tailwind CSS v4
- TypeScript and React 18
- ShadCN UI component library"

echo "✅ Initial commit created"

echo ""
echo "🎉 Setup complete! Next steps:"
echo "1. Create a repository on GitHub: https://github.com/new"
echo "2. Copy the repository URL (e.g., https://github.com/username/football-formation-builder.git)"
echo "3. Run: git remote add origin <repository-url>"
echo "4. Run: git branch -M main"
echo "5. Run: git push -u origin main"
echo ""
echo "📖 To test your app locally, run: npm run dev"