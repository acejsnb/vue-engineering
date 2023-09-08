import {createRouter, createWebHistory} from 'vue-router';
import routes from "./routes";

const router = createRouter({
    history: createWebHistory('pro1'),
    routes
});

export default router;