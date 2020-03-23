'use strict';
var mongoose = require('mongoose')

var model = mongoose.model('employee_salaries');

function index (req, res) {
    res.render('salary/index',
        {
            pageTitle: 'State Employee Salary Search',
            message: 'Welcome to the Salary App '
        }
    )
}

function search (req, res, next) {
    var json = req.body;
    var jsonString = JSON.stringify(json);
    //console.log(jsonString);
    if(jsonString == "{}"){
        console.log('No Search Criteria');
        res.status(500).send('Please enter search criteria');
        return
    }
    model.find(json, function(err, docs) {
        if (!err){ 
            res.json({success : "Found Successfully", status : 200, data: docs});
        } else { 
            res.json({success : "ERROR", status : 401});
            throw err;
        }
    }).collation({ locale: 'en', strength: 2 }).sort({lastName:1,firstName:1});
}

function distinctJobTitles(req, res, next) {
    model.collection.distinct('jobTitle', function(err, docs) {
        if (!err){ 
            res.json({success : "Found Successfully", status : 200, data: docs.sort()});
        } else { 
            console.log('Error')
            throw err;
        }
    });
};

function distinctAgencyNames(req, res, next) {

    model.collection.distinct('agencyName', function(err, docs) {
        if (!err){ 
            console.log(docs.length)
            res.json({success : "Found Successfully", status : 200, data: docs.sort()});
        } else { 
            console.log('Error')
            throw err;
        }
    });
  
};


module.exports = {
    index,
    search,
    distinctJobTitles,
    distinctAgencyNames
};