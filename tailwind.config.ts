import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sg-yellow': '#FFCD11',
        'sg-yellow-dark': '#C99A00',
        'sg-yellow-pale': '#FFF2CC',
        'sg-charcoal': '#2D2D2D',
        'sg-dark-gray': '#4A4A4A',
        'sg-gray': '#767676',
        'sg-pale-gray': '#E8E8E8',
        'sg-cream': '#FAF8F3',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
