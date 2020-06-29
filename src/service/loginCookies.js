const crypto = require('crypto')
module.exports = function ({
    ctx, 
    userInfo
}) {
    let {
        userId
    } = userInfo
    let cookiesValue = crypto.randomBytes(16).toString('hex')
    ctx.cookies.set(userId, cookiesValue)
    ctx.state.user = {
        ...userInfo,
        sessionValue: cookiesValue
    }
}