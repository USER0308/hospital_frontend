var log4js = require('log4js')
var logger = log4js.getLogger('SampleWebApp')
var channels = require('../models/channel.js')
var getErrorMessage = require('../models/tool').getErrorMessage

function* createChannel () {
  logger.info('<<<<<<<<<<<<<<<<< C R E A T E  C H A N N E L >>>>>>>>>>>>>>>>>')
  logger.debug('End point : /channels')
  var channelName = this.request.body.channelName
  var channelConfigPath = this.request.body.channelConfigPath
  logger.debug('Channel name : ' + channelName)
  logger.debug('channelConfigPath : ' + channelConfigPath) // ../artifacts/channel/mychannel.tx
  if (!channelName) {
    this.response.body = JSON.stringify(getErrorMessage('\'channelName\''))
    return
  }
  if (!channelConfigPath) {
    this.response.body = JSON.stringify(getErrorMessage('\'channelConfigPath\''))
    return
  }
  this.body = yield channels.createChannel(channelName, channelConfigPath, this.request.body.username, this.request.body.orgName)
}
function* joinChannel () {
  logger.info('<<<<<<<<<<<<<<<<< J O I N  C H A N N E L >>>>>>>>>>>>>>>>>')
  var channelName = this.params.channelName
  var peers = this.request.body.peers
  logger.debug('channelName : ' + channelName)
  logger.debug('peers : ' + peers)
  if (!channelName) {
    this.response.body = JSON.stringify(getErrorMessage('\'channelName\''))
    return
  }
  if (!peers || peers.length === 0) {
    this.response.body = JSON.stringify(getErrorMessage('\'peers\''))
    return
  }
  this.body = yield channels.joinChannel(channelName, peers, this.request.body.username, this.request.body.orgName)
}

exports.createChannel = createChannel
exports.joinChannel = joinChannel
