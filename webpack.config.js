
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './public'),
		publicPath: '/'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './public',
		inline: true,
		hot: true
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html'),
			inject: false
		})
	],
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(html)$/,
			use: {
				loader: 'html-loader',
				options: {
					minimize: true
				}
			}
		}]
	}
};