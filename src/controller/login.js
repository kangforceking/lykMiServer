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
    await ServiceLogin({
        name,
        password
    })
    ctx = {
        code: 200,
        message: '等等，调试中'
    }
}