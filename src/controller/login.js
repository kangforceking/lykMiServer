const ServiceLogin = require('../service/login')

module.exports = async function (ctx) {
    let {
        request: {
            body: {
                name,
                password
            }
        }
    } = ctx
    let [loginError, userInfo] = await ServiceLogin({
        name,
        password
    })
        .then((data)=>{
            return [null, data]
        })
        .catch((err)=>{
           return [err, null]
        })
    if (loginError) {
        ctx.body = {
            code: 110001,
            message: loginError.message || '登录失败'
        }
    } else {
        ctx.body = {
            code: 200,
            ...userInfo 
        }    
    }
}