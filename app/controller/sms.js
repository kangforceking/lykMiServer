const {Controller} = require('egg')

class smsController extends Controller {
    async getSms(){
        const { ctx, service } = this 
        
        // const payload = ctx.request.body || {}
        // let {mobile} = payload
        // if (mobile.length === 11 && /^1[0-9]{10}$/.test(mobile)) {
        //     return service.sms.getSms({mobile}) 
        // } else {
        //     return Promise.reject({
        //         message: '手机号码错误'
        //     })
        // }
    }
    async postSms(){
        const { ctx, service } = this 
        const payload = ctx.request.body || {}
        const {mobile} = payload
        let ctxBody = {}
        if (mobile.length === 11 && /^1[0-9]{10}$/.test(mobile)) {
            let code = Math.floor(Math.random() * 1000000)
            try {
                await service.sms.postSms({mobile, code}) 
            } catch ({message}) {
                ctxBody = {
                    code: -1,
                    message
                }
            }
        } else {
            ctxBody = {
                code: -1,
                message: '手机号码错误'
            }
        }
        this.ctx.body = ctxBody
    }
}
module.exports = smsController