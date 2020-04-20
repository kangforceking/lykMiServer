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
        secret: phoneSecret,
        encryptedData: newPhone
    } = encryptionStr({
        str: phone
    })
    
    // let user = new UserMode({
    //     name,
    //     password: newPassword,
    //     phone: newPhone
    // })
    let userServicenew = new UserService()
    return userServicenew.creation({
        name,
        password: newPassword,
        phone: newPhone,
        passwordSecret,
        phoneSecret
    })

    // return new Promise((resolve, reject) => {
    //     user.save(function (err) {
    //         if (err) {
    //             let { code, errors} = err
    //             let message = ''
    //             switch (code) {
    //                 case 11000:
    //                     message = '用户已存在'
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             reject({message, errors})
    //         } else {
    //             resolve()
    //         }
    //     })
    // })
}