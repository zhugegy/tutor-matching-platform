const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');
const jwt = require('jwt-simple');


const app = express();



const loginRouter = require('./app/routes/app.login.routes');

app.set('views', path.join(__dirname, 'app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	 secret: 'ssshhhhh',
	 cookie: {maxAge: 18000000},
	 resave: true,
	 saveUninitialized: true
	}));


app.use("/", loginRouter);

app.listen(3001, function () {
    console.log("listening on port 3001!");
});