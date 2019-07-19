const {Controller} = require('egg')

class HomeController extends Controller {
    async login(){
        let {
            ctx: {
                request: {
                    body: {
                        username,
                        password
                    }
                }
            }
        } = this
        let ctxBody = {}
        if (username === 'abc' && password === 'abc123') {
            ctxBody = {
                code: 200,
                meagess: '登录成功'
            }
            this.ctx.login({username})
        } else {
            ctxBody = {
                code: -400,
                meagess: '账号名或密码错误!'
            }
        }
        this.ctx.body = ctxBody 
    }
}

module.exports = HomeController