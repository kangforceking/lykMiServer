module.exports = app => {
    const { router, controller } = app
    router.get('/', controller.home.index)
    router.get('/user', 'user.userData')
    router.post('/login', 'user.login')
    router.post('/register', 'user.register')
    // router.post('sms/:', controller.msm)
}