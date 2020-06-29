const koa = require('koa') 
const app = new koa()
const koaBody = require('koa-body')
const mongoose = require('mongoose')
const {
    listen,
    mongodbUrl,
    dbName
} = require('./confing')
const router = require('./routers')()

// const server = require('http').Server(app.callback())
// const io = require('socket.io')(server);

mongoose.set('useCreateIndex', true)
// 连接数据库
mongoose
    .connect(mongodbUrl, {
        dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('数据据这接成功')
    })
    .catch((error)=>{
        console.log('数据据这接失败', error)
    })

app
    .use(async (ctx, next) => {
        ctx.mongoose = mongoose
        await next()
    })
    .use(koaBody())
    .use(async (ctx, next) => {
        console.log(`${ctx.method}`,`${ctx.url}`)
        ctx.body = JSON.stringify(ctx.request.body)
        await next()
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(listen)
    .on('error', err => {
        console.error(err)
    })

// app.listen(port, () => {∏
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
