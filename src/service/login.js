const UserMode = require('../model/user')
const encryptionStr = require('../util/encryptionStr')
module.exports = function ({name, password}) {
    return new Promise((resolve, reject) => {
        UserMode
            .findOne({ name })
            .populate('passwordSecret')
            .exec(function(error, user) {
                if (error) {
                    reject(error)
                } else {
                    let {
                        password,
                        passwordSecret: {
                            secret
                        }
                    } = user
                    
                    let {encryptedData} =  encryptionStr({
                        str: password,
                        secret,
                        type: 'sha512'
                    })
                    if (encryptedData === user.password) {
                        resolve({ name })
                    } else {
                        reject({
                            message: '用户名或密码错误'
                        })
                    }
                }
            })    
    })
}