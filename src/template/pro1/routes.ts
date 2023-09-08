const routes = [
    {
        path: "/",
        name: "Page1",
        component: () => import("@/template/pro1/pages/Page1.vue"),
        meta: {
            title: "Page1",
        },
    },
    {path: '/page2', name: 'Page2', component: () => import("@/template/pro1/pages/Page2.vue")},
];

export default routes;
