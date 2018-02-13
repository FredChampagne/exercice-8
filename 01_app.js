const express = require('express');
const app = express();
app.use(express.static('public'));
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
const ObjectID = require('mongodb').ObjectID;
/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
var util = require("util");

app.get('/', function (req, res) {
		var cursor = db.collection('adresse')
					   .find().toArray(function(err, resultat){
		if (err) return console.log(err)
			console.log('util = ' + util.inspect(resultat));
		// transfert du contenu vers la vue index.ejs (renders)
		// affiche le contenu de la BD
		res.render('gabarit.ejs', {adresses: resultat})
		}) 
})

// Traite le formulaire
app.post('/ajouter', function (req, res) {
	db.collection('adresse').save(req.body, (err, result) => {
		if (err) return console.log(err)
			console.log('sauvegarder dans la BD')
		res.redirect('/')
		})
});

let db // variable qui contiendra le lien sur la BD
// Connection à la base de donnée
MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})
/*
let server = app.listen(8081, function () {
   let host = server.address().address
   let port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})*/