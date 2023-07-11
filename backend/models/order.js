const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    },
  idPublication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication"
    },
    idUserVendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
  status:String,
  
});
const order= mongoose.model("Order",orderSchema);
module.exports= order;