/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",  // make sure this matches your file structure
  ],
    safelist: [
    "bg-[#FCFAEE]",
    "text-[#0C1D32]",
    "shadow-xl",
    "rounded-3xl",
    "p-10",
    "text-2xl",
    "font-bold",
    "text-base",
    "mt-4",
    "bg-red-600",
    "hover:bg-red-700",
    "text-white",
    "px-6",
    "py-2",
    "rounded-full",
    "mt-6"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
