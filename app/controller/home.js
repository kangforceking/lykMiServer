const {Controller} = require('egg')

class HomeController extends Controller {
    async index(){
        let homeData = await this.ctx.service.home.home()
        this.ctx.body = homeData
    }
}

module.exports = HomeController