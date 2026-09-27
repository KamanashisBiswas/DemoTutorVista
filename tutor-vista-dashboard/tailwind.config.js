/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tv: {
          primary: "var(--color-primary)",
          "primary-hover": "var(--color-primary-hover)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
          bg: "var(--color-bg)",
          surface: "var(--color-surface)",
          text: "var(--color-text)",
          "text-muted": "var(--color-text-muted)",
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-danger)",
          border: "var(--color-border)",
        },
        primary: {
          DEFAULT: "#3730E0",
          hover: "#2D24C4",
          50: "#EEEDFD",
          100: "#DDD9FC",
          200: "#BCB5F8",
          300: "#9B91F5",
          400: "#6A5FF0",
          500: "#3730E0",
          600: "#2D24C4",
          700: "#231CA6",
          800: "#1A1580",
          900: "#110D5B",
        },
        secondary: {
          DEFAULT: "#0EA5A0",
          50: "#F0FDFA",
          100: "#CCFBF1",
          500: "#0EA5A0",
          600: "#0D9488",
        },
        accent: {
          DEFAULT: "#F5A524",
          50: "#FFFBEB",
          500: "#F5A524",
          600: "#D97706",
        },
        surface: "#FFFFFF",
        canvas: "#F7F8FB",
        ink: {
          DEFAULT: "#1A1D29",
          muted: "#5B5F73",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(16, 17, 26, 0.06)",
        md: "0 4px 16px rgba(16, 17, 26, 0.08)",
      },
      fontFamily: {
        sans: ['"Inter"', '"Hind Siliguri"', "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "26px" }],
        xl: ["18px", { lineHeight: "26px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
        "4xl": ["40px", { lineHeight: "48px" }],
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-in-out",
        "slide-up": "slideUp 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
