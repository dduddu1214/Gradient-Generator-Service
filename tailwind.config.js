/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 커스텀 색상이 필요한 경우 추가
      },
      animation: {
        // 커스텀 애니메이션이 필요한 경우 추가
      }
    },
  },
  plugins: [],
}