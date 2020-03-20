'use strict';

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