const queryChainCode = require('./query').queryChaincode
const hospital = {
  peer: 'peer1',
  org: 'org1',
  channelName: 'mychannel',
  chaincode: 'mycc',
  userName: 'admin'
}
const queryHospitalByHospitalName = function (name) {
  return queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, [name], 'queryHospitalByHospitalName', hospital.userName, hospital.org)
}
const queryHospitalByHospitalId = function (hospitalId){
  return queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, [hospitalId], 'queryHospitalByHospitalId', hospital.userName, hospital.org)
}
/**
 *
 * @param {*} args = [patientId, originHospitalId, targetHospitalId]
 */

module.exports = {
  queryHospitalByHospitalName,
  hospital,
  queryHospitalByHospitalId
}
