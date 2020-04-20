const router = require('koa-router')()
const ControllHome = require('./controller/home')
const ControllRegister = require('./controller/register')
const ControllLogin = require('./controller/login')

module.exports = () => {
    router.get('/', ControllHome)
    router.post('/register', ControllRegister)
    router.post('/login', ControllLogin)
    return router
}