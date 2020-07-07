const sessionMode = require('../model/session')
const checkLogin = require('./checkLogin')
const awaitTo = require('../util/awaitTo')
module.exports = async function ({
    ctx
}) {
    let [error, isLogin] = await awaitTo(checkLogin({ctx}))
    if (error) {
        return Promise.reject(error)
    } else {
        return Promise.resolve(isLogin)
    }
}