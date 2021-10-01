// récupérer le module express
const express = require("express");
const router = express.Router();
// chercher le moteur de template
const twig = require("twig");
const userController = require('./controllers/user.controller');

router.use((requete, reponse, suite) => {
    let session = requete.session.authentification;
    console.log(session);
    if (typeof session !== "undefined" && (session.contenu == "user" || session.contenu== "admin")) {
        suite();
    }
    else {
        const error = new Error("Accès interdit");
        error.status = 403;
        reponse.end(error.message);
    }
});

router.get("/", (requete, reponse) => {
    reponse.render("extractions.html.twig");
})
router.get("/compte", (requete, reponse) => {
    reponse.render("compte.html.twig");
})
router.get("/liste", (requete, reponse) => {
    reponse.render("liste.html.twig");
})


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

module.exports = router;