import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
// 导入属性表格
import ZkTable from 'vue-table-with-tree-grid'
// v-viewer
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
// 富文本编辑器 vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入nprogress
import NPrpgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置axios请求拦截器
axios.defaults.base = 'http://127.0.0.1:8888/api'
// 在request拦截器中展示进度条
axios.interceptors.request.use(config => {
  // 加入token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  NPrpgress.start()
  return config
})
// 在response中隐藏进度条
axios.interceptors.response.use(config => {
  NPrpgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('tree-table', ZkTable)

Vue.filter('dateFormat', (originVal) => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.use(Viewer)
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
