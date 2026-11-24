/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        ink: {
          DEFAULT: '#1A1A1A',
          secondary: '#373a46',
          muted: '#6B6B6B',
          light: '#8F9098',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#FCFCFC',
          card: '#FFFFFF',
          muted: '#F5F5F7',
          dark: '#141414',
        },
        border: {
          DEFAULT: 'rgba(0, 0, 0, 0.08)',
          strong: 'rgba(0, 0, 0, 0.15)',
          subtle: 'rgba(0, 0, 0, 0.04)',
          dark: 'rgba(255, 255, 255, 0.12)',
        },
        maroon: {
          DEFAULT: '#9A1B3A',
          subtle: 'rgba(154, 27, 58, 0.06)',
          border: 'rgba(154, 27, 58, 0.2)',
        },
        primary: {
          DEFAULT: '#1A1A1A',
          hover: '#2D2D2D',
          light: '#F5F5F7',
        },
        secondary: {
          DEFAULT: '#373a46',
          hover: '#2A2C35',
        },
        success: {
          DEFAULT: '#2F6A44',
          subtle: 'rgba(47, 106, 68, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'sm-pill': '40px',
        'md-pill': '80px',
        'lg-pill': '120px',
        'card': '24px',
        'modal': '28px',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.06)',
        'input': '0 2px 8px rgba(194, 194, 194, 0.18)',
        'button-dark': '0 2px 6px rgba(29, 29, 29, 0.24), inset 0 1px 1px rgba(201, 201, 201, 0.15)',
        'button-light': '0 1px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      }
    },
  },
  plugins: [],
}
