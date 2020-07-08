const UserMode = require('../model/user')
const PasswordMode = require('../model/password')
const PhoneMode = require('../model/phone')

module.exports = class User {
    constructor () {}
    creation ({
        name,
        password,
        phone,
        passwordSecret,
        phoneSecret: {
            iv,
            key
        }
    }) {
        return Promise.all([
            this.savePassword({
                secret: passwordSecret
            }),
            this.savePhone({
                iv,
                key
            })
        ])
            .then(([passwordId, phoneId])=>{
                return this.saveUser({
                    name,
                    password,
                    phone,
                    passwordId, 
                    phoneId
                })
            })
    }
    saveUser ({
        name,
        password,
        phone,
        passwordId,
        phoneId
    }) {
        let user = new UserMode({
            name,
            password,
            phone,
            passwordSecret: passwordId,
            phoneSecret: phoneId
        })
        return new Promise((resolve, reject) => {
            user.save(function (err) {
                if (err) {
                    let { code, errors } = err
                    let message = ''
                    switch (code) {
                        case 11000:
                            message = '用户已存在'
                            break;
                        default:
                            break;
                    }
                    reject({message, errors})
                    PasswordMode.remove({
                        _id: passwordId
                    }, function (err) {
                        console.log(err)
                    })
                    PhoneMode.remove({
                        _id: phoneId
                    }, function (err) {
                        console.log(err)
                    })
                } else {
                    resolve(user._id)
                }
            })
        })
    }
    upgrade () {

    }
    savePassword({
        user,
        secret
    }) {
        let password = new PasswordMode({
            user,
            secret
        })
        return new Promise((resolve, reject) => {
            password.save(function(err) {
                if (err) {
                    let { code, errors} = err
                    let message = ''
                    switch (code) {
                        case 11001:
                            message = '密钥不可重复'
                            break;
                        default:
                            break;
                    }
                    reject({message, errors})
                } else {
                    resolve(password._id)
                }
            })
        })
    }
    savePhone({
        user,
        iv,
        key
    }) {
        let phone = new PhoneMode({
            user,
            iv,
            key
        })
        return new Promise((resolve, reject) => {
            phone.save(function(err) {
                if (err) {
                    let { code, errors} = err
                    let message = ''
                    switch (code) {
                        case 11002:
                            message = '密钥不可重复'
                            break;
                        default:
                            break;
                    }
                    reject({message, errors})
                } else {
                    resolve(phone._id)
                }
            })
        })
    }
}