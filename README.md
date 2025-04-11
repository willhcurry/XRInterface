# XRInterface

A modern, high-performance 3D user interface demo for XR environments built with React, Three.js, and React Three Fiber.

## Overview

XRInterface demonstrates an immersive spatial user interface designed for next-generation XR headsets. This project showcases advanced web-based 3D rendering techniques optimized for virtual reality experiences.

## Features

- Immersive 3D UI panels with intuitive spatial arrangement
- Interactive elements optimized for XR input methods
- Performance-optimized rendering for high framerate in XR
- Responsive design that adapts to different viewing distances
- Modern lighting and material design for comfortable viewing

## Technologies

- React 18
- Three.js
- React Three Fiber
- React Three Drei
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/willhcurry/XRInterface.git
   cd XRInterface
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Viewing in VR

This project supports WebXR for compatible browsers and devices:

1. Start the development server
2. Access the site from a WebXR-compatible browser
3. Click the "Enter VR" button that appears when a headset is connected

## Project Structure

XRInterface/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── contexts/ # State management
│ ├── scenes/ # 3D scene definitions
│ ├── utils/ # Utility functions
│ ├── App.jsx # Main application component
│ └── main.jsx # Entry point
├── docs/ # Documentation
└── package.json # Dependencies and scripts

## Documentation

For more detailed information about the project, check out:

- [Development Plan](./docs/DEVELOPMENT.md)
- [Technical Stack](./docs/TECHSTACK.md)

## Performance Optimization

XRInterface is optimized for high-performance XR rendering:

- Efficient use of instanced meshes
- Proper React memo usage to prevent unnecessary re-renders
- Dynamic level-of-detail based on device capabilities
- Careful management of Three.js resources

## License

MIT

## Acknowledgments

- Three.js team for their incredible 3D library
- React Three Fiber/Drei maintainers for their React integration tools

