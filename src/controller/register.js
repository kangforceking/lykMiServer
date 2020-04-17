const ServiceRegister = require('../service/register')
module.exports = async (ctx, next) => {
    console.log(JSON.stringify(ctx.request.body))
    ctx.type = 'application/json';
    ctx.status = 200
    await ServiceRegister(ctx)
    next()
}