const query = require('./query')
const patient = require('./patient').patient
const invokeChainCode = require('./invokeTransaction').invokeChaincode

//* 生成转诊单
var generateReferralProfile = function (msg) {
  return invokeChainCode(['120.77.243.233:7051'], patient.channelName, patient.chaincode, 'CreateReferralProfile', [msg.Id, msg.PatientId, msg.ReferralType, msg.RelationDemand, msg.PayWay,
    msg.IllnessState, msg.ToInfo.HospitalId, msg.FromInfo.HospitalId, msg.FromInfo.Section, msg.FromInfo.Doctor,
    msg.FromInfo.Phone], patient.adminName, patient.org)
}
var ReferralReturn = function (msg) {
  return invokeChainCode(['120.77.243.233:7051'], patient.channelName, patient.chaincode, 'transferReturn', [msg.Id, msg.ToInfo.HospitalId, msg.State, msg.ToInfo.Section, msg.ToInfo.Doctor, msg.ToInfo.Phone, msg.ToInfo.RejectReason], patient.adminName, patient.org)
}

var refId = []
var count = 0
var generateRefferralId = function* (patientId) {
  //* 生成转诊单号
  var info = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [], 'returnNextReferralIdAndTime', patient.adminName, patient.org)
  var s = info.indexOf('&')
  var message = {
    referalId: info.substr(0,s),
    date: info.substr(s+1)
  }
  return message
}


var querySendReferrals = function* (hospitalId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [hospitalId], 'queryReferralsAsSenderByHospitalId', patient.adminName, patient.org)
  return Case
}

var queryReceiveReferrals = function* (hospitalId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [hospitalId], 'queryReferralsAsSenderByHospitalId', patient.adminName, patient.org)
  return Case
}

var queryReferrals = function* (msg) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [msg.referralId, msg.hospitalId], 'queryReferralByReferralIdAndHospitalId', patient.adminName, patient.org)
  return Case
}

var queryReferralsByPatientId = function* (patientId) {
  const Referrals = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [patientId], 'queryRefferalsByPatientId', patient.adminName, patient.org)
  return Referrals
}

var queryReferralByreferralId = function* (referralId) {
  const Referrals = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [referralId, "hospital01"], 'queryReferralByReferralIdAndHospitalId', patient.adminName, patient.org)
  return Referrals
}
var queryReferralProfileInfoAsReceiverByHospitalId = function* (hospitalId) {
    const Referrals = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [hospitalId], 'queryReferralsAsReceiverByHospitalId', patient.adminName, patient.org)
    return Referrals
    }
module.exports = {
  generateReferralProfile,
  querySendReferrals,
  queryReceiveReferrals,
  queryReferrals,
  generateRefferralId,
  ReferralReturn,
  queryReferralsByPatientId,
  queryReferralByreferralId,
  queryReferralProfileInfoAsReceiverByHospitalId
}
