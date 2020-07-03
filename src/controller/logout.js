const logoutService = require('../service/logout')
module.exports = async function(ctx, next) {
    let userId = ctx.cookies.get('userId')
    if (userId) {
        await logoutService({
            ctx,
            userId
        })
            .then(() => {
                ctx.body = {
                    code: 200,
                    message: '已退出登录'
                }
            })
            .catch(()=> {
                ctx.body = {
                    code: 200,
                    message: '退出失败'
                }
            })    
    } else {
        ctx.body = {
            code: 200,
            message: '退出失败'
        }
        ctx.throw(401, '未登录')
    }
    await next()
}
