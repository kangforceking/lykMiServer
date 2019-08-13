const { Service } = require('egg')

class smsService extends Service {
    async getSms(payload){
        return this.ctx.model.sms.findOne(payload)
    }
    async postSms(payload){
        let {mobile} = payload
        console.log(this.ctx.model)
        console.log('-------')
        console.log(payload)
        return this.ctx.model.Sms.create(payload)
    }
}

module.exports = smsService