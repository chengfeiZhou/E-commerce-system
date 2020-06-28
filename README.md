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

### 2. 第三方库启用CDN:

### 3. Element-UI组件按需加载:

### 4. 路由懒加载:


### 5. 首页内容定制:



