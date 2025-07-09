module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        primary: "#00BFFF",
        secondary: "#FFD700",
        dark: "#111827",
        light: "#F9FAFB",
        glass: "rgba(255, 255, 255, 0.1)",
        accent: "#7F00FF",
        accent2: "#E100FF",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        neon: "0 0 16px 0 #00BFFF, 0 0 32px 0 #FFD700",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-animated': 'linear-gradient(270deg, #00BFFF, #FFD700, #7F00FF, #E100FF, #00BFFF)',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}