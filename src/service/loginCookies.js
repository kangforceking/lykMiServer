const crypto = require('crypto')
const sessionMode = require('../model/session')
const awaitTo = require('../util/awaitTo')

function findSession(userId) {
    return new Promise((resolve, reject)=> {
        sessionMode.findOne(
            {userId}, 
            (err, userSessin) => {
                if (err) {
                    reject(err.error)
                } else {
                    resolve(userSessin)
                }
            }
        )
    })
}

function upData({
    userId,
    sessionValue
}) {
    return new Promise((resolve, reject)=> {
        sessionMode.updateOne({userId}, {$set: {sessionValue}}, (error) => {
            if (error) {
                reject(error.message)
            } else {
                resolve(true)
            }
        })    
    })
}
function saveData({
    userId,
    sessionValue
}) {
    return new Promise((resolve, reject)=> {
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

module.exports = function ({
    ctx, 
    userInfo
}) {
  
    return new Promise(async (resolve, reject) => {
        let {
            userId
        } = userInfo
        let sessionValue = crypto.randomBytes(16).toString('hex')
        ctx.cookies.set('userId', userId)
        ctx.cookies.set('sessionValue', sessionValue)
        let [error, hasUser] = await awaitTo(findSession(userId))
        let isSave = false
        if(hasUser) {
            ;[error, isSave] = await awaitTo(
                upData({
                    userId,
                    sessionValue
                })    
            )
        } else {
            ;[error, isSave] = await awaitTo(
                saveData({
                    userId,
                    sessionValue
                })    
            )
        }
        if(error) {
            reject(error)
        } else {
            resolve(isSave)
        }
    })
}