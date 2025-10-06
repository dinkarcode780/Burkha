const mongoose = require("mongoose");

const sallofferSchema = new mongoose.Schema({
  offerTitle: [
    {
      title: {
        type: String,
        trim: true,
      },
    },
  ],
}, { timestamps: true });

const Sale = mongoose.model("Sale", sallofferSchema);

module.exports = Sale;