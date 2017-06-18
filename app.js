/**
 * Created by liteng on 2017/6/17.
 */
const express = require('express')
const bodyParser = require('body-parser')


// 先初始化一个 express 实例
const app = express()
console.log('app instance', app)

// 配置 cors, 允许所有 cors 请求通过
// app.use(cors())

// 设置 bodyParser
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
}))
// 设置 bodyParser 解析 json 格式的数据
// application/json
app.use(bodyParser.json())


// 配置静态文件目录这样就可以家在html页面中的文件
app.use(express.static('static'))

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding : 'utf-8'
    }
    fs.readFile(path, options, function(err, data) {
        // console.log(`读取的html文件 ${path} 内容是`, data);
        response.send(data)
    })
}

app.get('/', (request, response) => {
    const path = 'index.html'
    sendHtml(path, response)
    // response.send('index.html')
})


// 把逻辑放在单独的函数中, 这样可以方便地调用
// 指定了默认的 host 和 port, 因为用的是默认参数, 当然可以在调用的时候传其他的值
const run = (port=3000, host='') => {
    // app.listen 方法返回一个 http.Server 对象, 这样使用更方便
    // 实际上这个东西的底层是我们以前写的 net.Server 对象
    const server = app.listen(port, host, () => {
        // 非常熟悉的方法
        const address = server.address()
        host = address.address
        port = address.port
        console.log(`listening server at http://${host}:${port}`)
    })
}

if (require.main === module) {
    const port = 4000
    // host 参数指定为 '0.0.0.0' 可以让别的机器访问你的代码
    const host = '0.0.0.0'
    run(port, host)
}