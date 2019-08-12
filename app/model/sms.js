module.exports = app =>{
    let { mongoose } = app
    let { Schema } = mongoose
    let smsSchema = new Schema({
        mobile: { 
            type: String,
            minlength: 11,
            maxlength: 11,
            required: true,
            unique: true
        },
        code: { 
            type: String,
            minlength: 6,
            maxlength: 6,
            required: true 
        },
        createDate: {
            type: Date,
            default: Date.new
        }
    })
    return mongoose.model('sms', smsSchema)
}