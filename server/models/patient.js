const query = require('./query')
const hospital = require('./hospital').hospital
const patient = {
  peer: 'peer1',            // peer name preset
  org: 'org1',              // organization name preset
  channelName: 'mychannel', // channel Name that hospital in
  chaincode: 'mycc',        // invoked chaincode name
  adminName: 'admin',       // name of admin that want to check out message
  patientId: '',            // patient id waiting for input
  hospitalName: ''          // hostpitalName waiting for input
}
//* 查询在某家医院下就诊的所有病人
// TODO chaincode name should be 'queryPatientsByHospitalId', refresh after chaincode's changing
var queryAllPatient = function* (name) {
  // temp way for invoke query
  var hospitalName = name
  const allPatient = yield query.queryChaincode(hospital.peer, hospital.channelName, hospital.chaincode, [hospitalName], 'queryPatientsByHospitalId', hospital.userName, hospital.org)
  return allPatient
}

/**
 * (peer, channelName, chaincodeName, args, fcn, username, org)
 * @param {*} args = [patientId, originHospitalId, targetHospitalId]
 */

//* 查询某个病人的病例
var queryCasesByPatientId = function* (patientId) {
  var Id = patientId
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [Id], 'queryCasesByPatientId', patient.adminName, patient.org)
  return Case
}

//* 查询某个病人的病人信息
var queryPatientByPatientId = function* (patientId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [patientId], 'queryPatientByPatientId', patient.adminName, patient.org)
  return Case
}
/*var queryPatientByreferralId = function* (referralId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [referralId], 'queryPatientByreferralId', patient.adminName, patient.org)
  return Case
}*/
module.exports = {
  queryAllPatient,
  queryCasesByPatientId,
  queryPatientByPatientId,
  //queryPatientByreferralId,
  patient
}
