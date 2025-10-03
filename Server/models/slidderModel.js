const mongoose = require("mongoose");

const slidderSchema = new mongoose.Schema({

    images:[{
      homeImage:{
        type:String,
        
      }
    }

],
},{timeStamps:true});



const Slidder = mongoose.model("Slidder",slidderSchema);

module.exports = Slidder;