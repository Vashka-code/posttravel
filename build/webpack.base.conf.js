const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin')

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

module.exports = {
	externals: {
		paths: PATHS
	},

	entry: {
		app: PATHS.src
	},
	// optimization: {
	// 	minimize: false
	// },
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.dist,
		publicPath: '',
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/',
		},
			{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: `${PATHS.assets}img/[name].[ext]`
			}
		},
			{
			test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: `${PATHS.assets}fonts/[name].[ext]`
			}
		},
			{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
			],
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				}
			],
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`,
		}),
		new HtmlWebpackPlugin({
			hash: true,
			template: `${PATHS.src}/index.html`,
			filename: 'index.html'
		}),
		new CssUrlRelativePlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
				// {from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts`},
				{from: `${PATHS.src}/static`, to: ''}
			]
		})
	],
}
