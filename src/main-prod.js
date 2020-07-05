import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import axios from 'axios'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入进度条包
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// 设置axios请求拦截器
axios.defaults.base = 'http://127.0.0.1:8888/api'
axios.interceptors.request.use(config => {
  // 展示进度条
  NProgress.start()
  // 加入token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  NProgress.remove()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
