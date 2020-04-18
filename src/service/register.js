const UserMode = require('../model/user')

module.exports = function(ctx){
    const {
        request: {
            body: {
                name,
                password,
                phone
            }
        }
    } = ctx
    let user = new UserMode({
        name,
        password,
        phone
    })
    return new Promise((resolve, reject) => {
        user.save(function (err) {
            if (err) {
                let { code, errors} = err
                let message = ''
                switch (code) {
                    case 11000:
                        message = '用户已存在'
                        break;
                    default:
                        break;
                }
                reject({message, errors})
            } else {
                resolve()
            }
        })
    })
}