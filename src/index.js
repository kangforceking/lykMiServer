const koa = require('koa') 
const app = new koa()
const mongoose = require('mongoose')
const {
    listen,
    mongodbUrl,
    dbName
} = require('./confing')
// const server = require('http').Server(app.callback())
// const io = require('socket.io')(server);
const port = 3000;

const router = require('./router/routers')

// 连接数据库
mongoose
    .connect(mongodbUrl, {
        dbName
    })
    .then(()=>{
        console.log('数据据这接成功')
    })
    .catch((error)=>{
        console.log('数据据这接失败', error)
    })

app
    .use(async (ctx) => {
        ctx.mongoose = mongoose
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(listen)

// app.listen(port, () => {
//     console.log(`app run at : http://127.0.0.1:${port}`);
// })

// io.on('connection', socket => {
//     console.log('socket已连接');
//     socket.on('msg', (data) => {
//         console.log(data)
//         socket.emit('backMsg', data)
//     })
//     socket.on('disconnect', function () {
//         console.log('已断开')
//     })
// })