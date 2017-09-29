const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'flow']
					}
				}
			}
		]
	},
 	output: {
		filename: 'sparrow.js',
		path: path.resolve(__dirname, 'dist')
	},
	externals: {
		"matrix-js-sdk": "matrixcs"
	},
	plugins: [
		new UglifyJSPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'}),
		new CopyWebpackPlugin(
			[
				{
					from: path.resolve(__dirname, 'src', 'lib'),
					to: path.resolve(__dirname, 'dist', 'lib')
				}
			]
		)
	]
};
