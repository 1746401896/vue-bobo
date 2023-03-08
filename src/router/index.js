import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { // 在路由配置中加入meta:{requireAuth: true}
        requireAuth: false, //false 不需要登录权限
        index: 4
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { // 在路由配置中加入meta:{requireAuth: true}
        requireAuth: false, //false 不需要登录权限
        index: 4
      }
      
    }
  ]
})

export default router
