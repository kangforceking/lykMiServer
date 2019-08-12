const {Controller} = require('egg')

class smsController extends Controller {
    async getSms(){
        const { ctx, service } = this 
        const payload = ctx.request.body || {}
        let {mobile} = payload
        if (mobile.length === 11 && /^1[0-9]{10}$/.test(mobile)) {
            return service.sms.getSms({mobile}) 
        } else {
            return Promise.reject({
                message: '手机号码错误'
            })
        }
    }
    
}
module.exports = smsController