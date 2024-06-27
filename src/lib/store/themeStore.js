// filename: themeStore.js
import { writable } from 'svelte/store';

// Function to get the system's preferred theme or default to 'light'
function getInitialTheme() {
  // Use system preference
  const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
  return prefersDark ? 'dark' : 'light';
}

export const theme = writable(getInitialTheme());