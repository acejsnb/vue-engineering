const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin'); // 自动生成index.html
const MiniCssExtractPlugin=require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin'); // 清理垃圾文件

const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue加载器
const PostStylus=require('poststylus'); // stylus加前缀
const HappyPack = require('happypack'); // 分块打包
const os=require('os');
const happyThreadPool=HappyPack.ThreadPool({ size: os.cpus().length });

// 获取本机ip
const get_ip=require('./get_ip')();

console.log('******本机ip******:', get_ip);

/**
 * 判断是生产环境还是开发环境
 * @type {boolean}
 * isProd为true表示生产
 */
const isProd=process.env.NODE_ENV==='production';

/**
 *  css和stylus开发、生产依赖
 *  生产分离css
 */
const cssConfig=[
    isProd?MiniCssExtractPlugin.loader:'vue-style-loader',
    {
        loader: 'css-loader',
        options: {
            sourceMap: !isProd
        }
    },
    'postcss-loader'
]
    ,stylusConfig=[
        isProd?MiniCssExtractPlugin.loader:'vue-style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: !isProd
            }
        },
        {
            loader: 'stylus-loader',
            options: {
                sourceMap: !isProd
            }
        }
    ];

const config={
    entry: {
        index: isProd ? './src/components/index.js' : './src/main.js' // 入口文件
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js', // [name] 是entry的key
        publicPath: '/',
        library: 'Sui', // 指定的就是你使用require时的模块名
        libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
        umdNamedDefine: isProd // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:cssConfig
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
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
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
            ,path.resolve(__dirname, 'src/assets')
            ,path.resolve(__dirname, 'src/components')
        ]
    },
    plugins: [
        new webpack.BannerPlugin(`xs build at ${Date.now()}`),
        new VueLoaderPlugin(), // vue加载器
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
            canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
        }),
        new HappyPack({
            id: 'js_vue', // id值，与loader配置项对应
            loaders: [{
                loader: 'babel-loader'
            }], // 用什么loader处理
            threadPool: happyThreadPool, // 共享进程池
            verbose: true //允许 HappyPack 输出日志
        }),
        new webpack.LoaderOptionsPlugin({ // stylus加前缀
            options: {
                stylus: {
                    use: [
                        PostStylus(['autoprefixer']),
                    ]
                }
            }
        })
    ]
};

if(isProd){
    config.plugins.push(
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
        new MiniCssExtractPlugin({ // 分离css
            filename: '[name].css'
        })
    );
    config.externals={
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    }
} else {
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html') // 引入模版
            ,favicon: path.join(__dirname, 'src/assets/icon/favicon.ico')
            ,filename: 'index.html'
            ,minify: { // 对index.html压缩
                collapseWhitespace: isProd // 去掉index.html的空格
                ,removeAttributeQuotes: isProd // 去掉引号
            }
            ,hash: true // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
            // ,chunks:['vendor','main'] // 在产出的html文件里面引入哪些代码块，里面的名字要跟entry里面key对应(一般用于多文件入口)
            ,inlineSource:  '.(js|css)'
        })
    );
    config.devtool='source-map'; // 如果只用source-map开发环境出现错误定位源文件，生产环境会生成map文件
    config.devServer = {
        contentBase: path.join(__dirname, 'dist') // 将 dist 目录下的文件，作为可访问文件。
        , compress: true // 开启Gzip压缩
        // , host: 'localhost' // 设置服务器的ip地址，默认localhost
        , host: get_ip // 设置服务器的ip地址，默认localhost
        , port: 6001 // 端口号
        , open: true // 自动打开浏览器
        , hot: true
        , overlay: { // 当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        }
    };
}

module.exports=config;
