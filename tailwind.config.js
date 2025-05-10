/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.{html,js}',
    './_layouts/**/*.{html,js}',
    './_posts/**/*.{html,md}',
    './*.{html,md}',
    './index.html',
    './**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a5f7a',
          light: 'rgba(26, 95, 122, 0.1)'
        },
        accent: {
          DEFAULT: '#d62828',
          light: 'rgba(214, 40, 40, 0.08)'
        },
        text: '#333333',
        'light-text': '#767676',
        background: '#f8f9fa',
        'card-bg': '#ffffff'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'normal': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'hover': '0 14px 40px rgba(0, 0, 0, 0.09)'
      },
      borderRadius: {
        normal: '12px'
      }
    }
  },
  plugins: [],
}