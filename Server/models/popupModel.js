const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
    },
    whatsappNumber:{
        type:Number

    },
     city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    }
},{timestamps:true});

module.exports = mongoose.model("popup",popupSchema);