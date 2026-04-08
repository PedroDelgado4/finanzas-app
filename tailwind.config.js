/** @type {import('tailwindcss').Config} */
export default {
  // Le decimos a Tailwind qué archivos debe revisar para generar el CSS
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Añadimos nuestra paleta de colores personalizada
      colors: {
        brand: {
          green: '#2E8D1B',   // El verde que nos pediste para botones/ingresos
          silver: '#D9D9D9',  // El gris plata para fondos/bordes
        }
      }
    },
  },
  plugins: [],
}