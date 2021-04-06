const mongoose = require('mongoose')
const schema = mongoose.schema;

const itemSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required: true
    }
}, {timestamps:true})

const item = mongoose.model('item', itemSchema)
module.exports = item;