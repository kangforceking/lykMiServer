const mongoose = require('mongoose')
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
        phoneSecret
    }) {
        return this.saveUser({
            name,
            password,
            phone
        })
            .then((_id)=>{
                return Promise.all([
                    this.savePassword({
                        user: _id,
                        secret: passwordSecret
                    }),
                    this.savePhone({
                        user: _id,
                        secret: phoneSecret
                    })
                ])
            })
            .then((res)=>{
                console.log(res)
            })
            .catch((error)=> {
                console.log(error)
            })
    }
    saveUser ({
        name,
        password,
        phone
    }) {
        let user = new UserMode({
            name,
            password,
            phone
        })
        return new Promise((resolve, reject) => {
            user.save(function (err) {
                if (err) {
                    let { code, errors} = err
                    let message = ''
                    switch (code) {
                        case 11000:
                            message = '用户已存在'
                            break;
                        default:
                            break;
                    }
                    reject({message, errors})
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
                    resolve()
                }
            })
        })
    }
    savePhone({
        user,
        secret
    }) {
        let phone = new PhoneMode({
            user,
            secret
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
                    resolve()
                }
            })
        })
    }
}