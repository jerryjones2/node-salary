'use strict';
const https = require('https');

function index (req, res) {
    res.render('public/home.hbs',
        {
            pageTitle: '1v2 Project',
            message: 'To login: username=test.user.1    password=Pasword.1'
        }
    )
}

function about(req,res) {
    // req.session.test_value = 'newTestValue';
    let testUrl = 'https://state-of-tennessee-dev.apigee.net/mytn/apigee/ssmsService/message?numberTo=6147837538&messageText=Hello';
        https.get(testUrl, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        })
    });


    let value = req.sessionID;
    let sessionValue = req.session.test_value;
    if(sessionValue == undefined) {
        sessionValue = new Date().toLocaleTimeString();
        req.session.test_value = sessionValue;
    }
    res.render('public/about.hbs',
      {
          pageTitle: 'About Page',
          message: 'Session test_value stored at: ' + sessionValue,
          layout: 'main'
      }
  )
}

module.exports = {
    index,
    about
};