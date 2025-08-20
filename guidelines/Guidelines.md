# Football Formation Builder - Development Guidelines

## Project Overview
Interactive football formation builder with tactical stages, drag-and-drop player positioning, and custom formation management.

## General Guidelines

### Code Organization
- Keep components small and focused on a single responsibility
- Use TypeScript for all new code with proper type definitions
- Maintain separation between UI components and business logic
- Place utility functions in appropriate `/utils` files
- Store shared types in `/types` directory

### Component Structure
- Use functional components with React Hooks
- Prefer composition over inheritance
- Extract reusable logic into custom hooks
- Keep state as close to where it's used as possible
- Use proper prop drilling vs context for state management

### Performance
- Use React.memo() for expensive components that re-render frequently
- Implement proper key props for lists (especially player arrays)
- Debounce expensive operations like position detection
- Lazy load non-critical components

## Design System Guidelines

### Typography
- **Base font size**: 14px (set in CSS custom properties)
- **Font weights**: Use `--font-weight-medium` (500) and `--font-weight-normal` (400)
- **Line height**: 1.5 for all text elements
- **Never override** base typography with Tailwind classes unless specifically requested

### Colors
- Use CSS custom properties from `styles/globals.css`
- Primary: `--primary` for main actions and branding
- Secondary: `--secondary` for supporting elements  
- Accent: `--accent` for highlights and active states
- Muted: `--muted` and `--muted-foreground` for secondary text
- Support both light and dark themes

### Spacing & Layout
- Use Tailwind's spacing scale consistently
- Prefer flexbox and grid over absolute positioning
- Use responsive design patterns (mobile-first)
- Maintain consistent padding/margins across similar components

## Football-Specific Guidelines

### Player Management
- **Player IDs**: Always use string IDs, never array indices
- **Position Detection**: Use the `detectPosition()` utility for consistent positioning
- **Player State**: Maintain player data consistency across all tactical stages
- **Drag & Drop**: Use native HTML5 drag and drop API for better performance

### Formation System
- **Stage Propagation**: Default stage changes should propagate to other stages unless customized
- **Autosave**: Custom formations should save automatically on modification
- **Naming**: Use sequential numbering for custom formations (Custom Formation #1, #2, etc.)
- **Data Persistence**: Always save to localStorage with proper error handling

### Tactical Stages
- **Three Stages**: Defence, Default, Attack - maintain this structure
- **Independent Positioning**: Each stage can have unique player positions
- **Modification Tracking**: Track which players have been modified in each stage
- **Visual Indicators**: Show clear visual feedback for stage-specific modifications

## UI/UX Guidelines

### User Feedback
- **Toast Notifications**: Use sonner for all user feedback
- **Loading States**: Show loading indicators for async operations
- **Error Handling**: Provide clear error messages with recovery options
- **Confirmation Dialogs**: Use for destructive actions (delete formations)

### Football Field
- **Aspect Ratio**: Maintain 1:1.4 aspect ratio for realistic field proportions
- **Field Markings**: Use authentic football field markings and colors
- **Player Visualization**: Blue circles with white borders, numbers visible
- **Position Preview**: Show position changes during drag operations

### Sidebar
- **Formation Categories**: Separate preset and custom formations clearly
- **Active State**: Highlight currently selected formation
- **Management Actions**: Edit, delete, and rename functionality for custom formations
- **Empty States**: Show helpful messages when no custom formations exist

## Component-Specific Guidelines

### Player Component
- **Double-click to edit**: Standard interaction pattern
- **Context menu**: Right-click for additional actions (edit, reset)
- **Drag feedback**: Visual indicators during drag operations
- **Position updates**: Automatic position detection and naming

### FormationSelector
- **Real-time updates**: Refresh when localStorage changes
- **Highlight new formations**: Visual feedback for newly created formations
- **Rename functionality**: Inline editing with validation
- **Delete confirmation**: Always confirm destructive actions

### TacticalStageSlider
- **Vertical layout**: Stages arranged vertically (Attack, Default, Defence)
- **Color coding**: Different colors for each stage
- **Modification indicators**: Show when stages have been customized
- **Smooth transitions**: Animated stage switching

## Data Management

### Local Storage
- **Key naming**: Use consistent prefixes (`football-formations-`)
- **Error handling**: Graceful fallbacks when localStorage fails
- **Data validation**: Validate data structure when loading
- **Migration**: Handle legacy data formats properly

### State Management
- **Immutable updates**: Always create new objects/arrays for state updates
- **Stage synchronization**: Keep stage positions synchronized correctly
- **Modification tracking**: Use Sets for efficient modification tracking
- **Formation switching**: Preserve custom formations when switching

## Testing Guidelines

### Manual Testing Checklist
- Test drag and drop on different devices
- Verify stage propagation works correctly
- Check custom formation creation/management
- Test localStorage persistence
- Verify responsive design on mobile
- Test keyboard navigation and accessibility

### Browser Compatibility
- Modern browsers with ES2020 support
- Mobile Safari and Chrome
- Desktop Chrome, Firefox, Safari, Edge
- Touch device support for mobile usage

## Deployment

### Build Process
- Use Vite for fast development and production builds
- Generate source maps for debugging
- Optimize assets for production
- Ensure all TypeScript compilation passes

### GitHub Best Practices
- Use conventional commit messages
- Create meaningful PR descriptions
- Tag releases with semantic versioning
- Maintain up-to-date README and documentation

---

## Quick Reference

### Key Dependencies
- **React 18**: Core framework
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Styling system
- **ShadCN/UI**: Component library
- **Lucide React**: Icons
- **Sonner**: Toast notifications

### Important Files
- `/types/formation.ts`: Core type definitions
- `/utils/positionDetection.ts`: Position detection logic
- `/utils/customFormations.ts`: Formation management
- `/styles/globals.css`: Design system tokens
- `/App.tsx`: Main application logic

Remember: The goal is to create an intuitive, performant tool for football tactical analysis that feels natural to coaches and players.