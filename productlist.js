const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    pid: {
        type: String,
        required: true,
        maxlength:100,
        unique:1
    },
    name: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
        
    },
    category:{
        type :String,
        required:true,
       
    }

});

module.exports = mongoose.model('Product',productSchema);