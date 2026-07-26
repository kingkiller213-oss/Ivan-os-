# Ivan OS

A comprehensive music production operating system for songwriters and producers. Modern, modular web application built with vanilla JavaScript and optimized for creative workflow.

## Features

- **Studio Dashboard** - Overview of active projects and quick access
- **Song Management** - Organize, track, and manage all your compositions
- **Album Workspace** - Compile and arrange tracks into cohesive albums
- **Composition Assistant** - AI-powered harmonic and melodic suggestions
- **Producer Tools** - Professional audio analysis and mixing utilities
- **Gear Inventory** - Track and organize your studio equipment and software
- **Session Management** - Log studio sessions with notes and activity tracking
- **Audio Player** - Native audio playback with metadata support
- **Persistent Storage** - All data automatically saved and synced

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES Modules)
- **Build**: Vite
- **Styling**: CSS 3 with CSS custom properties
- **Storage**: Browser Storage API (IndexedDB compatible)
- **Design**: Mobile-first, responsive, accessible

## Project Structure

```
Ivan-os/
├── index.html              # Main entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Build configuration
├── src/
│   ├── app.js              # Application bootstrap
│   ├── modules/
│   │   ├── state.js        # State management and persistence
│   │   ├── shell.js        # Layout and view rendering
│   │   ├── navigation.js   # Navigation and routing
│   │   └── audio.js        # Audio handling
│   └── styles/
│       ├── main.css        # Base styles and variables
│       ├── components.css  # UI component styles
│       └── responsive.css  # Mobile and tablet layouts
└── dist/                   # Build output (generated)
```

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/kingkiller213-oss/Ivan-os-.git
cd Ivan-os-

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:5173 in your browser
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Or serve with Python
python -m http.server 8000
```

## Architecture

### Module System

Ivan OS uses a modular architecture where each feature is self-contained:

- **state.js** - Centralized state management with persistence
- **shell.js** - View templates and layout structure
- **navigation.js** - View switching and routing
- **audio.js** - Audio file handling and playback

### Styling System

CSS custom properties enable consistent theming:

```css
--void: #0A0B0F          /* Primary background */
--surface: #12141A       /* Secondary background */
--ivory: #EFEAE1         /* Primary text */
--brass: #C8A45C         /* Accent color */
--moon: #7F97BC          /* Secondary accent */
--ember: #C4664E         /* Warning/Alert */
--jade: #71A183          /* Success */
```

### State Management

Reactive state stored in `state.js`:
- Songs with versions and metadata
- Album compilation and arrangement
- Session logs and activity tracking
- User preferences and settings

All state is automatically persisted to browser storage.

## Usage

### Creating a Song

1. Tap the **+** button to create a new song
2. Enter song title and initial details
3. Song appears in your library with default metadata

### Adding Audio Files

1. Select songs or versions needing audio
2. Tap file input to select audio file
3. Supported formats: MP3, WAV, AIFF, FLAC, OGG, M4A

### Organizing into Album

1. Navigate to Album view
2. Add songs in desired order
3. Edit album metadata and notes
4. Track progress through completion stages

### Using the Producer

1. Go to Producer section
2. Select analysis tools or utilities
3. Apply suggestions to your track

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **First Load**: ~200ms (no dependencies)
- **Audio Loading**: Native Web Audio API
- **Build Size**: ~15KB (minified + gzipped)
- **Storage**: Unlimited (browser quota)

## Accessibility

- ARIA labels and roles
- Keyboard navigation
- Focus management
- High contrast support
- Respects `prefers-reduced-motion`

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Author

Created by [kingkiller213](https://github.com/kingkiller213-oss)

---

**Ivan OS** - Where creativity meets production.
