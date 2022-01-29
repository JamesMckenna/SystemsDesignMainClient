import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting and lazy-loaded when the route is visited
    component: () => import(/* webpackChunkName: "home" */ '../views/Main.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import(/* webpackChunkName: "home" */ '../components/main-components/About.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "home" */ '../components/main-components/Contact.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "home" */ '../views/NotFound.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
