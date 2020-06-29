const UserMode = require('../model/user')
const encryptionStr = require('../util/encryptionStr')
const UserService = require('./handleUser')
module.exports = function(ctx){
    const {
        request: {
            body: {
                name,
                password,
                phone
            }
        }
    } = ctx
    let {
        secret: passwordSecret,
        encryptedData: newPassword 
    } = encryptionStr({
        str: password,
        type: 'sha512'
    })
    let {
        // secret: phoneSecret,
        encryptedData: newPhone,
        iv,
        key
    } = encryptionStr({
        str: phone,
        type: 'aes192'
    })
    
    
    let userServicenew = new UserService()
    return userServicenew.creation({
        name,
        password: newPassword,
        phone: newPhone,
        passwordSecret,
        phoneSecret: {
            iv,
            key
        }
    })

}