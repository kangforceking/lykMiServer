const {app, mock, assert} = require('egg-mock/bootstrap')

describe('test/app/service/home.test.js', () => {
    let ctx
    beforeEach(()=>{
        // 创建一个匿名的 context 对象，可以在 ctx 对象上调用 service 的方法
        ctx = app.mockContext()
    })
})