import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue';
import HelloWorld from "@/components/HelloWorld.vue";

import mergeRoutes from './scripts/mergeRoutes'

const app = createApp(App);
mergeRoutes().then((routes) => {
    console.log(9999, routes);

    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {path: '/', component: HelloWorld},
            ...routes
        ]
    })

    app.use(router)

    app.mount('#app')
})
