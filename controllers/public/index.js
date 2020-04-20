'use strict';
const https = require('https');
const request = require('request');

function index (req, res) {
    res.render('public/home.hbs',
        {
            pageTitle: '1v2 Project',
            message: 'To login: username=test.user.1    password=Pasword.1'
        }
    )
}

function getIp(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });
}

async function about(req,res) {
    // req.session.test_value = 'newTestValue';
    let testUrl = 'https://state-of-tennessee-dev.apigee.net/mytn/apigee/ssmsService/message?numberTo=6147837538&messageText=Hello';
    let testUrl2 = 'https://api.ipify.org?format=json';

    var data = await getIp(testUrl2);
    


    let value = req.sessionID;
    let sessionValue = req.session.test_value;
    if(sessionValue == undefined) {
        sessionValue = new Date().toLocaleTimeString();
        req.session.test_value = sessionValue;
    }
    res.render('public/about.hbs',
      {
          pageTitle: 'About Page ' + data,
          message: 'Session test_value stored at: ' + sessionValue,
          layout: 'main',
          pageName: 'about'
      }
  )
}

module.exports = {
    index,
    about
};