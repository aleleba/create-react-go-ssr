import path from 'path';
import fs from 'fs';
import { config as envConfig } from './config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { resolveTsAliases } from 'resolve-ts-aliases';

const alias = resolveTsAliases(path.resolve('tsconfig.json'));
const copyPatterns: {from: string, to: string}[] = [];

const copyFromUrl = `${path.resolve(__dirname)}/public/img`;
const copyToUrl = 'assets/img';

if(fs.existsSync(copyFromUrl)){
	copyPatterns.push({
		from: copyFromUrl, to: copyToUrl, 
	});
}

export default {
	entry: './src/frontend/components/index.tsx',
	resolve: {
		extensions: ['.js', '.jsx','.ts','.tsx', '.json'],
		alias,
	},
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'build'),
	},
	target: 'web',
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'index.css',
		}),
		new ESLintPlugin(),
		new webpack.EnvironmentPlugin({
			...envConfig,
		}),
		new CopyPlugin({
			patterns: copyPatterns
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'build', 'index.html'),
		}),
		new webpack.ProvidePlugin({
			React: 'react',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(css|sass|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				], 
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|ico|mp4|avi|ttf|otf|eot|woff|woff2|pdf)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]',
				},
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					name: 'assets/fonts/[name].[ext]',
					esModule: false,
				},
			},
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
};
