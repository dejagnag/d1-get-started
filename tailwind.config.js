/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Platō / Sauna Goose palette
        obsidian: {
          DEFAULT: '#1A1A1A',
          light:   '#3A3A3A',
          muted:   '#6B6B6B',
        },
        cobalt: {
          DEFAULT: '#2E5BFF',
          light:   '#5B7FFF',
          dark:    '#1A3FCC',
        },
        void: {
          DEFAULT:  '#FFFFFF',
          dim:      '#F7F7F7',
          subtle:   '#F0F0F0',
          border:   '#E0E0E0',
          hairline: '#EBEBEB',
        },
      },
      fontFamily: {
        display: ['Syne', 'Montserrat', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'display': '0.12em',
        'wide-xl': '0.08em',
      },
      borderWidth: {
        'hair': '0.5px',
      },
    },
  },
  plugins: [],
}
