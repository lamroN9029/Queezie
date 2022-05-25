const { fontSize } = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {},
	plugins: [
		require('@tailwindcss/forms')
		// ...
	]
}
