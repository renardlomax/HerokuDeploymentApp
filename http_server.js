// add http server
// -----------------------
// YOUR CODE
const express = require('express');
const app = express();
const low     = require('lowdb');
const fs      = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db      = low(adapter);
const chalk = require('chalk');
const cors = require('cors');
const log = console.log;
// init the data store
db.defaults({ users: []}).write();

// data parser - used to parse post data

// Static files it is refrenced from the public directory
app.use(express.static('public'))
// Chalk helps debug
log(chalk.blue('Hello') + ' World' + chalk.red('!'));
console.log("Hello")
//body parser import and usage

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// return all users
app.get('/data', function(req, res){     

    res.send(db.get('users').value());
});
 //post routes
 app.post('/test', function(req, res){
     console.log(req.body.username, req.body.password);
     res.send(req.body.username + " " + req.body.password)
 })

 app.post('/add', function(req, res){
    var user = {
        'name'          : req.body.name,
        'dob'           : req.body.dob,
        'email'         : req.body.email,
        'username'      : req.body.username,
        'password'      : req.body.password,
        'phone'         : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip'  : req.body.citystatezip,
        'latitude'      : req.body.latitude,
        'longitude'     : req.body.longitude,
        'avatar'        : req.body.avatar
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());

 
});


 // Start server 
app.listen(3000, function(){
    console.log("Running on Port 3000");
})
