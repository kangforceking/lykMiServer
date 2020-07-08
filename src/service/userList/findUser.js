const userModel = require('../../model/user')

module.exports = function() {
    return new Promise((resolve, reject) => {
        userModel
            .find()
            .select(['name', '_id'])
            .exec((error, userList) => {
                console.log(error, userList, userList[0]._id)
                if (error) {
                    reject(new Error(error.message))
                } else {
                    userList = userList.map(({name, _id}) => {
                        return {
                            name,
                            userId: _id.toString()
                        }
                    })
                    resolve(userList)
                }
            })
    })
}