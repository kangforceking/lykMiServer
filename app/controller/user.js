const {Controller} = require('egg')

class HomeController extends Controller {
    async userData(){
        console.log(this.ctx.user);
        
        this.ctx.body = {
            username: '试试登录'
        }
    }
    /**
     * 登录
     */
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
    /**注册 */
    async register(){
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
        this.ctx.body = {username} 
    }
}

module.exports = HomeController