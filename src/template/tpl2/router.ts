import {createRouter, createWebHistory} from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory('tpl2'),
    routes
});

export default router;