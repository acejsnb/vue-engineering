import {createRouter, createWebHistory} from 'vue-router';
import routes from "./routes";

const router = createRouter({
    history: createWebHistory('pro2'),
    routes
});

export default router;