const mongoose = require('mongoose')
const { Schema } = mongoose
let user = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: [true, '用户名不能为空'],
        min: [2, '用户名最少2位数'],
        max: [6, '用户名最多6位数'],
        validate: {
            validator(value) {
                return /[a-zA-Z0-0\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)
            },
            message: '用户名由字母数字和中文下划线组成'
        }
    },
    password: {
        type: String,
        required: [true, '密码不能为空'],
        min: [6, '请输入6位数密码'],
        max: [6, '请输入6位数密码'],
        validate: {
            validator(value) {
                return /^[A-Za-z0-9_]{6}$/.test(value)
            },
            message: '密码由字母数字或下划线组成'
        }
    },
    phone: {
        type: String,
        index: true,
        unique: true,
        required: [true, '手机号码不能为空'],
        min: [11, '手机号码为11位数'],
        max: [11, '手机号码为11位数'],
        validate: {
            validator(value) {
                return /^1[0-9]{10}$/.test(value)
            },
            message: '手机号码格式错误'
        }
    },
    create: { 
        type: Date,
        default: Date.now 
    },
    update: { 
        type: Date, 
        default: Date.now 
    }
})
module.exports = mongoose.model('user', user)
