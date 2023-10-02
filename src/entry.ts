import {createApp} from 'vue';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import App from './App.vue';
import Index from '@/views/index.vue';

export default async function () {
    const app = createApp(App);
    const module = await import('@/scripts/mergeRoutes.ts');
    const routes = (await module.default()) as RouteRecordRaw[];

    console.log('%c======== 路由列表 - start ========', 'color:#00ff27;');
    console.table(routes);
    console.log('%c======== 路由列表 - end ========', 'color:#00ff27;');
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {path: '/', component: Index},
            ...routes
        ]
    });

    app.use(router);
    app.mount('#app');
}
