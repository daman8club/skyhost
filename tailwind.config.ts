import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'glass', 'glass-strong', 'glass-card',
    'from-space-black', 'via-navy-dark', 'to-space-black',
    'bg-blue-400/20', 'bg-green-400/20', 'bg-purple-400/20',
    'text-blue-400', 'text-green-400', 'text-purple-400',
    'border-purple-400/30', 'border-blue-400/30',
    'from-purple-400/20', 'to-pink-400/20',
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#0a0a0f',
        'navy-dark': '#1a1a2e',
        'navy-medium': '#16213e',
        'navy-light': '#0f0f23',
        'electric-blue': '#00bcd4',
        'cyan-bright': '#00e5ff',
        'purple': {
          400: '#7877c6',
          500: '#8b5cf6',
        },
        'pink': {
          400: '#ff77c6',
          500: '#ec4899',
        },
        'cyan': {
          400: '#77ffff',
          500: '#00e5ff',
        },
        'blue': {
          400: '#7877c6',
        },
        'orange': {
          400: '#f97316',
        },
        'green': {
          400: '#10b981',
        },
      },
      animation: {
        'neon-glow': 'neon-glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'matrix-rain': 'matrix-rain 3s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'typewriter': 'typewriter 2s steps(40, end)',
        'blink-caret': 'blink-caret 1s step-end infinite',
        'globeRotate': 'globeRotate 20s linear infinite',
        'ringPulse': 'ringPulse 3s ease-in-out infinite',
        'marqueeScroll': 'marqueeScroll 30s linear infinite',
      },
      keyframes: {
        'neon-glow': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'hologram': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'rgba(120, 119, 198, 0.8)' },
        },
        'globeRotate': {
          'from': { transform: 'rotateY(0deg) rotateX(10deg)' },
          'to': { transform: 'rotateY(360deg) rotateX(10deg)' },
        },
        'ringPulse': {
          '0%, 100%': { 
            borderColor: 'rgba(120, 119, 198, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            borderColor: 'rgba(120, 119, 198, 0.8)',
            transform: 'scale(1.02)'
          },
        },
        'marqueeScroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config