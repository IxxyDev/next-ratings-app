/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'courses-top.ru' },
			{ protocol: 'https', hostname: 'cdn-bucket.hb.bizmrg.com' },
		],
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: [
					{
						loader: '@svgr/webpack',
						options: {
							prettier: false,
							svgo: true,
							svgoConfig: {
								plugins: [{ name: 'preset-default', params: { override: { removeViewBox: false } } }],
							},
							titleProp: true,
						},
					},
				],
				as: '*.js',
			},
		},
	},
	webpack(config) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			issuer: /\.[jt]sx?$/,
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [{ name: 'preset-default', params: { override: { removeViewBox: false } } }],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
	},
};
