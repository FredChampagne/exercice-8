// Éléments qui permettent le fonctionnement de l'application
const express = require('express');
const app = express();
app.use(express.static('public'));
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
// Associe le moteur de vue au module «ejs» 
app.set('view engine', 'ejs'); // Générateur de template 
app.use(bodyParser.urlencoded({ extended: true }));
let util = require("util");

// Affichage de l'accueil (root)
app.get('/', function (req, res) {
	res.render('accueil.ejs');
})

// Affichage de la liste
app.get('/list', function (req, res) {
	let cursor = db.collection('adresse')
	.find().toArray(function (err, resultat) {
		if (err) return console.log(err)
		console.log('util = ' + util.inspect(resultat));
		// transfert du contenu vers la vue index.ejs (renders)
		// affiche le contenu de la BD
		res.render('adresses.ejs', { adresses: resultat })
	})
})

// Traite le formulaire
app.post('/modifier', function (req, res) {
	db.collection('adresse').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('sauvegarder dans la BD')
		res.redirect('/')
	})
});



let db // variable qui contiendra le lien sur la BD
// Connection à la BD
MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
	if (err) return console.log(err)
	db = database.db('carnet_adresse')
	// lancement du serveur Express sur le port 8081
	app.listen(8081, () => {
		console.log('connexion à la BD et on écoute sur le port 8081')
	})
})