const path=require('path');
const webpack=require('webpack');
const MiniCssExtractPlugin=require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const CleanWebpackPlugin=require('clean-webpack-plugin'); // 清理垃圾文件

const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue加载器
const PostStylus=require('poststylus'); // stylus加前缀
const HappyPack = require('happypack'); // 分块打包
const os=require('os');
const happyThreadPool=HappyPack.ThreadPool({ size: os.cpus().length });

const components=require('./components.json')
    ,entryObj={};
Object.keys(components).forEach(item => entryObj[item]=components[item]);

/**
 *  css和stylus开发、生产依赖
 *  生产分离css
 */
const cssConfig=[
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            minimize: true,
            sourceMap: false
        }
    },
    'postcss-loader'
]
    ,stylusConfig=[
    MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                minimize: true,
                sourceMap: false
            }
        },
        {
            loader: 'stylus-loader',
            options: {
                sourceMap: false
            }
        }
    ];

const config={
    entry: entryObj,
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js', // [name] 是entry的key
        // publicPath: './lib',
        library: '[name]', // 指定的就是你使用require时的模块名
        libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
        umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssConfig
            },
            {
                test: /\.styl(us)?$/,
                use: stylusConfig
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders:{
                            css: cssConfig,
                            stylus: stylusConfig
                        },
                        preserveWhitespace: false // 不要留空白
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'happypack/loader?id=js_vue',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.(png|jpe?g|gif|bmp|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 配置图片编译路径
                        limit: 8192, // 小于8k将图片转换成base64
                        name: '[name].[ext]?[hash:8]',
                        outputPath: 'images/'
                    }
                },{
                    loader: 'image-webpack-loader', // 图片压缩
                    options: {
                        bypassOnDebug: true
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { // 配置html中图片编译
                        minimize: true
                    }
                }]
            },
            {test: /\.(mp4|ogg|svg)$/,use: ['file-loader']},
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:8192,
                    name:'fonts/[name].[ext]?[hash:8]'
                }
            }
        ]
    },
    resolve: { // 配置路径别名
        extensions: ['.js', '.vue', '.styl'], // import引入文件的时候不用加后缀
        modules: [
            'node_modules'
            ,path.resolve(__dirname, 'src/components')
            ,path.resolve(__dirname, 'src/assets')
        ]
    },
    plugins: [
        new webpack.BannerPlugin(`xs build at ${Date.now()}`),
        new VueLoaderPlugin(), // vue加载器
        new webpack.LoaderOptionsPlugin({ // stylus加前缀
            options: {
                stylus: {
                    use: [
                        PostStylus(['autoprefixer']),
                    ]
                }
            }
        }),
        new CleanWebpackPlugin([path.join(__dirname, 'lib')]),
        new MiniCssExtractPlugin({ // 分离css
            filename: 'theme/[name].css'
        }),
        new HappyPack({
            id: 'js_vue', // id值，与loader配置项对应
            threads: 4, // 配置多少个子进程
            loaders: [{
                loader: 'babel-loader'
            }], // 用什么loader处理
            threadPool: happyThreadPool, // 共享进程池
            verbose: true //允许 HappyPack 输出日志
        })
    ],
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    }
};

module.exports=config;
