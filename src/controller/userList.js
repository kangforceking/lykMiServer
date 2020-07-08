const userListService = require('../service/userList')

module.exports = async function (ctx, next) {
    let userId = ctx.cookies.get('userId')
    let sessionValue = ctx.cookies.get('sessionValue')
    if (!userId || !sessionValue) {
        ctx.throw(401, '请先登录')
    } else {
        await userListService({
            ctx,
            userId,
            sessionValue
        })
            .then((userList)=> {
                ctx.body = {
                    code: 200,
                    list: userList
                }
            })
            .catch(({message})=>{
                ctx.throw(401, message)
            })
    }
    await next()
}
