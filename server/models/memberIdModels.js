const mongoose = require("mongoose");
const newIdTemplate = mongoose.Schema({
  id: {
     type: String 
    },
  seq: {
    type: Number,
  },
});
module.exports = mongoose.model("generatedId", newIdTemplate)