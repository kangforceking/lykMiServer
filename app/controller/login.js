const {Controller} = require('egg')

class HomeController extends Controller {
    async init(){
        // let {
        //     ctx: {
        //         request: {
        //             body
        //         }
        //     }
        // } = this
        console.log(this.ctx.csrf)
        this.ctx.body = {
            userName: '试试登录'
        }
    }
}

module.exports = HomeController