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
                    console.log(user.password)
                    let {encryptedData} =  encryptionStr({
                        str: password,
                        secret: user.passwordSecret.secret,
                        type: 'sha512'
                    })
                    console.log(encryptedData)
                    console.log(encryptedData === user.password)
                    resolve(user)
                }
            })    
    })
}