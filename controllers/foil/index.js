'use strict';

function index (req, res) {
    res.render('foil/index',
        {
            pageTitle: 'Felony Offender Search',
            message: 'Welcome to the Foil App '
        }
    )
}

module.exports = {
    index
};