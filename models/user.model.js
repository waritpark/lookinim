// Connexion à Mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// créer schéma associé
const userSchema = mongoose.Schema({
    mail: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    mdp: { type: String, required: true,},
    pseudo: { type: String, required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
    role: String,
});

userSchema.plugin(uniqueValidator);

// associe schéma et bdd
module.exports = mongoose.model("users", userSchema);
