/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F7F5EF',
          secondary: '#F1EFE7',
          card: '#FFFFFF',
          elevated: '#FFFFFF',
          softGreen: '#DCEFE7',
          softPeach: '#F6E4D6',
          softBlue: '#DCE7F5',
        },
        border: {
          subtle: '#E5E3DB',
          strong: '#D5D3CB',
          green: 'rgba(0, 107, 79, 0.3)',
        },
        brand: {
          primary: '#006B4F',
          deep: '#004F3B',
          soft: '#DCEFE7',
          peach: '#F6E4D6',
          blue: '#DCE7F5',
        },
        text: {
          primary: '#1F2522',
          secondary: '#68716C',
          muted: '#8A938E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      boxShadow: {
        'soft-sm': '0 1px 3px 0 rgba(31, 37, 34, 0.04), 0 1px 2px 0 rgba(31, 37, 34, 0.02)',
        'soft-md': '0 4px 12px -2px rgba(31, 37, 34, 0.06), 0 2px 6px -1px rgba(31, 37, 34, 0.03)',
        'soft-lg': '0 10px 25px -3px rgba(31, 37, 34, 0.08), 0 4px 10px -2px rgba(31, 37, 34, 0.04)',
      }
    },
  },
  plugins: [],
}
