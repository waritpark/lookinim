// récupère le model 
const userSchema = require("../models/user.model.js");
// Connexion à Mongoose
const mongoose = require("mongoose");
// module qui controle et voit les fichiers presents dans le serveur
const fs = require("fs");
// permet de hasher le mdp
const crypto = require("crypto");


// route qui récup le formulaire en method post d'ajout de livre
exports.user_formulaire = (requete, reponse) => { 
    if (requete.body.formulaireUser == "inscription") {
        const user = new userSchema ({
            // mongoose genere une ID
            _id : new mongoose.Types.ObjectId(),
            pseudo: requete.body.pseudo,
            mdp: requete.body.mdp,
            mail: requete.body.mail
        });
        user.save()
        .then(resultat => {
            reponse.redirect("/extractions");
        })
        .catch(error => {
            console.log(error);
        })
    }
    else {

        // .catch(error => {
        //     console.log(error);
        // })
    }
};