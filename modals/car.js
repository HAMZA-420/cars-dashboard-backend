const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    category: {type: String},
    model: {type: String},
    color: {type: String},
    regNo: {type: String},
    userId: {type: String}
  },

  { timestamps: true }
);



module.exports = mongoose.model("car", carSchema);
