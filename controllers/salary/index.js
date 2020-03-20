'use strict';
const EmployeeSalary = require('../../server/models/EmployeeSalary');

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
    EmployeeSalary.find(json, function(err, docs) {
        if (!err){ 
            res.json({success : "Found Successfully", status : 200, data: docs});
        } else { 
            res.json({success : "ERROR", status : 401});
            throw err;
        }
    }).collation({ locale: 'en', strength: 2 }).sort({lastName:1,firstName:1});
}

function distinctJobTitles(req, res, next) {
    EmployeeSalary.collection.distinct('jobTitle', function(err, docs) {
        if (!err){ 
            res.json({success : "Found Successfully", status : 200, data: docs.sort()});
        } else { 
            console.log('Error')
            throw err;
        }
    });
};

function distinctAgencyNames(req, res, next) {

    EmployeeSalary.collection.distinct('agencyName', function(err, docs) {
        if (!err){ 
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