const sessionMode = require('../model/session')
module.exports = function ({
    ctx
}) {
    let userId = ctx.cookies.get('userId')
    let sessionValue = ctx.cookies.get('sessionValue')
    return new Promise((resolve, reject) => {
        if (userId && sessionValue) {
            sessionMode.findOne({
                userId
            }, function (err, data) {
                if (err) {
                    reject(new Error(err.error))
                } else {
                    if (data.sessionValue === sessionValue) {
                        resolve(true)
                    } else {
                        reject(new Error('身份信息错误'))
                    }
                }
            })
        } else {
            reject(new Error('请登录'))
        }
    })
}