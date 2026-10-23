/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#0070D1', // PlayStation Cobalt
          glow: '#00F0FF',    // Cyber Neon Cyan
        },
        accent: {
          cyan: '#06B6D4',
          indigo: '#6366F1',
          emerald: '#10B981',
          pink: '#EC4899',
          amber: '#F59E0B',
        },
        surface: {
          dark: '#050811',
          card: '#0B1120',
          border: 'rgba(255, 255, 255, 0.08)',
          glass: 'rgba(11, 17, 32, 0.75)',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.35)',
        'glow-cobalt': '0 0 35px rgba(0, 112, 209, 0.4)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
