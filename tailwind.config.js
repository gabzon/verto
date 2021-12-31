module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', './resources/assets/ts/**/*.ts'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
