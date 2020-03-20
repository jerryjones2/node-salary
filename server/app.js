'use strict';
//Load libraries
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');
var Keycloak = require('keycloak-connect');
var cors = require('cors');
const path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var log = require('../config/logger')
//Set values
var app = express();
const router = express.Router();

// https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/nodejs-adapter.adoc
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({
    store: memoryStore
  });

function create(config) {
  // Server settings
  app.set('env', config.env);
  app.set('port', config.server_port);

  app.use(cors());  // Enable CORS support
  app.use(bodyParser.json());
  app.use(favicon('static/images/favicon.png'))
  app.use(express.static('static'));

  // Create distributed session store using mongodb
  var {mongoose} = require('./db/mongoose-atlas.js').create(config);

// https://github.com/jdesboeufs/connect-mongo
  var mongooseMemStore = require('mongoose')
  var username = process.env.session_mongodb_username;
  var password = process.env.session_mongodb_password;
  var hostname = process.env.session_mongodb_hostname;
  var database = process.env.session_mongodb_database;
  var mongoUrl = `mongodb+srv://${username}:${password}@${hostname}/${database}?retryWrites=true&w=majority`;
  var options = {
    poolSize: process.env.session_mongodb_pool_size,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  mongooseMemStore.connect(mongoUrl,options);
  var mongoStore  = new MongoStore({ 
    mongooseConnection: mongooseMemStore.connection,
    collection: process.env.session_mongodb_collection,
    autoRemove: 'interval',
    autoRemoveInterval: 10 // In minutes. Default
  });
  if(config.env != 'dev') {
    log.debug('session secret set')
    mongoStore.secret = process.env.session_secret //set this value to encrypt session store
  }
  // mongoStore.secret
  app.use(session({
    secret: '7ceaee9b-efe6-45d7-88b0-ab07df9379a2"',
    store: mongoStore,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
  }));

  app._router.use(keycloak.middleware({
      logout: '/logout',
      admin: '/'
    }));
 
  //hbs.registerPartials(__dirname + '/views/partials');
  // require('./config/hbsHelpers').create(hbs,config);
  // app.set('views', __dirname + '/views');
  // app.set('partials', __dirname + '/views/partials');
  // app.set('view engine','hbs');
  // app.set('view options', { layout: 'layout-navbar' });

  // app.engine('handlebars', hbs());
  // app.set('view engine', 'handlebars');

  // var hbs = exphbs.create({
  //   helpers: {
  //       screamIt: (text) => {
  //         return text.toUpperCase()
  //       },
  //       foo: function () { return 'FOO!'; },
  //       bar: function () { return 'BAR!'; }
  //   }
  // });
  
  // app.engine('hbs', exphbs(
  //   {
  //     defaultLayout: 'main', 
  //     extname: '.hbs',
  //     helpers: {
  //         hostname: () => {
  //           return config.hostname
  //         },
  //         env: () => {
  //           return config.env
  //         },
  //         screamIt: (text) => {
  //           return text.toUpperCase()
  //         }     
  //     }
  // }));
  // app.set('view engine', 'hbs');

  var hbs = exphbs.create({
      extname: '.hbs',
      defaultLayout: 'main'
  });
  app.engine(hbs.extname, hbs.engine);
  app.set('view engine', hbs.extname);

  //Create HBS Helpers
  require('../config/hbsHelpers.js').create(app,Handlebars,config);
  // https://formatjs.io/handlebars/
  // https://medium.com/ableneo/internationalize-react-apps-done-right-using-react-intl-library-82978dbe175e
  HandlebarsIntl.registerWith(Handlebars);

  // app.use(express.static(__dirname + '/static'));
  // app.use(cors());  // Enable CORS support

  // =================================================
  // Redhat SSO (Keycloak) Setup
  // =================================================


  // Create a session-store to be used by both the express-session
  // middleware and the keycloak middleware.
 
  // var memoryStore = new session.MemoryStore();
  // app.use(session({
  //   secret: '7ceaee9b-efe6-45d7-88b0-ab07df9379a2"',
  //   resave: false,
  //   saveUninitialized: true,
  //   store: memoryStore
  // }));
  // Provide the session store to the Keycloak so that sessions
  // can be invalidated from the Keycloak console callback.
  //
  // Additional configuration is read from keycloak.json file
  // installed from the Keycloak web console.
  // var memoryStore = new session.MemoryStore();
    // keycloak = new Keycloak({
    //   store: mongooseMemStore
    // });
    // router.use(keycloak.middleware({
    //   logout: '/logout',
    //   admin: '/'
    // }));

  // =================================================
  // Web Page Routes
  // =================================================

  let routes = require('../routes');
  routes.init(app);

  // =================================================
  // Auto handling of 404, page not found, errors
  // =================================================
  app.use('*', function (req, res) {
    let urlStr = req.protocol + '://' + req.get('host') + req.originalUrl;
    log.error('Invalid Request: ' + urlStr);
    res.render('error.hbs',
      {
        pageTitle: '404: Page Not Found',
        errorTitle: 'Invalid Request',
        errorMessage: urlStr
      }
    )
  });

}

function start() {
  let server_port = app.get('port');
  app.listen(server_port, function () {
    log.info( "Listening on " + "port " + server_port );
  });
}

module.exports = {
  create,
  start,
  keycloak
}
 
