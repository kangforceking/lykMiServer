const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
    ctx.body = 'hello world'
    next()
})

module.exports = router