# WebXR Content Editor

A modern web application for creating and managing WebXR experiences. Built with React, Vite, and Tailwind CSS.

## Features

- Create and manage AR, MR, and VR experiences
- Drag-and-drop interface for organizing experiences
- Preview WebXR apps before deployment
- Import/export functionality for data management
- Responsive design for all devices
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 16.x or later
- npm 7.x or later

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/webxr-editor.git
cd webxr-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
webxr-editor/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   └── utils/
│       ├── webxrGenerator.js  # WebXR app generator
│       └── dataManager.js     # Data management utilities
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project metadata and dependencies
```

## Usage

1. **Creating Experiences**
   - Click "Add Experience" to create a new experience
   - Fill in the required information (title, description, model URL)
   - Choose the experience type (AR, MR, or VR)
   - Save the experience

2. **Managing Experiences**
   - Drag and drop experiences to reorder them
   - Edit or delete experiences using the action buttons
   - Switch between AR, MR, and VR tabs to manage different types

3. **Preview and Export**
   - Click "Preview" to see how the WebXR app will look
   - Use "Export" to save your data as a JSON file
   - Use "Import" to load previously exported data

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Features

1. Create new components in the `src` directory
2. Add new utilities in the `src/utils` directory
3. Update styles in `src/index.css`
4. Test your changes with `npm run dev`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [Lucide Icons](https://lucide.dev/) 