const {Controller} = require('egg')

class HomeController extends Controller {
    async userData(){
        console.log(this.ctx.user);
        
        this.ctx.body = {
            userName: '试试登录'
        }
    }
}

module.exports = HomeController