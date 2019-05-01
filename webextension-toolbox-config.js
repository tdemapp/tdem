const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
	webpack: (config, { dev, vendor }) => {
		// Add Vue to file extensions
		config.resolve.extensions = ['.js', '.json', '.vue'];

		// Set custom entry points
		config.entry = {
			'scripts/content': './scripts/content.js',
			'options/options': './options/options.js',
		};

		// Add custom module rules
		config.module.rules.push(
			{
				test: /\.vue$/,
				use: ['vue-loader'],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
				],
			},
			{
				test: /\.styl$/,
				use: ['style-loader', 'css-loader', 'stylus-loader'],
			},
			{
				test: /\.svg$/,
				issuer: /\.(vue|js|ts|svg)$/,
				use: ['vue-loader', 'svg-to-vue-component/loader'],
			}
		);

		// Add custom plugins
		config.plugins.push(new VueLoaderPlugin());
		config.plugins.push(new MiniCssExtractPlugin());
		config.plugins.push(new VuetifyLoaderPlugin());

		return config;
	},

	// Override default copyIgnore array
	copyIgnore: ['**/*.js', '**/*.json', '**/*.css', '**/*.vue'],
};
