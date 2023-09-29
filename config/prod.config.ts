import {resolve} from 'path';
import {Plugin as importToCDN} from "vite-plugin-cdn-import";
import viteCompression from "vite-plugin-compression";
// import legacy from '@vitejs/plugin-legacy';

export default (env) =>  {
    return {
        plugins: [
            importToCDN({
                modules: [
                    {
                        name: 'vue',
                        var: 'Vue',
                        path: 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js',
                    },
                    {
                        name: 'vue-router',
                        var: 'VueRouter',
                        path: 'https://cdn.jsdelivr.net/npm/vue-router@4.2.4/dist/vue-router.global.prod.js',
                    },
                ]
            }),
            viteCompression({
                verbose: true, // 是否在控制台中输出压缩结果
                disable: false,
                threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
                algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
                ext: '.gz',
                deleteOriginFile: false, // 源文件压缩后是否删除
            }),
            /*legacy({
                targets: ['defaults', 'not IE 11'],
            }),*/
        ],
        build: {
            outDir: 'dist',
            target: ['chrome87', 'firefox57', 'firefox57', 'safari11'],
            // target: 'es5',
            minify: 'terser',
            cssTarget: ['chrome87', 'firefox57', 'firefox57', 'safari11'],
            assetsDir: 'assets',
            assetsInlineLimit: 4096,
            rollupOptions: {
                // input: resolve(__dirname, '../index.html'),
                // input: '../src/main.ts',
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name.includes('.html')) {
                            return 'dist/index.html';
                        } else if (assetInfo.name.includes('.css')) {
                            return 'css/[name]-[hash].[ext]';
                        } else {
                            return 'static/[name]-[hash].[ext]';
                        }
                    },
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                    }
                }
            },
            terserOptions: {
                compress: {
                    // drop_console: true,
                    drop_debugger: true,
                },
            }
        }
    }
}