// récupérer le module express
const express = require("express");
const router = express.Router();
// chercher le moteur de template
const twig = require("twig");
const userController = require('./controllers/user.controller');
const adminController = require('./controllers/admin.controller');

// requete get sur la route de base
router.get("/", (requete, reponse) => {
    reponse.render("accueil.html.twig");
});
router.get("/connexion", (requete, reponse) => {
    reponse.render("connexion.html.twig");
});
router.post("/connexion", userController.user_formulaire);
router.post("/inscription", userController.user_formulaire_inscription);
router.get("/deconnexion", userController.user_disconnect);

// Gère l'erreur 404
router.use((requete, reponse, suite) => {
    const error = new Error("Page non trouvée");
    error.status = 404;
    suite(error); // envoi à la route ci-dessous avec "error" générée
});
// Gère toutes les erreurs
router.use((error,requete,reponse,suite) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
});


// exporter ce fichier
module.exports = router;