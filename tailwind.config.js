/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 
              'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 
              'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Noto Sans Ethiopic'],
        ethiopic: ['Noto Sans Ethiopic', 'sans-serif'],
      },
      colors: {
        // NorthRise brand colors
        northrise: {
          green: {
            DEFAULT: '#33E073', // Primary green color
            light: '#5DEFB7',   // Light green
            dark: '#006051',    // Dark green
          },
          secondary: {
            cream: '#FBE7B2',   // Cream color
            beige: '#C7B894',   // Beige color
            orange: '#FFA91A',  // Orange color
            lime: '#8DB654',    // Lime green 
          },
          tertiary: {
            blue: {
              light: '#BDE0FF',  // Light blue
              medium: '#67A0D1', // Medium blue
              dark: '#0073A7',   // Dark blue
              navy: '#00416C',   // Navy blue
            },
          },
          black: '#000000',     // Black color
          white: '#FFFFFF',     // White color
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
