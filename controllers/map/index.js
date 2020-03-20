'use strict';
var request = require("request");
let fetch = require('node-fetch');

var stationListUrl = "https://api-dev.tn.gov/IWTWeb/xml_IWT_Stats.aspx?controller=ACF_IWT_UnitsListXML";
var stationDetailUrl = "https://api-dev.tn.gov/IWTWeb/xml_IWT_Stats.aspx?controller=ACF_IWT_UnitStatsXML";
var accessToken = '75eb8de33f799872693c6f70a8040855';

function index (req, res) {
    res.render('map/index',
        {
            pageTitle: 'Drivers Service Stations',
            message: 'This is the Map Test'
        }
    )
}

function fullpage (req, res) {
    res.render('map/fullpage',
        {
            pageTitle: 'Drivers Service Stations',
            message: 'This is the Map Test',
            layout:false
        }
    )
}

function stationList(req, res, next) {
    fetch(
        stationListUrl
        , {
            method: 'GET',
            headers: {'Authorization':`Bearer ${accessToken}`}
        })
    .then(res => res.json())
    .then(
        json => {
            res.json(json)
        }
    )
    .catch(err => {console.log(err);});
};

function stationDetail(req, res, next) {
    let unitid = req.query.unitid;
    let url = `${stationDetailUrl}&unitid=${unitid}`;

    fetch(url, {
        method: 'GET'
        ,headers: {'Authorization':`Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then(
        json => {
            res.json(json)
        }
    )
    .catch(err => {console.log(err);});
};


function stationList2(req, res, next) {
    let url = "https://api-dev.tn.gov/IWTWeb/xml_IWT_Stats.aspx?controller=ACF_IWT_UnitsListXML";

    req.pipe(request.get(url, { json: true, body: req.body }), { end: false }).pipe(res);

};
function stationDetail2(req, res, next) {
    let unitid = req.query.unitid;
    
    let url = `https://api-dev.tn.gov/IWTWeb/xml_IWT_Stats.aspx?controller=ACF_IWT_UnitStatsXML&unitid=${unitid}`;

    req.pipe(request.get(url, { json: true, body: req.body }), { end: false }).pipe(res);
};


module.exports = {
    index,
    fullpage,
    stationList,
    stationDetail
};