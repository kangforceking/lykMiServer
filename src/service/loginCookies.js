const crypto = require('crypto')
const sessionMode = require('../model/session')
module.exports = function ({
    ctx, 
    userInfo
}) {
    return new Promise((resolve, reject) => {
        let {
            userId
        } = userInfo
        let sessionValue = crypto.randomBytes(16).toString('hex')
        ctx.cookies.set('userId', userId)
        ctx.cookies.set('sessionValue', sessionValue)
        let sessionInfo = new sessionMode({
            userId,
            sessionValue
        })
        sessionInfo.save((err) => {
            if (err) {
                reject(err.error)
            } else {
                resolve({
                    userId,
                    sessionValue
                })
            }
        })
    })
}