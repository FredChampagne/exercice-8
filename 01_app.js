const express = require('express');
const app = express();
app.use(express.static('public'));
const MongoClient = require('mongodb').MongoClient

/* on associe le moteur de vue au module «ejs» */

app.set('view engine', 'ejs'); // générateur de template

app.get('/', function (req, res) {
		var cursor = db.collection('adresse')
					   .find().toArray(function(err, resultat){
		if (err) return console.log(err)
		// transfert du contenu vers la vue index.ejs (renders)
		// affiche le contenu de la BD
		res.render('gabarit.ejs', {adresses: resultat})
		}) 
})

let server = app.listen(8081, function () {
   let host = server.address().address
   let port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})