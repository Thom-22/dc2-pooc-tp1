const express = require('express')
const app = express()
const port = 3000
//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");
//MustacheExpress est notre moteur de template
const mustacheExpress= require('mustache-express');
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
//Création d'une variable qui va nous permettre d'accéder à un GPIO du raspberry  
//⚠️ Le nombre passé en paramètre correspond au numéro de GPIO et non au numéro de la pin.
const led = new Gpio(17, 'out');
		
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Ici on dit au serveur de servir les fichiers statiques depuis le dossier /public
app.use(express.static('public'))

app.get('/', (request, response) => {
response.render('index');
})
app.get('/hello/:name', (request, response) => {
response.render('hello', {name: request.params.name});
})
app.get('/on', (request, response) => {
led.writeSync(1);
response.render('on')
})
app.get('/off', (request, response) => {
led.writeSync(0);
response.render('off')
	
})
app.get('/pooc', (request, response) => {
  response.render('pooc');
})
app.listen(port, (err) => {
 if (err) {
 return console.log('Erreur du serveur : ', err)
 }
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);

})
process.on('SIGINT', () => {
  led.unexport();
});
