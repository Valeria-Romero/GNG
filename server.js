const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: '098234lkjsadf098234kjhsdf097834kjhsdf'}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static/"));
app.set('views', __dirname + "/views/");

status = 'none';
context = {};

app.get('/', function(req, res){
    if(req.session.ainumber == undefined){
        console.log("New Game Starting");
        req.session.ainumber = Math.floor(Math.random()*100)+1;
        status = 'none';
        context = {status: status};
    } else {
        console.log("Page refresh, existing game is on");
        context = {status: status};
    }
    res.render('index', context);
});

app.post('/guess', function(req, res){
    console.log(req.body);
    console.log(req.session.ainumber);
    console.log("*****************************************************");

    if(req.body.guess > req.session.ainumber){
        status = 'high';
        console.log("Status = ", status);
    }
    else if(req.body.guess < req.session.ainumber){
        status = 'low';
        console.log("Status = ", status);
    }
    else if(req.body.guess == req.session.ainumber){
        status = 'win';
        console.log('win');
    }
    res.redirect('/');
});

app.post('/reset', function(req, res){
    console.log('resetting game');
    req.session.ainumber = undefined;
    res.redirect('/');
});

app.listen( 8080, function(){
    console.log( 'This server is running in port 8080.' );
});