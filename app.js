var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true });
var usersSchema = new mongoose.Schema({
    userName: String,
    userAge: Number,
    userrole: String,
});
var Users = mongoose.model('Users', usersSchema);
let userscount = Users.find().count;
let userrole;
if(userscount == 0){
    userrole = 'admin';
}

var userrolesSchema = new mongoose.Schema({
    userName: String,
    userRole: String
});
var User_Roles = mongoose.model('User', userrolesSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/adduser', (req, res) => {
    var myData = new Users(req.body);
    myData.save()
        .then(item => {
            res.send('Data saved to database');
        })
        .catch(err => {
            res.status(400).send('Unable to save to database');
        });
});

app.listen(port, () => {
    console.log('Server listening on port', + port);
});