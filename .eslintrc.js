module.exports = {
	extends: [
		'eslint:recommended',
		'@react-native-community',
		'airbnb',
		'airbnb/hooks',
		'eslint-config-prettier',
		'prettier',
		'plugin:prettier/recommended'
	],
	plugins: ['prettier'],
	rules: {
		'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
		'prettier/prettier': 'error'
	}
}
