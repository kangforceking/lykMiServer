const router = require('koa-router')()
const ControllHome = require('./controller/home')
const ControllRegister = require('./controller/register')

module.exports = () => {
    router.get('/', ControllHome)
    router.post('/register', ControllRegister)
    return router
}