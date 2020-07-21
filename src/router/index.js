import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/share')
  },
  {
    path: '/copy',
    component: () => import('@/views/copy')
  },
  {
    path: '/share2',
    component: () => import('@/views/sharewithvue')
  },
  {
    path: '/email',
    component: () => import('@/views/email')
  },
  {
    path: '/table',
    component: () => import('@/views/table')
  },
  {
    path: '/remotePay',
    component: () => import('@/views/remotePay')
  }
]

const router = new VueRouter({
  routes
})

export default router
