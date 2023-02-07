import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/layout',
    // name: 'layout',//子级有默认路由不需要name
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '', //默认路由
        name: 'home',
        component: () => import('@/views/Home'),
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/QA'),
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My'),
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search'),
  },
  {
    path: '/artical/:article_id',
    name: 'artical',
    component: () => import('@/views/Artical'),
    props: true,
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/User'),
  },
]
const router = new VueRouter({
  routes,
})

export default router
