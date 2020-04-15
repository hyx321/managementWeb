import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home.vue'
import Test from '../components/Test.vue'
import User from '../components/user/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: login
  }, {
    path: '/home',
    component: Home,
    redirect: 'test',
    children: [
      {
        path: '/test',
        component: Test
      }, {
        path: '/104',
        component: User
      }, {
        path: '/115',
        component: User
      }, {
        path: '/107',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/login')
//   next()
// })

export default router
