const ServiceRegister = require('../service/register')
module.exports = async (ctx, next) => {
    console.log(JSON.stringify(ctx.request.body))
    ctx.type = 'application/json';
    ctx.status = 200
    let {
        request: {
            body = {}
        }
    } = ctx
    await ServiceRegister(ctx)
        .then(()=>{
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        })
        .catch(({message, errors})=>{
            if (!message && errors) {
                let keyArr = Object.keys(body)
                for (let index = 0; index < keyArr.length; index++) {
                    const element = keyArr[index]
                    const errorItem = errors[element]
                    if (errorItem) {
                        message = errorItem.message
                        break
                    }
                }
            }
            ctx.body = {
                code: 100001,
                message
            }
        })
    next()
}