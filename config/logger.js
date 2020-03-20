const log4js = require('log4js')

var log = log4js.getLogger()

log.level = process.env.log_level || 'debug'

console.log('Setting Log Level to: '+log.level)

module.exports = log