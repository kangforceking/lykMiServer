const {Controller} = require('egg')

class HomeController extends Controller {
    async userData(){
        this.ctx.body = {
            userName: '试试登录'
        }
    }
}

module.exports = HomeController