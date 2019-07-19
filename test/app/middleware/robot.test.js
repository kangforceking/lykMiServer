const { app, mack, assert} = require('egg-mock/bootstrap')

describe('test/app/middleware/robot.test.js', ()=>{
    it('Postman访问返回403', ()=>{
        return app.httpRequest()
            .get('/')
            .set('User-Agent', 'Baiduspider')
            .expect(403)
    })
    it('谷歌浏览器访问正常', ()=>{
        return app.httpRequest()
            .get('/')
            .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36')
            .expect(200)
    })
})