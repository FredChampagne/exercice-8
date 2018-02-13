var express = require('express');
var app = express();
app.use(express.static('public'));

/* on associe le moteur de vue au module «ejs» */

app.set('view engine', 'ejs'); // générateur de template

app.get('/', function (req, res) {
	let resultat = 
	[
		{
			id : 1,
			nom : "Eddy Martin",
			telephone : "514-234-1212"
		},
		{
			id : 1,
			nom : "Eddy Martin",
			telephone : "514-234-1212"
		},
		{
			id : 1,
			nom : "Eddy Martin",
			telephone : "514-234-1212"
		}
	]

	res.render("gabarit1.ejs", {adresses:resultat})
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})