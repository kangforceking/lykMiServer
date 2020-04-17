const Router = require('koa-router')
const router = new Router()

const ControllHome = require('./controller/home')
const ControllRegister = require('./controller/register')

router.get('/', ControllHome)
router.post('/register', ControllRegister)

module.exports = router