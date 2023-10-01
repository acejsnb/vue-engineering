import {resolve} from 'path';
import {defineConfig, loadEnv, mergeConfig} from 'vite';
import type {UserConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {createHtmlPlugin} from 'vite-plugin-html';
import svgLoader from 'vite-svg-loader';

import devConfig from './config/dev.config';
import prodConfig from './config/prod.config';
import TenantConfig from './tenant';

export default defineConfig(({mode}): UserConfig => {
    // console.log(111,mode);
    const env = loadEnv(mode, process.cwd(), '');
    // console.log(222,env);
    const TENANT = env.MWT_TENANT;
    console.log(333,TENANT);
    // 全局变量（挂在到window上）
    const CONFIG = TenantConfig[TENANT];
    const HtmlPluginParams = {
        minify: mode === 'production',
        entry: TENANT ? `tenant/${TENANT}/main.ts` : 'src/main.ts',
        template: 'index.html',
        inject: {
            data: {
                title: CONFIG?.name ?? 'MWT'
            }
        }
    };

    const config: UserConfig = {
        publicDir: 'public',
        envPrefix: 'MWT_',
        define: { CONFIG: CONFIG || {} },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'], // import引入文件的时候不用加后缀
            alias: {
                '@': resolve(__dirname, 'src'),
                'tenant': resolve(__dirname, 'tenant')
            }
        },
        plugins: [
            vue(),
            vueJsx(),
            svgLoader(),
            createHtmlPlugin(HtmlPluginParams)
        ],
        esbuild: {
            jsxFactory: 'h',
            jsxFragment: 'Fragment'
        }
    };

    if (mode === 'development') {
        return mergeConfig(config, devConfig(env));
    }
    return mergeConfig(config, prodConfig(env));
});
