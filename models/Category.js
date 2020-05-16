const mongoose = require ( 'mongoose' )
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        requireds: true,
    },
    imageSrc:{
        type: String,
        default:'IMAGE'
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model ( 'categories', categorySchema )