import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/Home'
// import Welcome from '../components/Welcome'
// import User from '../components/user/Users'
// import Rights from '../components/power/Rights'
// import Roles from '../components/power/Roles'

const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')
const User = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/power/Roles.vue')

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
      { path: '/users', component: User },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles }
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
