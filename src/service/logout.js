let sessionModel = require('../model/session')
module.exports = function ({
    ctx,
    userId
}) {
    if (userId) {
        return new Promise((resolve, rejcet) => {
            let newSession = new sessionModel()
            ctx.cookies.set('userId', '')
            ctx.cookies.set('sessionValue', '')
            newSession.remove({
                userId
            }, function(error) {
                if (error) {
                    rejcet(new Error(error.message))
                } else {
                    resolve() 
                }
            })    
        })    
    } else {
        return Promise.reject(new Error('未登录'))
    }
    
}