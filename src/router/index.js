import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' }, // 路由重定向
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 如果用户访登录页, 直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取保存的token值
  if (!window.sessionStorage.getItem('token')) return next('/login')
  next()
})

export default router
