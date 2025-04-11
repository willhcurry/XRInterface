/**
 * Vite Configuration
 * 
 * This configuration file sets up the Vite build tool for React development.
 * It includes settings for development server, plugins, and build options.
 * 
 * @see https://vitejs.dev/config/
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use React plugin for JSX support and Fast Refresh
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,  // Standard port for Vite development server
    open: true   // Automatically open browser on start
  }
});
