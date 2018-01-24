const query = require('./query')
const hospital = require('./hospital')
var patient = {
  peer: 'peer1',            // peer name preset
  org: 'org1',              // organization name preset
  channelName: 'mychannel', // channel Name that hospital in
  chaincode: 'mycc',        // invoked chaincode name
  adminName: 'admin',       // name of admin that want to check out message
  patientId: '',            // patient id waiting for input
  hospitalName: ''          // hostpitalName waiting for input
}
//* 查询在某家医院下就诊的所有病人
var queryAllPatient = function* (name) {
  const allPatient = yield query.queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, name, 'queryIpByHospitalName', hospital.userName, hospital.org)
  return allPatient
}

/**
 *
 * @param {*} args = [patientId, originHospitalId, targetHospitalId]
 */

//* 查询某个病人的病例
var queryCasesByPatientId = function* (patientId) {
  const Case = yield query.queryChainCode(patient.peer, patient.channelName, patient.chaincode, name, 'queryCasesByPatientId', patient.userName, patient.org)
  return Case
}
module.exports = {
  queryAllPatient,
  queryCasesByPatientId
}