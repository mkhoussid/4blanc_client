module.exports = {
	apps: [
		{
			name: `temp`,
			script: 'serve dist',
			env: {
				PM2_SERVE_PATH: './dist',
				VITE_BE_URL: 'http://193.124.115.49:8700',
			},
		},
	],
};
