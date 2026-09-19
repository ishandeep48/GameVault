/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background palette (CSS variable refs — no opacity variants needed)
        'gv-bg-primary': 'var(--bg-primary)',
        'gv-bg-secondary': 'var(--bg-secondary)',
        'gv-bg-tertiary': 'var(--bg-tertiary)',
        // Text palette (CSS variable refs)
        'gv-text-primary': 'var(--text-primary)',
        'gv-text-secondary': 'var(--text-secondary)',
        'gv-text-muted': 'var(--text-muted)',
        // Accent colors — CSS variable for base, hex with opacity support
        'gv-accent': '#7C5CFC',
        'gv-accent-hover': '#6B4FE0',
        'gv-accent-secondary': '#3B82F6',
        // Status colors (direct hex values for opacity modifier support)
        'status-playing': '#10B981',
        'status-completed': '#7C5CFC',
        'status-on-hold': '#F59E0B',
        'status-dropped': '#EF4444',
        'status-plan-to-play': '#6366F1',
      },
      borderRadius: {
        'gv-sm': '0.375rem',
        'gv-md': '0.75rem',
        'gv-lg': '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
