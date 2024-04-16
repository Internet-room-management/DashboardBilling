const MainMenuNet = {
    path: '/mainNet',
    meta: {
        requiresAuth: true
    },
    redirect: '/mainNet',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            path: '/',
            redirect: "/dashboards/MenuNet",
        },
        {
            name: 'MenuNet',
            path: "/dashboards/MenuNet",
            component: () => import('@/views/menuNet/DashboardNet.vue'),
        },
    ]
};

export default MainMenuNet;
