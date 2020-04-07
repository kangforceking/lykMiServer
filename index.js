const koa = require('koa') 
const app = new koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`app run at : http://127.0.0.1:${port}`);
})

io.on('connection', socket => {
    console.log('socket已连接');
    socket.on('msg', (data) => {
        console.log(data)
        socket.emit('backMsg', data)
    })
    socket.on('disconnect', function () {
        console.log('已断开')
    })
})