// npm init paras usar npm en el projecto necesito mi package.json
// install node package express npm install express

const connect = require('express'); // like import

const app = connect(); // create web app

app.listen(3500 , ()=> console.log('escuchando en puerto 3500'))  // puerto , funcion

// now xpress must be the host of static files like index.html

app.use(connect.favicon());
app.use(connect.static('1_dataandapis.html' + '/public'));