//Developer: José Armando Valencia Moreno
//Resources: https://youtu.be/olTgcd5VjX0 

const express = require('express');
const path = require('path')
const app = express();

//Rendering clock app using ejs.
app.get('/', (req, res) => {
  res.render('index.ejs');
});

//Function to create date object and pass it through stringify
app.get('/hrsrv', (req, res) => {
  var date = new Date();
  var objDate = {
    Hour: date.getHours(),
    Minutes: date.getMinutes(),
    Seconds: date.getSeconds()
  };
  res.end(JSON.stringify(objDate));
});

//Static folder where all the files are stored.
app.use(express.static(path.join(__dirname)));

//Views from the aplication using EJS engine.
app.set('views', __dirname);
app.set('view engine', 'ejs');

//Server listening in port 3000.
app.listen(3000, function() {
  console.log("Serving...");
})