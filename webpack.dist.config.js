var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, 'src/app.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'game.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            // pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            // phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            // p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
            assets: path.join(__dirname, 'assets/')
        }
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: []
        }),
        new webpack.DefinePlugin({
            'DEBUG': false,

            // Do not modify these manually, you may break things...
            'DEFAULT_GAME_WIDTH': /*[[DEFAULT_GAME_WIDTH*/960/*DEFAULT_GAME_WIDTH]]*/,
            'DEFAULT_GAME_HEIGHT': /*[[DEFAULT_GAME_HEIGHT*/720/*DEFAULT_GAME_HEIGHT]]*/,
            'MAX_GAME_WIDTH': /*[[MAX_GAME_WIDTH*/960/*MAX_GAME_WIDTH]]*/,
            'MAX_GAME_HEIGHT': /*[[MAX_GAME_HEIGHT*/720/*MAX_GAME_HEIGHT]]*/,
            'SCALE_MODE': JSON.stringify(/*[[SCALE_MODE*/'SHOW_ALL'/*SCALE_MODE]]*/),

            // The items below most likely the ones you should be modifying
            'GOOGLE_WEB_FONTS': JSON.stringify([ // Add or remove entries in this array to change which fonts are loaded
                //'Barrio'
                'Anton'
            ]),
            'SOUND_EXTENSIONS_PREFERENCE': JSON.stringify([ // Re-order the items in this array to change the desired order of checking your audio sources (do not add/remove/modify the entries themselves)
                'webm', 'ogg', 'm4a', 'mp3', 'aac', 'ac3', 'caf', 'flac', 'mp4', 'wav'
            ])
        }),
        /*new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: '85-90'
            },
            optipng: {
                optimizationLevel: 9
            },
            jpegtran: {
                progressive: true
            },
            svgo: {

            }
        }),*/
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new Uglify({
            uglifyOptions: {
                compress: {
                    warnings: false,
                },
                output: {
                    comments: false
                },
                screw_ie8: true
            },
            //sourceMap: true,
        }),
        /*new Uglify({
            compress: {
                warnings: false
            },
            screw_ie8: true
        }),*/
        new HtmlWebpackPlugin({
            title: 'Cinderella\'s Academy Awards Collection',
            gaScript:
            `<script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        
                ga('create', 'UA-3795986-7', 'auto');
            </script>`,
            phaserScript: `<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/phaser-ce/2.9.0/phaser.min.js"></script>`, //
            imaScript: `<script type="text/javascript" src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"></script>`, //
            template: path.join(__dirname, 'templates/index.ejs')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /assets(\/|\\)/, loader: 'file-loader?name=assets/[hash].[ext]' },
            // { test: /pixi\.js$/, loader: 'expose-loader?PIXI' },
            // { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
            // { test: /p2\.js$/, loader: 'expose-loader?p2' },
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' }
        ]
    }
};
