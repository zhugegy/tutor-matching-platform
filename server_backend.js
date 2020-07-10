let express = require("express");
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();

let backendRouter = require('./app/routes/backend.server.routes');

app.set('views', path.join(__dirname, 'app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//the session will expire in 300 mins
//ref: https://github.com/expressjs/session
app.use(session({
 secret: 'ssshhhhh',
 cookie: {maxAge: 18000000},
 resave: true,
 saveUninitialized: true
}));

app.use('/', backendRouter);

app.listen(4000, function () {
    console.log("listening on port 4000!");
});