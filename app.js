const config = require('./config').config();
//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const http = require('http');
var server;

 //Set Environment
 process.env.NODE_ENV = config.mode;

const apiRoutes = require('./routes');
const {authenticate} = require('./api/controller/structo.controller');
const verifyToken = require('./api/middleware/verifyToken');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post("/api/token",(req,res,next)=>{    
  authenticate(req,res,next);
});
//Verify token if valid
app.use(verifyToken);

//Set Routing
apiRoutes.setRoute(app);
server = http.createServer(app);

server.listen(config.port,() => {
  console.log(`HTSO Ticketing System's REST API Server is listening to port ${config.port} in ${config.mode} environment.`);
});

 