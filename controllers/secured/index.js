'use strict';

function index(req,res) {
    res.render('public/about.hbs',
      {
          pageTitle: 'Secured Home Page',
          message: 'This is a secured page',
          layout: 'main'
      }
  )
}

function foil (req, res) {
    res.render('foil/index',
        {
            pageTitle: 'Secured - Felony Offender Search',
            message: 'Secured - Welcome to the Foil App '
        }
    )
}

module.exports = {
    index,
    foil
};