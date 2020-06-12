const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {

	const CSSExtract = new ExtractTextPlugin('styles.css');
	return {
		entry: './src/source.js',

		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js'
		},

		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}, {
				test: /\.s?css$/,
				use: CSSExtract.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}

					]
				})
			}]
		},
		plugins: [
			CSSExtract
		],
		mode: 'development'
	}
}