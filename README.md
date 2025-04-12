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

## Development Tools

XRInterface includes a suite of built-in development tools to help visualize and test XR interfaces:

### Debug Panel

In development mode, a debug panel appears in the top-left corner with controls for:

- **Grid Visualization**: Toggle a 3D reference grid to understand spatial positioning
- **Camera Controls**: Enable/disable orbit controls for exploring the 3D scene
- **Interface Scaling**: Adjust the scale of UI elements to test different sizes

### Camera Navigation

When camera controls are enabled, you can navigate the 3D scene without a VR headset:

- **Left Click + Drag**: Rotate the camera around the scene
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in and out

These tools make it possible to effectively develop and test XR interfaces even without physical VR hardware.

## Viewing in VR

This project supports WebXR for compatible browsers and devices:

1. Start the development server
2. Access the site from a WebXR-compatible browser
3. Click the "Enter VR" button that appears when a headset is connected

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

## XR Design Principles

This project implements several key XR interface design principles:

- **Spatial UI Design**: Ergonomic positioning of elements in 3D space
- **Interactive Feedback**: Visual cues and animations for user interactions
- **Performance Optimization**: Techniques to maintain high frame rates
- **Input Abstraction**: Support for various XR input methods
- **Content Legibility**: Ensuring text and UI elements are clear in 3D

For more detailed information on the XR principles implemented in this project, see [XR_PRINCIPLES.md](./docs/XR_PRINCIPLES.md).

## Live Demo

View the live demo of this project on GitHub Pages:
[XRInterface Demo](https://willhcurry.github.io/XRInterface/)

Note: For the best experience, view in a WebXR-compatible browser with a VR headset connected.

## Performance Optimization

This application is optimized for both desktop browser and VR environments:

### Frame Rate Considerations
- **Browser Mode**: Typically capped at 60fps due to requestAnimationFrame sync with display refresh rate
- **VR Mode**: Targets the VR headset's native refresh rate (90Hz+ on most modern headsets)

### Performance Features
- Instanced mesh rendering for thousands of particles
- Conditional rendering based on debug settings
- Optimized geometry complexity
- Efficient matrix updates
- Frustum culling

### Performance Tuning
Performance can be adjusted through the debug panel by:
- Toggling particle effects
- Adjusting panel scale
- Enabling/disabling visual effects

For maximum performance in production environments, consider:
```js
<Canvas 
  gl={{ 
    powerPreference: "high-performance",
    antialias: false,
    precision: "mediump"
  }}
>
```