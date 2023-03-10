const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin ({
        template: './index.html',
      }),
      new WebpackPwaManifest ({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    	new InjectManifest({
				swSrc: './src-sw.js',
				swDest: 'service-worker.js',
			}),
		],
    // Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/transform-runtime',
              ],
            },      
          },
        },
      ],
    },
  };

