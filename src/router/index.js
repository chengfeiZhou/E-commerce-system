import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import User from '../components/user/Users.vue'

const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')
const User = () => import(/* webpackChunkName:"user" */ '../components/user/Users.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' }, // 路由重定向
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User }
    ]
  }
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
