
var log4js = require('log4js')
var logger = log4js.getLogger('SampleWebApp')
var network = require('../models/network')
var getErrorMessage = require('../models/tool').getErrorMessage

function* enrollUser () {
  logger.info('<<<<<<<<<<<<<<<<< E N R O L L  U S E R S >>>>>>>>>>>>>>>>>')
  logger.debug('End point : /users')
  var username = this.request.body.username
  var orgName = this.request.body.orgName
  logger.debug('User name : ' + username)
  logger.debug('Org name  : ' + orgName)
  if (!username) {
    this.response.body = JSON.stringify(getErrorMessage('\'userName\''))
    return
  }
  if (!orgName) {
    this.response.body = JSON.stringify(getErrorMessage('\'orgName\''))
    return
  }
  let response = yield network.getRegisteredUsers(username, orgName, true)
  if (response && typeof response !== 'string') {
    this.response.body = JSON.stringify(response)
  } else {
    this.response.body = JSON.stringify({
      success: false,
      message: response
    })
  }
}

exports.enrollUser = enrollUser
