import path  from 'path';
import fs from 'fs';
import { config as envConfig } from './config';
import webpack from 'webpack';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { resolveTsAliases } from 'resolve-ts-aliases';

const ROOT_DIR = path.resolve(__dirname);
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const BUILD_DIR = resolvePath(__dirname + '/src/server/web/dist');
const BUILD_DIR_CONVERSION = resolvePath(__dirname + '/src/server/web/utils');
//const { InjectManifest } = require('workbox-webpack-plugin');
//const nodeExternals = require('webpack-node-externals');
const alias = resolveTsAliases(path.resolve('tsconfig.json'));

const copyPatterns = [
	{
		from: `${ROOT_DIR}/public/manifest.json`, to: '',
	},
	{
		from: `${ROOT_DIR}/public/favicon.ico`, to: '',
	},
	{
		from: `${ROOT_DIR}/public/logo192.png`, to: '',
	},
	{
		from: `${ROOT_DIR}/public/logo512.png`, to: '',
	},
	
];

if(fs.existsSync(`${ROOT_DIR}/public/img`)){
	copyPatterns.push({
		from: `${ROOT_DIR}/public/img`, to: 'assets/img', 
	});
}

const configReact = {
	entry: {
		frontend: `${ROOT_DIR}/src/frontend/index.tsx`,
	},
	output: {
		path: BUILD_DIR,
		//filename: 'assets/app-[name]-[fullhash].js',
		filename: 'assets/app-[name].js',
		publicPath: envConfig.PUBLIC_URL,
	},
	resolve: {
		extensions: ['.js', '.jsx','.ts','.tsx', '.json'],
		alias,
	},
	mode: 'production',
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
		],
	},
	plugins: [
		new CompressionWebpackPlugin({
			test: /\.(js|css)$/,
			filename: '[path][base].gz',
		}),
		new MiniCssExtractPlugin({
			//filename: 'assets/[name]-[fullhash].css',
			filename: 'assets/[name].css',
		}),
		new WebpackManifestPlugin({
			fileName: 'assets/manifest-hash.json',
			publicPath: envConfig.PREFIX_URL,
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*',
				'!server/**',
			],
		}),
		new ESLintPlugin(),
		new webpack.EnvironmentPlugin({
			...envConfig,
		}),
		new CopyPlugin({
			patterns: copyPatterns
		}),
		/*new InjectManifest({
			swSrc: './service-worker.ts',
			swDest: 'service-worker.js',
		}),*/
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
		],
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				vendors: {
					name: 'vendors',
					chunks: 'all',
					reuseExistingChunk: true,
					priority: 1,
					//filename: 'assets/vendor-[name]-[fullhash].js',
					filename: 'assets/vendor-[name].js',
					enforce: true,
					test (module, chunks){
						const name = module.nameForCondition && module.nameForCondition();
						return chunks.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name);  
					},
				},
			},
		},
	},
};

const configTSXConversion = {
	entry: {
		tsxToString: `${ROOT_DIR}/src/frontend/converter/tsxToString.tsx`,
	},
	output: {
		path: BUILD_DIR_CONVERSION,
		//filename: 'assets/app-[name]-[fullhash].js',
		filename: '[name].js',
		publicPath: envConfig.PUBLIC_URL,
		globalObject: 'this',
	},
	resolve: {
		extensions: ['.js', '.jsx','.ts','.tsx', '.json'],
		alias,
	},
	mode: 'production',
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
		],
	},
	plugins: [
		new CompressionWebpackPlugin({
			test: /\.(js|css)$/,
			filename: '[path][base].gz',
		}),
		new MiniCssExtractPlugin({
			//filename: 'assets/[name]-[fullhash].css',
			filename: '[name].css',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*',
				'!server/**',
			],
		}),
		new ESLintPlugin(),
		new webpack.EnvironmentPlugin({
			...envConfig,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
};
  
export default [configReact, configTSXConversion];
