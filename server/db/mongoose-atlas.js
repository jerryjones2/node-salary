var mongoose = require('mongoose')
var log = require('../../config/logger')

function create(config) {
  mongoose.Promise = global.Promise

  var username = config.mongodb_username;
  var password = config.mongodb_password;
  var hostname = config.mongodb_hostname;
  var database = config.mongodb_database;
 

  var mongoUrl = `mongodb+srv://${username}:${password}@${hostname}/${database}?retryWrites=true&w=majority`;
  var options = {
    poolSize: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }


  mongoose.connect(mongoUrl,options);
  log.info("Mongo Atlas App Database Connected");

  return mongoose;
}

// Add Model files here
require('../../server/models/EmployeeSalary');

module.exports = {
  create
};
