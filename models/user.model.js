// Connexion à Mongoose
const mongoose = require("mongoose");

// créer schéma associé
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    pseudo: String,
    mdp: String,
    mail : String
});

// associe schéma et bdd
module.exports = mongoose.model("users", userSchema);
