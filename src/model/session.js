const mongoose = require('mongoose')
const { Schema } = mongoose
let sessionSchema = new Schema({
    userId: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'userId不能为空']
    },
    sessionValue: {
        type: String
    }
})
module.exports = mongoose.model('Session', sessionSchema)