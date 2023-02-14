import Vue from 'vue';
import VueRouter from 'vue-router';

import TheHome from '../components/specific/TheHome'
import TheNews from '../components/specific/TheNews'
import TheRubrics from '../components/specific/TheRubrics'
import TheArticle from '../components/specific/TheArticle'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: TheHome,
    },
    {
        path: '/rubrics',
        component: TheRubrics,
    },
    {
        path: '/news',
        component: TheNews,
    },
    {
        path: '/article',
        component: TheArticle,
    },
];

const router = new VueRouter(
    {
        mode: 'history',
        routes,
    },
);

export default router;