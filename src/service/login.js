const UserMode = require('../model/user')
const encryptionStr = require('../util/encryptionStr')
const crypto = require('crypto')
const loginCookies = require('./loginCookies')

module.exports = function ({ctx, name, password}) {
    return new Promise((resolve, reject) => {
        UserMode
            .findOne({ name })
            .populate('passwordSecret')
            .populate('phoneSecret')
            .exec(async function(error, user) {
                if (error) {
                    reject(error)
                } else {
                    let {
                        passwordSecret: {
                            secret: _passwordSecret
                        },
                        phoneSecret: {
                            // secret: _phoneSecret,
                            iv,
                            key
                        },
                        phone,
                        _id
                    } = user
                    let { encryptedData } = encryptionStr({
                        str: password,
                        type: 'sha512',
                        secret: _passwordSecret
                    })
                    if (encryptedData === user.password) {
                        let decipher = crypto.createDecipheriv('aes192', key, iv)
                        decipher.update(phone, 'hex')
                        let decodePhone = decipher.final('utf8')
                        let userInfo = {
                            name,
                            phone: decodePhone,
                            userId: _id.toString()
                        }
                        // 设置cookies并保存会话信息
                        let [error] = await loginCookies({
                            ctx,
                            userInfo
                        })
                            .then(() => {
                                return [null]
                            })
                            .catch((error) => {
                                return [error]
                            })
                        if (error) {
                            reject(error)
                        } else {
                            resolve(userInfo)
                        }
                    } else {
                        reject({
                            message: '用户名或密码错误'
                        })
                    }
                }
            })    
    })
}