// server/models/transactionList.js

const network = require('composer-client')   // for building network intance
const doctor = new network.BusinessNetworkConnection()

const getTransactionsById = function* (id) {
  return doctor.connect('testprofile', 'businessNetworkIdentifier', 'WebAppAdmin', 'DJY27pEnl16d')
  .then(function (businessNetworkDefinition) {
    return businessNetworkDefinition.getTransactionRegistry()
  })
  .then(function (transactionRegistry) {
      // Retrieved Transaction Registry
  })
}

module.exports = {
  getTransactionsById
}
