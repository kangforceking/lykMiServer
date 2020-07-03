const friendListService = require('../service/friendList')
module.exports = async function (ctx, next) {
    let userId = ctx.cookies.get('userId')
    let sessionValue = ctx.cookies.get('sessionValue')
    if (!userId || !sessionValue) {
        ctx.throw(401, '请先登录')
    } else {
        friendListService({
            ctx,
            userId,
            sessionValue
        })
            .then(()=> {
                ctx.body = {
                    code: 200,
                    list: [{
                        'abc': 'qwerqf'
                    }]
                }
            })
            .catch(({message})=>{
                ctx.throw(401, message)
            })    
    }
    await next()
}
