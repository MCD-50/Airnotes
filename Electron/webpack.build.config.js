const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {
	entry: SRC_DIR + '/index.js',
	target: 'node',
	node: {
		__dirname: true,
		__filename: false,
	},
	output: {
		path: OUTPUT_DIR,
		publicPath: './',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [".js", ".json", ".css", ".scss"]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				}),
				include: defaultInclude
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: 'babel-loader' }],
				include: defaultInclude
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
				include: defaultInclude
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
				include: defaultInclude
			}
		]
	},
	target: 'electron-renderer',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Airtask',
			template: SRC_DIR + '/index.html',
		}),
		new ExtractTextPlugin('bundle.css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new BabiliPlugin()
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false
	}
};
