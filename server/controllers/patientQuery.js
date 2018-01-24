const patient = require('../models/patient')
const referral = require('../models/referral')

let BackInfo = {
  'patients': null,
  'cases': null
}
function count (obj) {
  var objType = typeof obj
  if (objType === 'string') {
    return obj.length
  } else if (objType === 'object') {
    var objLen = 0
    for (var i in obj) {
      objLen++
    }
    return objLen
  }
  return false
}

// 返回医院下的所有病人
const getAllPatient = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  this.body = result
}

// 返回医院下的所有normal病人
const getNormalPatientAsSender = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  // 去重
  var check = {
    /*
    * Example:
    * patient: 1   (if match patient delete it)
    */
  }
  for (var m = 0; m < con; m++) {
    var patientId = msg[m].Id
    if (patientId in check) {
      msg.splice(m, 1)
      m--
      con--
    } else {
      check[patientId] = 'exist'
    }
  }
  // 处理返回数据
  for (var i = 0; i < con; i++) {
    var hospital = msg[i].State.HospitalName
    if (hospital !== '人民医院') {
      msg.splice(i, 1)
      i--
      con--
    }
  }
  for (var k = 0; k < con; k++) {
    var state = msg[k].State.Referral
    if (state !== 'normal') {
      msg.splice(k, 1)
      k--
      con--
    }
  }
  BackInfo.patients = msg
  this.body = BackInfo
}
// 返回医院下的所有undeal病人
const getUndealPatientAsSender = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  // 去重
  var check = {
    /*
    * Example:
    * patient: 1   (if match patient delete it)
    */
  }
  for (var m = 0; m < con; m++) {
    var patientId = msg[m].Id
    if (patientId in check) {
      msg.splice(m, 1)
      m--
      con--
    } else {
      check[patientId] = 'exist'
    }
  }
  // 处理返回数据
  for (var i = 0; i < con; i++) {
    var hospital = msg[i].State.HospitalName
    if (hospital !== '人民医院') {
      msg.splice(i, 1)
      i--
      con--
    }
  }
  for (var k = 0; k < con; k++) {
    var state = msg[k].State.Referral
    if (state !== 'undeal') {
      msg.splice(k, 1)
      k--
      con--
    }
  }
  BackInfo.patients = msg
  this.body = BackInfo
}
// 返回医院下的所有dealed病人
const getDealedPatientAsSender = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  // 去重
  var check = {
    /*
    * Example:
    * patient: 1   (if match patient delete it)
    */
  }
  for (var m = 0; m < con; m++) {
    var patientId = msg[m].Id
    if (patientId in check) {
      msg.splice(m, 1)
      m--
      con--
    } else {
      check[patientId] = 'exist'
    }
  }
  // 处理返回数据
  for (var i = 0; i < con; i++) {
    var hospital = msg[i].State.HospitalName
    if (hospital !== '人民医院') {
      msg.splice(i, 1)
      i--
      con--
    }
  }
  for (var k = 0; k < con; k++) {
    var state = msg[k].State.Referral
    if (state === 'receive') {
    } else if (state === 'reject') {
    } else {
      msg.splice(k, 1)
      k--
      con--
    }
  }
  BackInfo.patients = msg
  this.body = BackInfo
}

const getUndealPatientAsReceiver = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  // 去重
  var check = {
    /*
    * Example:
    * patient: 1   (if match patient delete it)
    */
  }
  for (var m = 0; m < con; m++) {
    var patientId = msg[m].Id
    if (patientId in check) {
      msg.splice(m, 1)
      m--
      con--
    } else {
      check[patientId] = 'exist'
    }
  }
  // 处理返回数据
  for (var i = 0; i < con; i++) {
    var hospital = msg[i].State.HospitalName
    if (hospital === '人民医院') {
      msg.splice(i, 1)
      i--
      con--
    }
  }
  for (var k = 0; k < con; k++) {
    var state = msg[k].State.Referral
    if (state !== 'undeal') {
      msg.splice(k, 1)
      k--
      con--
    }
  }
  BackInfo.patients = msg
  this.body = BackInfo
}

const getDealedPatientAsReceiver = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  // 去重
  var check = {
    /*
    * Example:
    * patient: 1   (if match patient delete it)
    */
  }
  for (var m = 0; m < con; m++) {
    var patientId = msg[m].Id
    if (patientId in check) {
      msg.splice(m, 1)
      m--
      con--
    } else {
      check[patientId] = 'exist'
    }
  }
  // 处理返回数据
  for (var i = 0; i < con; i++) {
    var hospital = msg[i].State.HospitalName
    if (hospital === '人民医院') {
      msg.splice(i, 1)
      i--
      con--
    }
  }
  for (var k = 0; k < con; k++) {
    var state = msg[k].State.Referral
    if (state === 'receive') {
    } else if (state === 'reject') {
    } else {
      msg.splice(k, 1)
      k--
      con--
    }
  }
  BackInfo.patients = msg
  this.body = BackInfo
}

// 返回病人的病例
const getCasesByPatientId = function* () {
  const patientId = this.params.patientId
  const result = yield patient.queryCasesByPatientId(patientId)
  var res = JSON.parse(result)
  BackInfo.cases = res
  this.body = BackInfo
}
// 返回病人信息
const getPatientInfoByPatientId = function* () {
  const patientId = this.params.patientId
  const result = yield patient.queryPatientByPatientId(patientId)
  this.body = result
}
// 返回生成的转诊单
const getReferralByPatientId = function* () {
  const patientId = this.params.patientId
  const result = yield referral.generateReferralByPatientId(patientId)
  this.body = result
}

module.exports = {
  getAllPatient,
  getCasesByPatientId,
  getPatientInfoByPatientId,
  getReferralByPatientId,
  getNormalPatientAsSender,
  getUndealPatientAsSender,
  getDealedPatientAsSender,
  getDealedPatientAsReceiver,
  getUndealPatientAsReceiver
}
