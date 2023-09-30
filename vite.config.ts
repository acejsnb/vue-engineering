import {resolve} from 'path';
import {defineConfig, loadEnv, mergeConfig} from 'vite';
import type {UserConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {createHtmlPlugin} from 'vite-plugin-html';
import svgLoader from 'vite-svg-loader';

import devConfig from './config/dev.config';
import prodConfig from './config/prod.config';

export default defineConfig(({mode}): UserConfig => {
    // console.log(111,mode);
    const env = loadEnv(mode, process.cwd(), '');
    // console.log(222,env);

    const config: UserConfig = {
        publicDir: 'public',
        envPrefix: 'MWT_',
        define: {
            __MWT_ENV__: JSON.stringify(env.MWT_APP_TPL),
            __NODE_ENV__: JSON.stringify(env.NODE_ENV),
            __MWT_API_URL__: JSON.stringify(env.MWT_API_URL),
            __MWT_SOCKET_URL__: JSON.stringify(env.MWT_SOCKET_URL),
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'], // import引入文件的时候不用加后缀
            alias: {
                '@': resolve(__dirname, 'src'),
                'tenant': resolve(__dirname, 'tenant'),
            }
        },
        plugins: [
            vue(),
            vueJsx(),
            svgLoader(),
            createHtmlPlugin({
                minify: mode === 'production',
                entry: 'src/main.ts',
                template: 'index.html',
                inject: {
                    data: {
                        title: 'MWT',
                    },
                },
            }),
        ],
        esbuild: {
            jsxFactory: 'h',
            jsxFragment: 'Fragment',
        },
    };

    if (mode === 'development') {
        return mergeConfig(config, devConfig(env));
    }
    return mergeConfig(config, prodConfig(env));
});
