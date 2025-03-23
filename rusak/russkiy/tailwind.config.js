/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': 'rgb(var(--primary-50) / <alpha-value>)',
          '100': 'rgb(var(--primary-100) / <alpha-value>)',
          '200': 'rgb(var(--primary-200) / <alpha-value>)',
          '300': 'rgb(var(--primary-300) / <alpha-value>)',
          '400': 'rgb(var(--primary-400) / <alpha-value>)',
          '500': 'rgb(var(--primary-500) / <alpha-value>)',
          '600': 'rgb(var(--primary-600) / <alpha-value>)',
          '700': 'rgb(var(--primary-700) / <alpha-value>)',
          '800': 'rgb(var(--primary-800) / <alpha-value>)',
          '900': 'rgb(var(--primary-900) / <alpha-value>)',
          '950': 'rgb(var(--primary-950) / <alpha-value>)',
        },
        'secondary': {
          '50': 'rgb(var(--secondary-50) / <alpha-value>)',
          '100': 'rgb(var(--secondary-100) / <alpha-value>)',
          '200': 'rgb(var(--secondary-200) / <alpha-value>)',
          '300': 'rgb(var(--secondary-300) / <alpha-value>)',
          '400': 'rgb(var(--secondary-400) / <alpha-value>)',
          '500': 'rgb(var(--secondary-500) / <alpha-value>)',
          '600': 'rgb(var(--secondary-600) / <alpha-value>)',
          '700': 'rgb(var(--secondary-700) / <alpha-value>)',
          '800': 'rgb(var(--secondary-800) / <alpha-value>)',
          '900': 'rgb(var(--secondary-900) / <alpha-value>)',
          '950': 'rgb(var(--secondary-950) / <alpha-value>)',
        },
        'accent': {
          '50': 'rgb(var(--accent-50) / <alpha-value>)',
          '100': 'rgb(var(--accent-100) / <alpha-value>)',
          '200': 'rgb(var(--accent-200) / <alpha-value>)',
          '300': 'rgb(var(--accent-300) / <alpha-value>)',
          '400': 'rgb(var(--accent-400) / <alpha-value>)',
          '500': 'rgb(var(--accent-500) / <alpha-value>)',
          '600': 'rgb(var(--accent-600) / <alpha-value>)',
          '700': 'rgb(var(--accent-700) / <alpha-value>)',
          '800': 'rgb(var(--accent-800) / <alpha-value>)',
          '900': 'rgb(var(--accent-900) / <alpha-value>)',
          '950': 'rgb(var(--accent-950) / <alpha-value>)',
        },
        'dark': {
          '700': '#2e2f35',
          '800': '#242629',
          '900': '#16161a'
        },
        'light': {
          '100': '#fffffe',
          '200': '#f2f5f7',
          '300': '#94a1b2'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Oswald', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 15px rgba(31, 159, 248, 0.5)',
        'inner-glow': 'inset 0 0 15px rgba(31, 159, 248, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'neon': '0 0 5px rgb(var(--primary-400)), 0 0 10px rgb(var(--primary-400)), 0 0 15px rgb(var(--primary-400)), 0 0 20px rgb(var(--primary-400))',
        'neon-accent': '0 0 5px rgb(var(--accent-400)), 0 0 10px rgb(var(--accent-400)), 0 0 15px rgb(var(--accent-400)), 0 0 20px rgb(var(--accent-400))'
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(-15px)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'scale-up-down': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(31, 159, 248, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(31, 159, 248, 0.8)' }
        },
        'typing': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        'blink': {
          '0%, 100%': { borderRightColor: 'transparent' },
          '50%': { borderRightColor: 'rgb(var(--primary-400))' }
        }
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
        'scale-up-down': 'scale-up-down 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'typing': 'typing 3.5s steps(30, end)',
        'blink': 'blink 0.7s steps(1) infinite'
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '64px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
      }
    }
  },
  plugins: [],
  safelist: [
    'px-4', 'py-2', 'px-6', 'py-3', 'px-8',
    'rounded-lg', 'text-lg', 'font-medium',
    'bg-primary-600', 'bg-primary-700', 'text-[#fffffe]',
    'bg-secondary-600', 'bg-secondary-700', 'hover:bg-[#3a3b42]',
    'bg-accent-600', 'bg-accent-700', 'hover:text-[#fffffe]',
    'hover:bg-primary-500', 'focus:ring-primary-500',
    'focus:ring-secondary-500', 'focus:ring-accent-500'
  ]
} 