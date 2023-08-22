import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainLayout from "@/Layouts/MainLayout.vue";
import EmptyLayout from "@/Layouts/EmptyLayout.vue";
import History from '../views/History.vue'; // Путь к компоненту History

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: EmptyLayout,
        children: [
            {
                path: '',
                component: () => import('../views/Login.vue'),
            }
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: EmptyLayout,
        children: [
            {
                path: '',
                component: () => import('../views/Register.vue'),
            }
        ]
    },
    {
        path: '/categories',
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('../views/Categories.vue'),
            }
        ]
    },
    {
        path: '/dashboard',
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('../views/Dashboard.vue'),
            }
        ]
    },
    {
        path: '/calendar',
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('../views/Calendar.vue'),
            }
        ]
    },
    {
        path: '/profile',
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('../views/Profile.vue'),
            }
        ]
    },
    {
        path: '/history',
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('../views/History.vue'),
            }
        ]
    },
    {
        path: '/record/:id', // Обратите внимание на :id
        name: 'Record', // Имя маршрута
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('../views/Record.vue'),
            },
        ],
        props: true, // Включите передачу параметров как свойства компонента
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: '/oz-km-crm/',
    routes
})

export default router
