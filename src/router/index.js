import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainLayout from "@/Layouts/MainLayout.vue";
import EmptyLayout from "@/Layouts/EmptyLayout.vue";
import Login from "@/views/Login.vue";
import Categories from "@/views/Categories.vue";

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
  }
  ,
  {
    path: '/categories',
    component: MainLayout,
    children:[
        {
          path: '',
          component: () => import('../views/Categories.vue'),
        }
        ]

  },
  {
    path: '/dashboard',
    component: MainLayout,
    children:[
      {
        path: '',
        component: () => import('../views/Dashboard.vue'),
      }
    ]
  },
  {
    path: '/calendar',
    component: MainLayout,
    children:[
      {
        path: '',
        component: () => import('../views/Calendar.vue'),
      }
    ]
  },
  {
    path: '/profile',
    component: MainLayout,
    children:[
      {
        path: '',
        component: () => import('../views/Profile.vue'),
      }
    ]
  },
  {
    path: '/history',
    component: MainLayout,
    children:[
      {
        path: '',
        component: () => import('../views/History.vue'),
      }
    ]
  }
    ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: '/oz-km-crm/',
  routes
})

export default router
