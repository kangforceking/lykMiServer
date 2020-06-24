const UserMode = require('../model/user')
const encryptionStr = require('../util/encryptionStr')
const crypto = require('crypto')

module.exports = function ({name, password}) {
    console.log(name, password)
    return new Promise((resolve, reject) => {
        UserMode
            .findOne({ name })
            .populate('passwordSecret', 'phoneSecret')
            .exec(function(error, user) {
                console.log(user)
                if (error) {
                    reject(error)
                } else {
                    // let {
                    //     passwordSecret: {
                    //         secret: _passwordSecret
                    //     },
                    //     phoneSecret: {
                    //         secret: _phoneSecret
                    //     }
                    // } = user
                    // let {encryptedData} = encryptionStr({
                    //     str: password,
                    //     secret: _passwordSecret,
                    //     type: 'sha512'
                    // })
                    resolve({
                        name,
                        // phone: decodePhone
                    })
                    // if (encryptedData === user.password) {
                    //     console.log(_phoneSecret)
                    //     let decipher = crypto.createDecipher('aes192', _phoneSecret)
                    //     let decodePhone = decipher.update(phone, 'hex', 'utf8')
                    //     decodePhone += decodePhone.final('utf8')
                    //     resolve({
                    //         name,
                    //         // phone: decodePhone
                    //     })
                    // } else {
                    //     reject({
                    //         message: '用户名或密码错误'
                    //     })
                    // }
                }
            })    
    })
}