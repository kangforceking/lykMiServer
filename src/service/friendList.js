const sessionMode = require('../model/session')
const isType = require('../util/isType')
module.exports = async function ({
    ctx,
    userId
}) {
    if (!isType({
        type: 'String',
        userId,
        sessionValue
    })) {
        userId = userId.toString()
    }
    return new Promise((resolve, reject) => {
        sessionMode.findOne({
            userId
        }, function (err, data) {
            if (err) {
                reject(new Error(err.error))
            } else {
                console.log(data)
                if (data.sessionValue === sessionValue) {
                    resolve(true)
                } else {
                    reject(new error('身份信息错误'))
                }
            }
        })    
    })
}