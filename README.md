# XRInterface

A modern, high-performance spatial user interface for XR environments built with React Three Fiber.

![XRInterface Preview](./public/xr-preview.jpg)

## Live Demo

Experience the interface on [GitHub Pages](https://willhcurry.github.io/XRInterface/)

* **Desktop users**: Navigate with mouse/keyboard controls
* **VR users**: Click the "Enter VR" button with a connected headset

## Project Overview

XRInterface demonstrates a Pico-inspired VR home environment with a curved main panel, friends section, and fixed toolbar navigation - all optimized for immersive spatial computing.

### Key Features

- **Immersive 3D UI** with panels and ergonomic spatial arrangement
- **Pico-style interface** with main content, app panels, and bottom toolbar
- **Earth with atmospheric effect** as an environmental backdrop
- **Ambient particle field** creating depth and visual appeal
- **PBR materials** with high-quality wood textures for the floor
- **Performance-optimized** rendering with WebXR support

## Technologies Used

- **React 18** with functional components and hooks
- **Three.js** for 3D rendering via React Three Fiber
- **React Three Drei** for advanced 3D components
- **WebXR API** for VR headset support

## Development Features

The project includes several developer tools to assist with testing and refinement:

- **Debug Panel** (development mode only): Toggle grids, adjust scaling, and modify visual effects
- **Camera Controls**: Navigate the scene with orbit controls or WASD movement
- **Performance Optimizations**: Instanced meshes, level-of-detail systems, and memory management
- **Adaptive Quality**: Dynamic rendering adjustments based on device performance

## Navigation Controls

When exploring the interface on desktop:

- **Mouse**: Look around the environment
- **WASD**: Move forward/backward/left/right
- **QE**: Rotate left/right
- **Space/Shift**: Move up/down
- **Mouse Wheel**: Zoom in/out
- **Alt**: Sprint (faster movement)

## Structure

The application's structure demonstrates clean architecture with component separation:

- **Main Panels**: Interface with "Explore" and "For You" sections
- **Friends Panel**: Right-side social component
- **Bottom Toolbar**: Fixed navigation with common app shortcuts
- **Earth**: Background element with atmospheric glow
- **Floor Plane**: PBR-textured surface with appropriate reflections

## XR Design Principles

This project implements key best practices for immersive interfaces:

- **Spatial Design**: Ergonomic positioning of elements in 3D space
- **Visual Feedback**: Hover states and animations for interaction clarity
- **Performance First**: Optimized for high frame rates required in VR
- **Responsive Scale**: Elements adapt to different viewing distances
- **Modern Aesthetics**: Dark UI with accent colors and subtle depth effects

## Local Development

```bash
# Clone the repository
git clone https://github.com/willhcurry/XRInterface.git
cd XRInterface

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Acknowledgments

- Inspired by the Pico VR home interface design
- Earth texture from NASA visible earth collection
- Floor textures generated with Adobe Substance 3D

## License

MIT