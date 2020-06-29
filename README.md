# 使用vue实现的电商管理系统
## 一、目标:
- 能够基于Vue初始化项目;
- 能够基于Vue技术进行项目开发;
- 能够使用Vue的第三方组件进行项目开发;
- 能够说出前后端分离的开发模式;

## 二、项目概述:
- 客户使用的业务服务：PC端，小程序，移动web，移动app
- 管理员使用的业务服务：PC后台管理端。
- PC后台管理端的功能：管理用户账号（登录，退出，用户管理，权限管理），商品管理（商品分类，分类参数，商品信息，订单），数据统计
![](./images/jiegou.jpg)

- 电商后台管理系统采用前后端分离的开发模式
- 前端项目是基于Vue的SPA（单页应用程序）项目

- 前端技术栈:Vue,Vue-Router,Element-UI,Axios,Echarts
- 后端技术栈：Node.js,Express,Jwt(模拟session),Mysql,Sequelize(操作数据库的框架)



## 三、项目初始化:

### 1. 初始化前端项目:
- 安装Vue脚手架
- 通过脚手架创建项目
- 配置路由
- 配置Element-UI:在插件中安装，搜索```vue-cli-plugin-element```
- 配置Axios：在依赖中安装,搜索axios(运行依赖)
- 初始化git仓库
- 将本地项目托管到github或者码云中

### 2. 配置后台项目:

```
参考 "电商管理后台API接口文档.md"
```

## 四、登录/退出功能:
### 1. 登录业务流程:
- 在登陆页面输入用户名和密码;
- 调用后台接口进行验证;
- 通过验证之后, 根据后台的响应状态跳转到项目页面;

### 2. 相关技术点:
- http无状态:
- 通过cookie/session记录状态;
- 通过token方式维持状态保持;

**注意:**
- 前后端不存在跨域, 使用cookie/session;
- 前后端存在跨域, 使用token;

## 五、主页布局：


## 六、用户管理模块：


## 七、权限管理模块：


## 八、分类管理模块：


## 九、参数管理模块：


## 十、商品管理模块：

## 十一、订单管理模块：


## 十二、数据统计模块：


## 十三、项目优化与部署上线:
### 1. 项目优化:
#### 1.1 使用nprogress包,添加进度条效果:
- 运行命令```npm install --save nprogress```
- 基于axios拦截器展示进度条;
```js
// ./main.js
...
// 导入进度条包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置axios请求拦截器
axios.interceptors.request.use(config => {
  // 展示进度条
  NProgress.start()
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  NProgress.remove()
  return config
})
...
```
#### 1.2 去除build产生的console错误:
使用bable-plugin-transform-remove-console依赖
- 运行命令```npm install babel-plugin-transform-remove-console --save-dev```,安装依赖;
- 在```babel.config.js```中添加引用, 其中要注意, 这个依赖在```开发模式```中式不需要的,所以:
```js
// ./babel.config.js
// 项目发布阶段需要用到的babel插件
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: ['@vue/app'],

  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时的插件数组
    ...prodPlugins
  ]
}
```

### 2. 生成打包报告:
打包时, 为了直观地发现或项目中存在的问题, 可以在打包时生成报告. 生成报告的方式有两种:
- 通过命令行参数的形式生成报告
```js
// 通过vue-cli的命令选项可以生成打包报告
// --report 选项可以商城report.html, 以帮助分析打包内容
vue-cli-service build --report
```
- 通过可视化的UI面板直接查看报告:
在可视化的UI面板中, 通过```控制台和分析```面板, 可以方便地看到项目中所存在的问题

### 3. 打包优化:
#### 3.1 通过vue.config.js修改webpack的默认配置:
通过vue-cli 3.0工具生成的仙姑, ```默认隐藏了所有webpack的配置项```, 目的是为了屏蔽项目的配置过程, 让程序员把工作重心,放到具体功能和业务逻辑的实现上.
如果有修改webpack默认配置的需求, 可以在项目根目录中, 按需创建```vue.config.js```这个配置文件, 从而对项目的打包发布过程做自定义的配置(具体配置参考[https://cli.vuejs.org/zh/config/#vue-config-js](https://cli.vuejs.org/zh/config/#vue-config-js))
```js
// ./vue.config.js
module.exports = {
  // 选项...
}
```

#### 3.2 为开发模式与发布模式指定不同的打包入口:
默认情况下, vue项目的**开发模式**和**发布模式**, 共用同一个打包的入口文件(即```src/main.js```). 为了将项目的开发与发布过程分离, 可以为两种模式, 各自指定打包的入口文件, 即:
- 开发者模式入口文件为```src/main-dev.js```;
- 发布模式入口文件为```src/main-prod.js```;

#### 3.3 configureWebpack和chainWebpack:
在vue.cinfig.js导出的配置对象中, 新增```configureWebpack```或```chainWebpack```节点, 来定义webpack的打包位置;
在这里, configureWebpack和chainWebpack的作用是相同的, 唯一的区别就是他们修改webpack配置爱的方式不同:
- configureWebpack:通过```链式编程```的形式, 来修改默认的webpack配置;
- chainWebpack 通过```操作对象```的形式, 来修改默认的webpack配置;

两者具体的使用差异, 可以参考如下网址:
[https://cli.vuejs.org/zh/guide/webpack.html](https://cli.vuejs.org/zh/guide/webpack.html)

#### 3.3 通过chainWebpack自定义打包入口:
示例代码:
```js
// ./vue.config.js
module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}
```
### 4. 通过externals加载第三方库CDN资源:
默认情况下, 通过mimport语法导入的第三方依赖包, 最终会被打包合并到同一个文件中, 从而导致打包成功后,单文件体积过大的问题;
为了解决上述问题, 可以通过webpack的enternals节点, 来配置并加载外部的CDN资源. 凡是声明externals中的第三方以来, 都不会被打包.

- 在打包配置文件中添加配置节点
```js
// ./vue.config.js
module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      ...
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        loadsh: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })
    })
    // 开发模式
    ...
  }
}
```
- 打开开发入口文件```main-prod.js```,删除掉默认的引入代码:
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式
import './assets/css/global.css'
//导入第三方组件vue-table-with-tree-grid
import TreeTable from 'vue-table-with-tree-grid'
//导入进度条插件
import NProgress from 'nprogress'
//导入进度条样式
// import 'nprogress/nprogress.css'
// //导入axios
import axios from 'axios'
// //导入vue-quill-editor（富文本编辑器）
import VueQuillEditor from 'vue-quill-editor'
// //导入vue-quill-editor的样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  //当进入request拦截器，表示发送了请求，我们就开启进度条
  NProgress.start()
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token")
  //必须返回config
  return config
})
//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config =>{
  //当进入response拦截器，表示请求已经结束，我们就结束进度条
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

//全局注册组件
Vue.component('tree-table', TreeTable)
//全局注册富文本组件
Vue.use(VueQuillEditor)

//创建过滤器将秒数过滤为年月日，时分秒
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth()+1+'').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')

  const hh = (dt.getHours()+'').padStart(2,'0')
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```
- 需要在```public/index.html```文件的头部, 添加如下引用的CDN资源引用:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>电商后台管理系统</title>

    <!-- nprogress 的样式表文件 -->
    <link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" />
    <!-- 富文本编辑器 的样式表文件 -->
    <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.core.min.css" />
    <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.snow.min.css" />
    <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.bubble.min.css" />
    <!-- element-ui 的样式表文件 -->
    <link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css" />

    <script src="https://cdn.staticfile.org/vue/2.5.22/vue.min.js"></script>
    <script src="https://cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js"></script>
    <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
    <script src="https://cdn.staticfile.org/lodash.js/4.17.11/lodash.min.js"></script>
    <script src="https://cdn.staticfile.org/echarts/4.1.0/echarts.min.js"></script>
    <script src="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js"></script>
    <!-- 富文本编辑器的 js 文件 -->
    <script src="https://cdn.staticfile.org/quill/1.3.4/quill.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.4/dist/vue-quill-editor.js"></script>

    <!-- element-ui 的 js 文件 -->
    <script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js"></script>

  </head>
  <body>
    <noscript>
      <strong>We're sorry but vue_shop doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

### 5. Element-UI组件按需加载:
虽然在开发阶段, 启用了element-ui组件的按需加载, 尽可能的减少了打包的体积, 但是那些被按需加载的组件, 还是占用了较大的文件体积. 因此, 可以将element-ui中的组件, 也通过CDN的形式来加载, 这样能进一步的减少打包后的体积.
具体操作如下:
- 在```main-prod.js```中, 注释掉element-ui按需加载的代码;
```js
// import './plugins/element.js'
```
在```index.html```头部区域, 通过CDN加载eleent-ui的js和css样式:
```html
<!-- element-ui的样式文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css" />

<!-- element-ui的js文件 -->
<script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js></script>
```

### 6. 首页内容定制:
不同的打包环境下,首页内容可能会有所不同, 可以通过插件的方式定制, 插件配置如下:
使用插件```htmlWebpackPlugin```
```js
// ./vue.config.js
module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      ...
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      ...
        config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
```
在```public/index.html```首页中, 可以根据```isProd```的值, 来决定如何渲染页面结构:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <!-- 按需渲染页面标题 -->
    <title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev - '%>电商后台管理系统</title>
    ...
    <%= if(htmlWebpackPlugin.options.isProd) {%>
    <!-- 通过externals加载的外部CDN资源 -->
    <% } %>
  </head>

```

### 6. 路由懒加载:
当打包构建项目时, JavaScript包会变得非常大. 影响页面加载, 如果能把不同路由对应的组件分割成不同的代码块, 然后当路由被访问时才加载组件, 这样就更高效了.
具体的步骤:
- 安装 ```@babel/plugin-syntax-dynamic-import```
打开vue控制台，点击```依赖->安装依赖->开发依赖->搜索@babel/plugin-syntax-dynamic-import```, 点击安装;

- 在```babel.config.js```中声明该插件:
```js
// ./babel.config.js

const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: ['@vue/app'],

  plugins: [
    [
      ...
    ],
    ...prodPlugins,
    //配置路由懒加载插件
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

- 将路由更改为按需加载的形式，打开```router.js```，更改引入组件
```js
import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ './components/Login.vue')
// import Login from './components/Login.vue'
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ './components/Home.vue')
// import Home from './components/Home.vue'
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ './components/Welcome.vue')
```
**说明:**
- ```import(参数1, 参数2)```: 参数1: 表示打包后的文件名; 参数2: 组件路径
具体参考:
[https://router.vuejs.org/zh/guide/advanced/lazy-loading.html](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)


### 7. 项目上线:
#### 7.1 通过node创建服务器:
创建node项目, 并安装```express```, 通过express快速创建web服务器, 将vue打包生成的dist文件夹托管为```静态资源```即可;
关键代码:
- 在```vue_shop```同级创建一个文件夹```vue_shop_server```存放node服务器
- 使用终端打开vue_shop_server文件夹，输入命令 ```npm init -y```
- 初始化包之后，输入命令 ```npm i express -S```
- 打开vue_shop目录，复制dist文件夹，粘贴到vue_shop_server中
- 在vue_shop_server文件夹中创建```app.js```文件,编写代码如下：
```js
const express = require('express')
// 创建web服务器
const app = express()
// 托管静态资源(注册中间件)
app.use(express.static('./dist'))
// 启动服务器
app.listen(80,()=>{
    console.log("server running at http://127.0.0.1:80")
})
```
- 启动服务```node app.js```

#### 7.2 开启gzip压缩:
使用```gzip```可以减小文件体积, 使传输速度更快;
- 打开vue_shop_server文件夹的终端，输入命令：```npm i compression -S```
- 打开app.js,编写代码：
```js
const express = require('express')
// 导入 压缩包
const compression = require('compression')

const app = express()
// 注册中间件
app.use(compression())  // 一定要在静态资源托管前
app.use(express.static('./dist'))

app.listen(80,()=>{
    console.log("server running at http://127.0.0.1:80")
})
```

#### 7.3 配置https服务:
配置https服务一般是后台进行处理;
- 需要申请SSL证书，进入官网[https://freessl.cn](https://freessl.cn)
- 在后台导入证书
- 打开app.js文件，编写代码导入证书，并开启https服务
```js
const express = require('express')
const compression = require('compression')
// 导入
const https = require('https')
const fs = require('fs')

const app = express()

//创建配置对象设置公钥和私钥
const options = {
    cert:fs.readFileSync('./full_chain.pem'),
    key:fs.readFileSync('./private.key')
}

app.use(compression())
app.use(express.static('./dist'))

// app.listen(80,()=>{
//     console.log("server running at http://127.0.0.1:80")
// })

//启动https服务
https.createServer(options,app).listen(443)
```
#### 7.4 使用pm2管理应用:
打开vue_shop_server文件夹的终端，输入命令：```npm i pm2 -g```
使用pm2启动项目，在终端中输入命令：```pm2 start app.js --name 自定义名称```
- 查看项目列表命令: ```pm2 ls```
- 重启项目: ```pm2 restart 自定义名称```
- 停止项目: ```pm2 stop 自定义名称```
- 删除项目: ```pm2 delete 自定义名称```