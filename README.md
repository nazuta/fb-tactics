# Football Formation Builder ⚽

An interactive web application for creating and managing football formations with tactical stages and advanced player positioning system.

![Football Formation Builder](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🏆 Features

### Core Functionality

- **Visual Formation Editor**: Drag-and-drop player positioning on a realistic football field
- **Tactical Stages**: Three distinct stages (Defence, Default, Attack) with independent player positions
- **Formation Templates**: Pre-built formations (4-4-2, 4-3-3, 3-5-2, 4-2-3-1)
- **Custom Formations**: Create and save your own formations with automatic naming
- **Smart Position Detection**: Automatic position assignment based on field location
- **Local Storage**: Persistent custom formation management

### Advanced Features

- **Stage Propagation**: Default stage changes automatically apply to other stages (unless customized)
- **Autosave System**: Custom formations automatically save changes
- **Context Menus**: Right-click player editing and position reset
- **Toast Notifications**: Rich user feedback for all actions
- **Responsive Design**: Works on desktop and mobile devices
- **Player Customization**: Edit player names, numbers, and positions

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher - [Download here](https://nodejs.org/)
- **npm** 8.0.0 or higher (comes with Node.js)

### Installation

1. **Clone or download the project**

   ```bash
   git clone <repository-url>
   cd football-formation-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 How to Use

### Basic Operations

1. **Select a Formation**: Choose from preset formations in the sidebar
2. **Drag Players**: Click and drag any player to reposition them on the field
3. **Switch Stages**: Use the tactical stage slider on the right to switch between Defence, Default, and Attack
4. **Edit Players**: Right-click on any player to edit their name/number or reset position

### Advanced Features

- **Creating Custom Formations**: Modify any formation to automatically create a custom formation
- **Stage Management**: Changes in Default stage propagate to other stages unless they've been customized
- **Formation Management**: Rename or delete custom formations using the sidebar controls

## 🏗️ Project Structure

```
├── App.tsx                     # Main application component
├── components/                 # React components
│   ├── DragLayer.tsx          # Drag and drop overlay
│   ├── DropZone.tsx           # Drop zone for player positioning
│   ├── FieldMarkings.tsx      # Football field visual markings
│   ├── FootballField.tsx      # Main field container
│   ├── FormationSelector.tsx  # Formation selection sidebar
│   ├── Player.tsx             # Individual player component
│   ├── PositionIndicators.tsx # Field position guides
│   ├── TacticalStageSlider.tsx # Stage switching interface
│   └── ui/                    # ShadCN UI component library
├── types/                     # TypeScript type definitions
│   └── formation.ts           # Formation and player types
├── utils/                     # Utility functions
│   ├── customFormations.ts    # Formation management logic
│   └── positionDetection.ts   # Position detection algorithms
├── styles/                    # Styling files
│   └── globals.css            # Tailwind CSS + design tokens
├── guidelines/                # Development guidelines
│   └── Guidelines.md          # Project development guidelines
└── src/                       # Entry point
    └── main.tsx               # React app entry point
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.0 (fast development and build)
- **Styling**: Tailwind CSS v4.0 with custom design system
- **UI Components**: ShadCN/UI component library
- **Icons**: Lucide React
- **Notifications**: Sonner toast system
- **Drag & Drop**: Native HTML5 Drag and Drop API
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: LocalStorage API

## 🎨 Design System

The application uses a comprehensive design system built on Tailwind CSS v4.0:

- **Base Font Size**: 14px (customizable via CSS variables)
- **Color Palette**: Custom OKLCH color space with dark/light theme support
- **Typography**: Consistent font weights (400/500) and line heights (1.5)
- **Components**: Professional UI components from ShadCN
- **Responsive**: Mobile-first responsive design approach

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run TypeScript and ESLint checks
```

## 📱 Features in Detail

### Tactical Stages System

- **Defence Stage**: Defensive positioning and compact formations
- **Default Stage**: Standard formation layout (base formation)
- **Attack Stage**: Attacking positions with advanced player movements

### Formation Management

- **Preset Formations**: 4-4-2, 4-3-3, 3-5-2, 4-2-3-1 with authentic positioning
- **Custom Formations**: Automatically created when modifying presets
- **Autosave**: Real-time saving of custom formation changes
- **Rename/Delete**: Full management of custom formations

### Player System

- **Smart Positioning**: Automatic position detection based on field location
- **Stage Propagation**: Default stage changes apply to other stages intelligently
- **Individual Editing**: Right-click context menus for player management
- **Position Reset**: One-click reset to base formation positions

## 🌟 Advanced Usage

### Stage Propagation Logic

When moving a player in the **Default** stage:

- Changes automatically apply to **Defence** and **Attack** stages
- Unless those stages already have custom positions for that player
- Provides intelligent formation synchronization

### Custom Formation Creation

1. Select any preset formation
2. Drag players to new positions
3. Custom formation is automatically created and saved
4. All modifications are tracked and persisted

### Position Detection System

The app uses intelligent position detection:

- **Goalkeeper**: Back area of the field
- **Defenders**: Defensive third with left/right/center detection
- **Midfielders**: Middle third with role-specific positioning
- **Forwards**: Attacking third with winger/striker detection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the guidelines in `/guidelines/Guidelines.md`
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you encounter any issues:

- Check the browser console for error messages
- Ensure you're using a modern browser with ES2020 support
- Verify Node.js 18.0.0+ is installed
- Try clearing browser cache and localStorage

## 🎯 Future Enhancements

- [ ] **Cloud Storage**: Supabase integration for cross-device sync
- [ ] **User Accounts**: Authentication and personal formation libraries
- [ ] **Export Options**: PDF/PNG export functionality
- [ ] **Animation System**: Player movement animations between stages
- [ ] **Team Collaboration**: Share formations with other users

---

**Built with ❤️ for football enthusiasts and tactical analysts**

_Created using [Figma Make](https://figma.com/make) - AI-powered web application builder_