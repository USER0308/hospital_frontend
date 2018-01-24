/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
'use strict'
var path = require('path')
var util = require('util')
var fbc = require('fabric-client')
var network = require('./network.js')
var log = network.getlog('invoke-chaincode')
fbc.addConfigFile(path.join(__dirname, 'network-config.json'))

var invokeChaincode = function (peersUrls, channelName, chaincodeName, fcn, args, username, org) {
  log.debug(util.format('\n============ invoke transaction on organization %s ============\n', org))
  var client = network.getClientForOrg(org)
  var channel = network.getChannelForOrg(org)
  var targets = network.newPeers(peersUrls)
  var txId = null

  return network.getRegisteredUsers(username, org).then((user) => {
    txId = client.newTransactionID()
    log.debug(util.format('Sending transaction "%j"', txId))
    // send proposal to endorser
    var request = {
      targets: targets,
      chaincodeId: chaincodeName,
      fcn: fcn,
      args: args,
      chainId: channelName,
      txId: txId
    }
    return channel.sendTransactionProposal(request)
  }, (err) => {
    log.error('Failed to enroll user \'' + username + '\'. ' + err)
    throw new Error('Failed to enroll user \'' + username + '\'. ' + err)
  }).then((results) => {
    var proposalResponses = results[0]
    var proposal = results[1]
    var allGood = true
    for (var i in proposalResponses) {
      let oneGood = false
      if (proposalResponses && proposalResponses[0].response &&
        proposalResponses[0].response.status === 200) {
        oneGood = true
        log.info('transaction proposal was good! Number' + i)
      } else {
        log.error('transaction proposal was bad! Number' + i)
      }
      allGood = allGood & oneGood
    }
    if (allGood) {
      log.debug(util.format(
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
      var transactionID = txId.getTransactionID()
      var eventPromises = []

      var eventhubs = network.newEventHubs(peersUrls, org)
      for (let key in eventhubs) {
        let eh = eventhubs[key]
        eh.connect()

        let txPromise = new Promise((resolve, reject) => {
          let handle = setTimeout(() => {
            eh.disconnect()
            reject()
          }, 30000)

          eh.registerTxEvent(transactionID, (tx, code) => {
            clearTimeout(handle)
            eh.unregisterTxEvent(transactionID)
            eh.disconnect()

            if (code !== 'VALID') {
              log.error(
                'The balance transfer transaction was invalid, code = ' + code)
              reject()
            } else {
              log.info(
                'The balance transfer transaction has been committed on peer ' +
                eh._ep._endpoint.addr)
              resolve()
            }
          })
        })
        eventPromises.push(txPromise)
      }
      var sendPromise = channel.sendTransaction(request)
      return Promise.all([sendPromise].concat(eventPromises)).then((results) => {
        log.debug(' event promise all complete and testing complete')
        return results[0] // the first returned value is from the 'sendPromise' which is from the 'sendTransaction()' call
      }).catch((eOr) => {
        log.error(
          'Failed to send transaction and get notifications within the timeout period.'
        )
        return 'Failed to send transaction and get notifications within the timeout period.'
      })
    } else {
      log.error(
        'Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...'
      )
      return 'Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...'
    }
  }, (err) => {
    log.error('Failed to send proposal due to error: ' + err.stack ? err.stack : err)
    return 'Failed to send proposal due to error: ' + err.stack ? err.stack : err
  }).then((response) => {
    if (response.status === 'SUCCESS') {
      log.info('Successfully sent transaction to the orderer.')
      return txId.getTransactionID()
    } else {
      log.error('Failed to order the transaction. Error code: ' + response.status)
      return 'Failed to order the transaction. Error code: ' + response.status
    }
  }, (err) => {
    log.error('Failed to send transaction due to error: ' + err.stack ? err
      .stack : err)
    return 'Failed to send transaction due to error: ' + err.stack ? err.stack : err
  })
}

exports.invokeChaincode = invokeChaincode
