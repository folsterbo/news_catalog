import Vue from 'vue';
import VueRouter from 'vue-router';

import NewsPanel from '../components/specific/NewsPanel'
import NewsPortal from '../components/specific/NewsPortal'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/rubriki',
        component: NewsPanel,
    },
    {
        path: '/news',
        component: NewsPortal,
    },
];

const router = new VueRouter(
    {
        mode: 'history',
        routes,
    },
);

export default router;