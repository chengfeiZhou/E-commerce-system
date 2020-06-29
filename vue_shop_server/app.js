const express = require('express')
// 创建web服务器
const app = express()
// 托管静态资源(注册中间件)
app.use(express.static('./dist'))
// 启动服务器
app.listen(80,()=>{
    console.log("server running at http://127.0.0.1:80")
})