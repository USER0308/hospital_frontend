// server/models/medicalLogList.js
const network = require('composer-client')   // for building network intance
const doctor = new network.BusinessNetworkConnection()

const getMedicalLogsById = function* (id) {
  return doctor.connect('connection.json', 'org-acme-biznet', 'PeerAdmin', 'randomString')
  .then(function (businessNetworkDefinition) {
    console.log('connect good')
    return businessNetworkDefinition.getAssetRegistry('businessNetworkIdentifier.registryId')
  })
    .then(function (assetRegistry) {
      console.log('connect good')
        // Retrieved Asset Registry
    })
    .catch(function (error) {
      console.log('wrong' + error)
      // Add optional error handling here.
    })
}

const createMedicalLog = function* (data) {
  return doctor.connect('connection.json', 'org-acme-biznet', 'PeerAdmin', 'randomString')
  .then(function (businessNetworkDefinition) {
    return businessNetworkDefinition.addAssetRegistry('registryId', 'registryName')
  })
}

module.exports = {
  getMedicalLogsById,
  createMedicalLog
}
