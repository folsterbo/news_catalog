import Vue from 'vue';
import VueRouter from 'vue-router';

import TheRubrics from '../components/specific/TheRubrics'
import TheNews from '../components/specific/TheNews'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/rubrics',
        component: TheRubrics,
    },
    {
        path: '/news',
        component: TheNews,
    },
];

const router = new VueRouter(
    {
        mode: 'history',
        routes,
    },
);

export default router;