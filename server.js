// récupérer le module express
const express = require("express");
// créer le serveur express
const server = express();
const router = require("./router");
const appRouter = require("./appRouter");
const adminRouter = require("./adminRouter");
const morgan = require("morgan");
// body-parser sert a recup les info du formulaire
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/lookinim",{useNewUrlParser:true,useUnifiedTopology:true})
const session= require("express-session");
 
server.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
server.use((requete, reponse, suite) => {
    reponse.locals.authentification = requete.session.authentification;
    reponse.locals.message = requete.session.message;
    delete requete.session.message;
    suite();
});
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended:false}));
server.use(express.static("public"));
server.use('/appli',appRouter);
server.use('/admin',adminRouter);
server.use('/',router);
// indique sur quel port le serveur écoute
server.listen(3000);
