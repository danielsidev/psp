"use strict";
let express		   = require('express');
let bodyParser   = require('body-parser');
let helmet       = require('helmet'); 
let compression  = require('compression');
let RegisterRoutes  = require('../routes/index');
let cors 				 = require('cors');
class App {

  constructor(){
    this.app = express();
    this.port = process.env.PSP_PORT;
    this.enviroment = process.env.NODE_ENV;
    this.configMiddlewares();
    this.initializeRoutes();
  }
  
  configMiddlewares() {
    this.app.use(cors());
    this.app.use('/public', express.static(__dirname + '/public'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.set('views', __dirname + '../../views');
    this.app.engine('html', require('ejs').renderFile);
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());    
    console.log(`Config Middlewares...`);
 }
  initializeRoutes() {
    this.register = new RegisterRoutes(this.app);
    this.register.setRoutes();
    console.log(`Initialize Routes...`);
 }

 run() {
   let port = this.port;
   let enviroment = this.enviroment;
  this.app.listen(this.port,function(){
    console.log(`Run: http://localhost:${port}`);
    console.log(`Enviroment: ${enviroment}`);  
  });
}
}
module.exports = App;
