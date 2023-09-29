import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue';
import Index from '@/views/index.vue';

import mergeRoutes from "@/scripts/mergeRoutes";

const app = createApp(App);
mergeRoutes().then((routes = []) => {
    console.log(111111,routes);
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {path: '/', component: Index},
            ...routes
        ]
    });

    app.use(router);
    app.mount('#app');
});
