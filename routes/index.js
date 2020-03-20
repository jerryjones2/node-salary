'use strict';

const
    publicRoute = require('./public.js'),
    salaryRoute = require('./salary.js'),
    foilRoute = require('./foil.js'),
    securedRoute = require('./secured.js'),
    mapRoute = require('./map.js')

var log = require('../config/logger')

    function init(app) {
        // =================================================
        // Server setup
        // =================================================
        app.use(function(req, res, next) {  
          // https://stackoverflow.com/questions/35522154/get-username-from-keycloak-session-in-nodejs
          
         
          if ( typeof req.kauth.grant !== 'undefined' && req.kauth.grant ){
             // console.log("app.js req.kauth.grant="+req.kauth.grant)
            // console.log("access_token content: "+JSON.stringify(req.kauth.grant.access_token.content))

            let content = req.kauth.grant.access_token.content

            app.locals.name           = content.name                  // FirstName LastName
            app.locals.given_name     = content.given_name            // FirstName
            app.locals.family_name    = content.family_name           // LastName
            app.locals.email          = content.email                 // Email Address
            app.locals.email_verified = content.email_verified        // true or flase
            app.locals.username       = content.preferred_username    // SSO username
            app.locals.authenticated  = true
          }else{
            app.locals.name           = ''
            app.locals.given_name     = ''
            app.locals.family_name    = ''
            app.locals.email          = ''
            app.locals.email_verified = false
            app.locals.username       = ''
            app.locals.authenticated  = false
          }
          next();
        })
        app.get('*', function (req, res, next) {
            log.debug('GET Request: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
            return next();
        });
        app.post('*', function (req, res, next) {
          log.debug('POST Request: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
          return next();
        });
        app.put('*', function (req, res, next) {
          log.debug('PUT Request: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
          return next();
        });
        app.delete('*', function (req, res, next) {
          log.debug('DELETE Request: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
          return next();
        });

        // =================================================
        // Redirects
        // =================================================
        app.get('/', function (req, res) {
            res.redirect('/public');
        });
        app.get('/about', function (req, res) {
            res.redirect('/public/about');
        });
        
        // =================================================
        // Imported routes
        // =================================================
        app.use('/public',publicRoute)
        app.use('/salary',salaryRoute)
        app.use('/foil',foilRoute)
        app.use('/secured',securedRoute)
        app.use('/map',mapRoute)

    }

    module.exports = {
        init
    };