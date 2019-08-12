const { Service } = require('egg')

class smsService extends Service {
    async getSms(payload){
        return this.ctx.model.sms.findOne(payload)
    }
    async postSms(payload){
        let {mobile} = payload
        return this.ctx.model.sms.findOneAndUpdate({mobile}, payload)
    }
}

module.exports = smsService