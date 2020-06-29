const UserMode = require('../model/user')
const encryptionStr = require('../util/encryptionStr')
const crypto = require('crypto')

module.exports = function ({name, password}) {
    return new Promise((resolve, reject) => {
        UserMode
            .findOne({ name })
            .populate('passwordSecret')
            .populate('phoneSecret')
            .exec(function(error, user) {
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
                        phone
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
                        resolve({
                            name,
                            phone: decodePhone
                        })
                    } else {
                        reject({
                            message: '用户名或密码错误'
                        })
                    }
                }
            })    
    })
}