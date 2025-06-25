import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookKeeperView from '../views/BookKeeperView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/book-keeper',
      name: 'book-keeper',
      component: BookKeeperView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/borrowing',
      name: 'borrowing',
      component: () => import('../views/BorrowingView.vue')
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/books',
      name: 'books',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BookView.vue'),
    },
    {
      path: '/reader',
      name: 'reader',
      component: () => import('../views/TableView.vue'),
    },
  ],
})

export default router
