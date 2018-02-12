'use strict';

const webpack = require('webpack'),
    path = require('path'),
    nodeEnv = (process.env.NODE_ENV && process.env.NODE_ENV.trim() || 'production'),
    isHot = path.basename(require.main.filename) === 'webpack-dev-server.js',
    isDev = nodeEnv === 'development',
    isProd = !isDev;

console.log(`Environment: ${nodeEnv}`);
isDev && console.log(`Hot Module Replacement: ${isHot}`);

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    UnminifiedPlugin = require('unminified-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    CssNano = require('cssnano');

let config = {
    entry: {
        dxdt: './src/client/index.js',
        vendors: [],
    },
    
    output: {
        filename: isProd ? '[name].min.js' : '[name].js',
        chunkFilename: isProd ? '[name].min.js' : '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: isDev ? '' : 'dist',
        sourceMapFilename: '[file].map'
    },
    
    resolveLoader: {
        alias: {
            // use custom loader because npm's showdown-loader uses showdown-ghost which has been deprecated in favor of
            // showdown
            'showdownjs-loader': path.join(__dirname, './src/webpack/loaders/showdownjs-loader')
        }
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ca]ss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                }),
            },
            {
                test: /\.md$/,
                loader: 'html-loader!showdownjs-loader', 
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
            },
        ],

        // have to put ejs in module.loaders rather than module.rules for HtmlWebpackPlugin to pick up the ejs loader
        loaders: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
            },
        ],
    },
    
    plugins: [],
    externals: {},
    
    devtool: false, //isDev && (isHot ? 'cheap-module-source-map' : 'source-map'),

    devServer: {
        contentBase: '.',
        publicPath: 'http://localhost/',
        host: 'localhost',
        compress: true,
        port: 8080,
        overlay: true,
        index: 'index.html',
        hot: true,
    },
};

/* for vendors (and other modules) we have a CDN for */
function addExternal(name, globalVar) {
    config.externals[name] = globalVar;
    config.entry.vendors.push(name);
}

function addExternals(list) {
    for (var i = 0; i < list.length; i++) {
        addExternal(list[i][0], list[i][1]);
    }
}

function addPlugin(plugin) {
    config.plugins.push(plugin);
}

function addPlugins(plugins) {
    for (var p of plugins) {
        if (p) {
            addPlugin(p);
        }
    }
}

const excludedDevMaps = [
    'vendors',
    'markdown',
];

const excludedDevMapRegex = new RegExp(`(${excludedDevMaps.join('|')})(\\.min)?\\.js`);

addPlugins([
    new CommonsChunkPlugin({
        name: isDev ? ['vendors'] : ['vendors', 'markdown'],
        filename: '[name].min.js',
        minChunks: Infinity
    }),
    new ExtractTextPlugin({
        filename: '[name].min.css',
        disable: isDev,
    }),
    new webpack.DefinePlugin({
        ENVIRONMENT: JSON.stringify(nodeEnv),
        HOT_RELOAD: isHot,
        BUILD_DATE: `'${new Date().toLocaleDateString("en-US")}'`,
    }),
    new HtmlWebpackPlugin({
        template: './src/webpack/index.ejs',
        filename: isProd ? '../index.html' : 'index.html',
        cache: true
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.min\.css$/g,
        cssProcessor: CssNano,
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    new webpack.ProvidePlugin({
        _: 'lodash',
    })
]);

if (isProd) {
    addPlugins([
        new CleanWebpackPlugin(['dist']),
        new UglifyJsPlugin({
            exclude: /node_modules/,
            parallel: true,
            sourceMap: true,
            cache: true,
            uglifyOptions: {
                mangle: true,
            }
        }),
        new UnminifiedPlugin({
            exclude: excludedDevMapRegex,
        }),
    ]);
} else {
    addPlugins([
        new webpack.SourceMapDevToolPlugin({
            test: /\.js$|\.css$/,
            filename: '[file].map',
            exclude: excludedDevMapRegex,
            publicPath: '/',
        }),
        new webpack.HotModuleReplacementPlugin(),    
        new webpack.NamedModulesPlugin(),
    ]);
}

addExternals([
    ['jquery', '$'],
]);

module.exports = config;