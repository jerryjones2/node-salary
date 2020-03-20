'use strict';

var openshift_namespace = process.env.OPENSHIFT_BUILD_NAMESPACE
openshift_namespace = openshift_namespace.toUpperCase()  //nodejs-www-1v2

var server_port = process.env.WWW_NODE_SALARY_SERVICE_PORT
var server_ip_address = process.env.WWW_NODE_SALARY_SERVICE_HOST

var hostname  = process.env.HOSTNAME
var env  = process.env.NODE_ENV

var mongodb_username = process.env.mongodb_username
var mongodb_password = process.env.mongodb_password
var mongodb_hostname = process.env.mongodb_hostname
var mongodb_database = process.env.mongodb_database

var toString = () => {
    var result = '\n';
    result += `openshift_namespace : ${openshift_namespace}\n`;
    result += `server_port : ${server_port}\n`;
    result += `server_ip_address : ${server_ip_address}\n`;
    result += `hostname : ${hostname}\n`;
    result += `env : ${env}\n`;
    result += `mongodb_hostname : ${mongodb_hostname}\n`;
    result += `mongodb_database : ${mongodb_database}`;
    // result += `mongodb_username : ${mongodb_username}\n`;
    // result += `mongodb_password : ${mongodb_password}\n`;
    return result;
}

module.exports = {
    toString,
    openshift_namespace,
    server_port,
    server_ip_address,
    hostname,
    env,
    mongodb_username,
    mongodb_password,
    mongodb_hostname,
    mongodb_database

};