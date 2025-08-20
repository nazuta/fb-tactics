# 🚀 Football Formation Builder - Local Development Setup

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
1. **Node.js** (version 18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (usually comes with Node.js, version 8.0.0 or higher)
   - Verify installation: `npm --version`

3. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

## 🧹 File Structure Cleanup (IMPORTANT!)

Before installing dependencies, you need to clean up some incorrect files:

### Step 1: Delete Incorrect Files
Delete these files/folders from your project:
```bash
# Delete these files:
_gitignore.tsx                    # Wrong file type
LICENSE/                          # Should be a file, not folder
LICENSE/Code-component-55-16.tsx  
LICENSE/Code-component-55-31.tsx
LICENSE/Code-component-55-41.tsx
LICENSE/Code-component-55-52.tsx
```

### Step 2: Verify File Structure
Your project should now have this structure:
```
football-formation-builder/
├── .gitignore               ✅ (file, not .tsx)
├── LICENSE                  ✅ (file, not folder)
├── App.tsx                  ✅
├── package.json             ✅ (created above)
├── index.html               ✅ (created above)
├── src/
│   └── main.tsx            ✅ (created above)
├── components/             ✅
├── styles/                 ✅
├── types/                  ✅
├── utils/                  ✅
└── ... (other files)
```

## 📦 Installation Steps

### Step 1: Open Terminal/Command Prompt
Navigate to your project directory:
```bash
cd path/to/your/football-formation-builder
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- **React 18** - Core framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Modern styling
- **ShadCN/UI** - Component library
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Radix UI** - Accessible UI primitives

### Step 3: Start Development Server
```bash
npm run dev
```

Your app will be available at: `http://localhost:5173`

## 🛠️ Available Scripts

After installation, you can run these commands:

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run TypeScript and ESLint checks
npm run lint
```

## ✅ Verify Installation

1. **Check if the dev server starts:**
   ```bash
   npm run dev
   ```
   - Should show: `Local: http://localhost:5173/`

2. **Check if the app loads:**
   - Open `http://localhost:5173` in your browser
   - You should see the Football Formation Builder interface

3. **Test core functionality:**
   - Try dragging a player on the field
   - Switch between tactical stages (Defence/Default/Attack)
   - Create a custom formation by modifying a preset

## 🐛 Troubleshooting

### Common Issues:

1. **"Module not found" errors:**
   ```bash
   # Delete node_modules and package-lock.json, then reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port 5173 already in use:**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   # Or specify different port
   npm run dev -- --port 3000
   ```

3. **TypeScript compilation errors:**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

4. **Tailwind CSS not working:**
   - Ensure `styles/globals.css` is imported in `src/main.tsx`
   - Check Vite configuration includes Tailwind plugin

5. **ShadCN components not found:**
   - Verify all components exist in `/components/ui/`
   - Check import paths are correct (relative imports)

### System Requirements:
- **Node.js**: 18.0.0 or higher
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB for node_modules
- **Browser**: Modern browser with ES2020 support

## 🔧 Development Tips

1. **Hot Reload**: Vite provides instant hot reload for changes
2. **TypeScript**: All files should use `.tsx` extension for React components
3. **Styling**: Use Tailwind CSS classes, avoid inline styles
4. **State**: Changes are auto-saved to localStorage
5. **Mobile**: The app is responsive and works on mobile devices

## 📝 Next Steps

Once your development environment is running:

1. **Explore the codebase**: Start with `App.tsx` and component files
2. **Make changes**: Try modifying player positions or formations
3. **Test thoroughly**: Ensure drag-and-drop works across all stages
4. **Build for production**: Use `npm run build` when ready to deploy

## 🆘 Need Help?

If you encounter issues:

1. **Check the console**: Browser Developer Tools → Console tab
2. **Check terminal**: Look for error messages in your terminal
3. **Clear cache**: Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
4. **Restart dev server**: Stop with Ctrl+C, then `npm run dev` again

---

**Happy coding! ⚽️**