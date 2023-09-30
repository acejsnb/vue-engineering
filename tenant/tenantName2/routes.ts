export default [
    {
        name: 'Home',
        path: '/',
        component: () => import('@/template/tpl2/views/home/Home.vue')
    },
    {
        name: 'Page2',
        path: '/page2',
        component: () => import('@/template/tpl1/views/page1/Page1.vue')
    }
];
