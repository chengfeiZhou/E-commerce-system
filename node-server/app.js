const express = require('express')
const app = express()
const compression = require('compression')

app.use(compression())
// 指定静态资源目录
app.use(express.static('../dist'))


app.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
