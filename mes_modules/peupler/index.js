"use strict"
const tableau = require('./tableaux.js');
let listeMembres = []
// Peuple une liste de membres aléatoirement.
const peupler_json = () => {
    let position;
	for(let i=0 ; i<15; i++) {
        let unMembre = {};
        unMembre.nom = tableau.tabNom[Math.floor(Math.random()*tableau.tabNom.length)];
        unMembre.prenom = tableau.tabPrenom[Math.floor(Math.random()*tableau.tabPrenom.length)];
        listeMembres.push(unMembre);
	}

	return(listeMembres);

}

module.exports = peupler_json;