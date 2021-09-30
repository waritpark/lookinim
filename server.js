// récupérer le module express
const express = require("express");
// créer le serveur express
const server = express();
const router = require("./router");
const morgan = require("morgan");
// body-parser sert a recup les info du formulaire
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/lookinim",{useNewUrlParser:true,useUnifiedTopology:true})


server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended:false}));
server.use(express.static("public"));
server.use('/',router);
// indique sur quel port le serveur écoute
server.listen(3000);
