const sessionMode = require('../../model/session')
const checkLogin = require('../checkLogin')
const awaitTo = require('../../util/awaitTo')
const findUser = require('./findUser')
module.exports = async function ({
    ctx
}) {
    let [error, isLogin] = await awaitTo(checkLogin({ctx}))
    let userList = []
    if (isLogin) {
        ;[error, userList] = await awaitTo(findUser())
    } 
    if (error) {
        return Promise.reject(error)
    } else {
        return Promise.resolve(userList)
    }
}