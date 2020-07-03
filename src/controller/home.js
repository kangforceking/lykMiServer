const ServiceHome = require('../service/home')
module.exports = async (ctx, next) => {
    await ServiceHome(ctx)
    await next()
}