const mongoose = require("mongoose");
const publicationSchema = mongoose.Schema({
  nameArticle: String,
  description: String,
  prix: Number,
  etat: String,
  qty: Number,
  status:String,
  idUser: {type: mongoose.Schema.Types.ObjectId,
    ref: "User"},
  avatar:String,
});
const publication= mongoose.model("Publication",publicationSchema);
module.exports= publication;