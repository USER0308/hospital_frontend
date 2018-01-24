'use strict'
const path = require('path')
const fs = require('fs')
const util = require('util')
const fbc = require('fabric-client')
const network = require('./network.js')
const log = network.getlog('instantiateChaincode')
fbc.addConfigFile(path.join(__dirname, 'network-config.json'))
const orgs = fbc.getConfigSetting('network-config')
var txId = null
var eh = null

const instantiateChaincode = function* (channelName, chaincodeName, chaincodeVersion, functionName, args, username, org) {
  log.debug('\n============ Instantiate chaincode on organization ' + org + ' ============\n')
  var channel = network.getChannelForOrg(org)
  var client = network.getClientForOrg(org)
  return network.getOrgAdmin(org).then((user) => {
    // read the config block from the orderer for the channel
    // and initialize the verify MSPs based on the participating
    // organizations
    return channel.initialize()
  }, (err) => {
    log.error('Failed to enroll user \'' + username + '\'. ' + err)
    throw new Error('Failed to enroll user \'' + username + '\'. ' + err)
  }).then((success) => {
    txId = client.newTransactionID()
    // send proposal to endorser
    var request = {
      chaincodeId: chaincodeName,
      chaincodeVersion: chaincodeVersion,
      fcn: functionName,
      args: args,
      txId: txId
    }
    return channel.sendInstantiateProposal(request)
  }, (eor) => {
    log.error('Failed to initialize channel!')
    throw new Error('Failed to initialize channel!')
  }).then((results) => {
    var proposalResponses = results[0]
    var proposal = results[1]
    var allGood = true
    for (var i in proposalResponses) {
      let oneGood = false
      if (proposalResponses && proposalResponses[0].response &&
        proposalResponses[0].response.status === 200) {
        oneGood = true
        log.info('instantiate proposal was good! Number: ' + i)
      } else {
        log.error('instantiate proposal was bad! Number: ' + i)
      }
      allGood = allGood & oneGood
    }
    if (allGood) {
      log.info(util.format(
        'Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s", metadata - "%s", endorsement signature: %s',
        proposalResponses[0].response.status, proposalResponses[0].response.message,
        proposalResponses[0].response.payload, proposalResponses[0].endorsement
        .signature))
      var request = {
        proposalResponses: proposalResponses,
        proposal: proposal
      }
      // set the transaction listener and set a timeout of 30sec
      // if the transaction did not get committed within the timeout period,
      // fail the test
      var deployId = txId.getTransactionID()

      eh = client.newEventHub()
      let data = fs.readFileSync(path.join(__dirname, orgs[org]['peer1']['tls_cacerts']))
      eh.setPeerAddr(orgs[org]['peer1']['events'], {
        pem: Buffer.from(data).toString(),
        'ssl-target-name-override': orgs[org]['peer1']['server-hostname']
      })
      eh.connect()

      let txPromise = new Promise((resolve, reject) => {
        let handle = setTimeout(() => {
          eh.disconnect()
          reject()
        }, 30000)

        eh.registerTxEvent(deployId, (tx, code) => {
          log.info(
            'The chaincode instantiate transaction has been committed on peer ' +
            eh._ep._endpoint.addr)
          clearTimeout(handle)
          eh.unregisterTxEvent(deployId)
          eh.disconnect()

          if (code !== 'VALID') {
            log.error('The chaincode instantiate transaction was invalid, code = ' + code)
            reject()
          } else {
            log.info('The chaincode instantiate transaction was valid.')
            resolve()
          }
        })
      })

      var sendPromise = channel.sendTransaction(request)
      return Promise.all([sendPromise].concat([txPromise])).then((results) => {
        log.debug('Event promise all complete and testing complete')
        return results[0] // the first returned value is from the 'sendPromise' which is from the 'sendTransaction()' call
      }).catch((err) => {
        log.error(
          util.format('Failed to send instantiate transaction and get notifications within the timeout period. %s', err)
        )
        return 'Failed to send instantiate transaction and get notifications within the timeout period.'
      })
    } else {
      log.error(
        'Failed to send instantiate Proposal or receive valid response. Response null or status is not 200. exiting...'
      )
      return 'Failed to send instantiate Proposal or receive valid response. Response null or status is not 200. exiting...'
    }
  }, (err) => {
    log.error('Failed to send instantiate proposal due to error: ' + err.stack
    ? err.stack : err)
    return 'Failed to send instantiate proposal due to error: ' + err.stack
    ? err.stack : err
  }).then((response) => {
    if (response.status === 'SUCCESS') {
      log.info('Successfully sent transaction to the orderer.')
      return 'Chaincode Instantiateion is SUCCESS'
    } else {
      log.error('Failed to order the transaction. Error code: ' + response.status)
      return 'Failed to order the transaction. Error code: ' + response.status
    }
  }, (err) => {
    log.error('Failed to send instantiate due to error: ' + err.stack ? err
      .stack : err)
    return 'Failed to send instantiate due to error: ' + err.stack ? err.stack
    : err
  })
}
exports.instantiateChaincode = instantiateChaincode
