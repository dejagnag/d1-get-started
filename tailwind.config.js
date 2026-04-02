/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Scandinavian wellness palette
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#F0EBE3',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
        },
        sage: {
          DEFAULT: '#7A9A6E',
          light: '#B8CEB0',
          lighter: '#DCE9D8',
          dark: '#5C7A52',
        },
        wood: {
          DEFAULT: '#C4A882',
          light: '#E8D5BD',
          lighter: '#F5EDE0',
          dark: '#9E7A52',
        },
        stone: {
          DEFAULT: '#8A8680',
          light: '#C8C4BE',
          lighter: '#ECEAE6',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0,0,0,0.06)',
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'elevated': '0 8px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
