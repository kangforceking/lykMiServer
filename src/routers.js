const router = require('koa-router')()
const ControllHome = require('./controller/home')
const ControllRegister = require('./controller/register')
const ControllLogin = require('./controller/login')
const ControllUserList = require('./controller/userList')
const ControllLogout = require('./controller/logout')
module.exports = () => {
    router.get('/', ControllHome)
    router.post('/register', ControllRegister)
    router.post('/login', ControllLogin)
    router.delete('/logout', ControllLogout)
    router.get('/userList', ControllUserList)
    return router
}