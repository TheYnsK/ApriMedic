/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medic: {
          dark: "#0f172a",       // Arka plan ana renk
          card: "#1e293b",       // Kart arka planı
          primary: "#06b6d4",    // Cyan (Tıbbi güven)
          secondary: "#8b5cf6",  // Violet (Yapay Zeka)
          accent: "#10b981",     // Emerald (Başarı/Normal)
          danger: "#ef4444",     // Red (Pnömoni/Hata)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}