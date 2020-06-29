const mongoose = require('mongoose')
const { Schema } = mongoose

let phone = new Schema({
    // secret: { 
    //     type: String,
    //     // index: true,
    //     unique: true,
    //     sparse: true,
    //     required: [true, 'secret不能为空'],
    // },
    iv: {
        type: Buffer,
        required: [true, 'iv不能为空']
    },
    key: {
        type: Buffer,
        equired: [true, 'key不能为空']
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('Phone', phone)