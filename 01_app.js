// Éléments qui permettent le fonctionnement de l'application
"use strict";
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const i18n = require("i18n");
const cookieParser = require('cookie-parser')
const peupler = require("./mes_modules/peupler");

// Associe le moteur de vue au module «ejs» 
app.set('view engine', 'ejs'); // Générateur de template 

// Utilisation
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);
app.use(cookieParser());
let util = require("util");

// Configuration du multilingue
i18n.configure({ 
	locales : ['fr', 'en'],
	cookie : 'langueChoisie', 
	defaultLocale: 'en',
	directory : __dirname + '/locales' 
})

app.get('/:locale(en|fr)',  (req, res) => {
	res.setLocale(req.params.locale);
    res.cookie('langueChoisie', req.params.locale);
    res.redirect(req.headers.referer);
})

// Affichage de l'accueil (root)
app.get('/', (req, res) => {
	if (req.cookies.langueChoisie == null) {
		res.cookie('langueChoisie', 'fr');
		res.setLocale('fr');
	}
	res.render('accueil.ejs');
})

// Affichage de la liste
app.get('/list', (req, res) => {
	let cursor = db.collection('adresse')
	.find().toArray(function (err, resultat) {
		if (err) return console.log(err)
		// transfert du contenu vers la vue index.ejs (renders)
		// affiche le contenu de la BD
		res.render('adresses.ejs', { adresses: resultat })
	})
})

// Traite le formulaire
app.post('/modifier', (req, res) => {
	if (req.body['_id'] != ""){ 
		var oModif = {
			"_id": ObjectID(req.body['_id']), 
			nom: req.body.nom,
			prenom:req.body.prenom, 
			telephone:req.body.telephone,
			courriel:req.body.courriel
		}
		var util = require("util");
	}
	else {
		var oModif = {
		nom: req.body.nom,
		prenom:req.body.prenom, 
		telephone:req.body.telephone,
		courriel:req.body.courriel,
		}
	}
	db.collection('adresse').save(oModif, (err, result) => {
		if (err) return console.log(err)
		console.log('sauvegarder dans la BD')
		res.redirect('/list')
	})
});

// Ajoute un membre vide
app.get('/ajouter/', (req, res) => {
	db.collection('adresse').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('ajout vide dans la BD')
		res.redirect('/list')
	})
});

// Supprime une adresse
app.get('/detruire/:id', (req, res) => {
	var id = req.params.id;
	// var critere = ObjectID.createFromHexString(id)
	var critere = ObjectID(id);
	db.collection('adresse').findOneAndDelete({"_id": critere}, (err, resultat) => {
		if (err) return console.log(err)
		res.redirect('/list');
	})
});

// Tri les adresses
app.get('/trier/:cle/:ordre', (req, res) => {
	let cle = req.params.cle
	let ordre = (req.params.ordre == 'asc' ? 1 : -1)
	console.log(ordre);
	let cursor = db.collection('adresse').find().sort(cle,ordre).toArray(function(err, resultat){
	ordre = (ordre == 1 ? "desc" : "asc");
	res.render('adresses.ejs', {adresses: resultat, ordre:ordre, cle:cle})
	});
});

// Peupler la base de données de membres
app.get('/peupler', (req, res) => {
	let peupler = require('./mes_modules/peupler/');
    let listeMembres = peupler();
    db.collection('adresse').insert(listeMembres, (err, resultat) => {
		if (err) return console.log(err)
		listeMembres = [];
        res.redirect('/list');
    });
})

// Vide la base de données
app.get('/vider', (req, res) => {
    db.collection('adresse').drop((err, resultat) => {
        if (err) return console.log(err)
        res.redirect('/list');
    });
})

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