const UserMode = require('../model/user')
// const PasswordMode = require('../model/password')

module.exports = function ({name, password}) {
    return new Promise((resolve, reject) => {
        UserMode
            .findOne({ name })
            .populate('passwordSecret', 'phoneSecret')
            .exec(function(error, user) {
                if (error) {
                    reject(error)
                } else {
                    debugger
                    console.log(user)
                    resolve(user)
                }
            })    
    })
}