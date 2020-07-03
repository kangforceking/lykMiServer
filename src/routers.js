const router = require('koa-router')()
const ControllHome = require('./controller/home')
const ControllRegister = require('./controller/register')
const ControllLogin = require('./controller/login')
const ControllFriendList = require('./controller/friendList')
const ControllLogout = require('./controller/logout')
module.exports = () => {
    router.get('/', ControllHome)
    router.post('/register', ControllRegister)
    router.post('/login', ControllLogin)
    router.delete('/logout', ControllLogout)
    router.get('/friendList', ControllFriendList)
    return router
}