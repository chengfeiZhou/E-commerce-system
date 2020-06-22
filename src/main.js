import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 设置axios请求拦截器
axios.defaults.base = 'http://127.0.0.1:8888/api'
axios.interceptors.request.use(config => {
  // 加入token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')