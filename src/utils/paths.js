/**
 * Path Utility for Asset Loading
 * 
 * This utility ensures assets load correctly in both development and production environments.
 * It automatically adds the repository name prefix for GitHub Pages deployments.
 */

/**
 * Gets the correct asset path based on the current environment
 * 
 * @param {string} path - The relative path to the asset
 * @returns {string} - The correct path to use for the current environment
 */
export function getAssetPath(path) {
  // Check if we're in production mode
  const isProduction = import.meta.env.MODE === 'production';
  
  // In production on GitHub Pages, we need the repository name prefix
  // In development, we use the path directly
  const basePath = isProduction ? '/XRInterface' : '';
  
  // Return the complete path
  return `${basePath}${path}`;
} 