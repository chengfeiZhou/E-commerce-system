import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

const User = () => import(/* webpackChunkName: "user_roghts_roles_cat" */ '../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName: "user_roghts_roles_cat" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "user_roghts_roles_cat" */ '../components/power/Roles.vue')
const Cat = () => import(/* webpackChunkName: "user_roghts_roles_cat" */ '../components/goods/Cat.vue')

const Params = () => import(/* webpackChunkName: "params_goodslist_addgoods" */ '../components/goods/Params.vue')
const GoodsList = () => import(/* webpackChunkName: "params_goodslist_addgoods" */ '../components/goods/GoodsList.vue')
const addGoods = () => import(/* webpackChunkName: "params_goodslist_addgoods" */ '../components/goods/addGoods.vue')

const Order = () => import(/* webpackChunkName: "order_report" */ '../components/order/Orders.vue')
const Report = () => import(/* webpackChunkName: "order_report" */ '../components/report/report.vue')

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
      { path: '/roles', component: Roles },
      { path: '/categorys', component: Cat },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/addGoods', component: addGoods },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
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
