const mongoose = require('mongoose')
const { Schema } = mongoose

let password = new Schema({
    secret: { 
        type: String,
        index: true,
        unique: true,
        sparse: true,
        required: [true, 'secret不能为空'],
        user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
})

module.exports = mongoose.model('Password', password)
