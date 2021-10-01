// récupère le model 
const userSchema = require("../models/user.model.js");
// Connexion à Mongoose
const mongoose = require("mongoose");
// module qui controle et voit les fichiers presents dans le serveur
const fs = require("fs");
// permet de hasher le mdp
const bcrypt = require("bcrypt");
const twig = require("twig");


exports.user_formulaire_inscription = (requete, reponse) => { 
    if (requete.body.formulaireUser == "inscription") {
        if (requete.body.mdp == "" || requete.body.mdp2 == "" || requete.body.pseudo == "" || requete.body.mail ==""){
            requete.session.message = {
              type: 'danger',
              contenu: 'Tout les champs doivent être remplis'
            }
        reponse.redirect("/connexion")
        }
        else {
            if (requete.body.mdp == requete.body.mdp2) {
                bcrypt.hash(requete.body.mdp, 10)
                .then(hash => {
                    const user = new userSchema({
                        _id : new mongoose.Types.ObjectId(),
                        mail: requete.body.mail,
                        pseudo: requete.body.pseudo,
                        mdp: hash,
                        role: "user"
                    })
                    user.save()
                    .then(resultat => {
                    if(resultat.modifiedCount <1) throw new Error("Requete de modification échoué")
                        requete.session.message = {
                            type: 'success',
                            contenu: 'Inscription effectuée ! Vous pouvez maintenant vous connecter.'
                        }
                    reponse.redirect("/connexion")
                    })
                    .catch(error => {
                        requete.session.message = {
                            type: 'danger',
                            contenu: 'inscription échouée 1'
                        }
                    reponse.redirect("/connexion")
                    })
                })
                .catch(error =>  {
                    requete.session.message = {
                        type: 'danger',
                        contenu: 'inscription échouée 2'
                    }
                reponse.redirect("/connexion")
                })
            }
            else {
                requete.session.message = {
                    type: 'danger',
                    contenu: 'Les deux mots de passes ne correspondent pas'
                }
            reponse.redirect("/connexion")
            }
        }
    }
}
        

exports.user_formulaire = (requete, reponse) => { 
    if (requete.body.formulaireUser == "connexion") {
        userSchema.findOne({ mail: requete.body.mail })
        .then(user => {
            if (!user) {
                requete.session.message = {
                    type: 'danger',
                    contenu: 'Connexion impossible'
                }
            }
            bcrypt.compare(requete.body.mdp, user.mdp, (err, data) => {
                //if error than throw error
                if (err) throw err
                //if both match than you can do anything
                if (data) {
                    requete.session.authentification = {
                        type: true,
                        contenu: user.role
                    }
                    if (user.role == "user") {
                        reponse.redirect("/appli")
                    }
                    else {
                        reponse.redirect("/admin")
                    }
                } 
                else {
                    requete.session.message = {
                        type: 'danger',
                        contenu: 'Mauvais mot de passe'
                    }
                    reponse.redirect("/connexion")
                }
            })
        })
        .catch(error => {
            requete.session.message = {
                type: 'danger',
                contenu: 'Mauvais mail'
            }
        reponse.redirect("/connexion")
        })
    }
} 

exports.user_disconnect = (requete, reponse) => {
    delete requete.session.authentification;
    reponse.redirect("/connexion");
}