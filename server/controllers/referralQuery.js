const referral = require('../models/referral')
const patient = require('../models/patient')
const hospital = require('../models/hospital')

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

// 请求所有发送的转诊单
const getSendReferrals = function* () {
  const hospitalId = this.params.hospitalId
  const result = yield referral.querySendReferrals(hospitalId)
  this.body = result
}

// 请求所有接收到的转诊单
const getReceiveReferrals = function* () {
  const hospitalId = this.params.hospitalId
  const result = yield referral.queryReceiveReferrals(hospitalId)
  this.body = result
}

// 请求所有接收到的转诊单
const getReferrals = function* () {
  const data = this.request.body
  const msg = {
    referralId: data.referralId,
    hospitalId: data.hospitalId
  }
  const result = yield referral.queryReferrals(msg)
  this.body = result
}

// 请求病人的所有referralInfo
const getReferralsByPatientId = function* () {
  const msg = this.params.patientId
  const referralString = yield referral.queryReferralsByPatientId(msg)
  const patientString = yield patient.queryPatientByPatientId(msg)
  var patientMessage = JSON.parse(patientString)
  var referralMessage = JSON.parse(referralString)
  var HospitalName = null
  var ref
  var con = count(referralMessage)
  for (var i = 0; i < con; i++) {
    if (referralMessage[i].FromInfo.hospitalId === 'hospital01') {
      HospitalName = '人民医院'
    } else {
      HospitalName = '华工校医院'
    }
    ref = {
      'Id': referralMessage[i].Id,
      'State': referralMessage[i].State,
      'Date': referralMessage[i].Date,
      'Name': patientMessage.Name,
      'PIN': patientMessage.PIN,
      'Gender': patientMessage.Gender,
      'Age': patientMessage.Age,
      'Resident': patientMessage.Resident,
      'Phone': patientMessage.Phone,
      'Birthplace': patientMessage.Birthplace,
      'Nationality': patientMessage.Nationality,
      'Occupation': patientMessage.Occupation,
      'FromInfo': {
        'Section': referralMessage[i].FromInfo.Section,
        'HospitalName': HospitalName,
        'Doctor': referralMessage[i].FromInfo.Doctor,
        'Phone': referralMessage[i].FromInfo.Phone,
        'ReferralType': referralMessage[i].ReferralType,
        'RelationDemand': referralMessage[i].RelationDemand,
        'PayWay': referralMessage[i].Payway,
        'IllnessState': referralMessage[i].IllnessState
      },
      'ToInfo': {
        'Section': referralMessage[i].ToInfo.Section,
        'Doctor': referralMessage[i].ToInfo.Doctor,
        'Phone': referralMessage[i].ToInfo.Phone,
        'RejectReason': referralMessage[i].ToInfo.ReasonIfRejected
      }
    }
  }
  this.body = ref
}

//根据转诊单ID查询转诊单
const getReferralByreffralId = function* () {
  const msg = this.params.referralId

  const referralString = yield referral.queryReferralByreferralId(msg)
  var referralMessage = JSON.parse(referralString)
  patientId=referralMessage.PatientId
  const patientString = yield patient.queryPatientByPatientId(patientId)
  var patientMessage = JSON.parse(patientString)

  var HospitalName = null
    if (referralMessage.FromInfo.hospitalId === 'hospital01') {
      HospitalName = '人民医院'
    } else {
      HospitalName = '华工校医院'
    }
    var ref = {
      'Id': referralMessage.Id,
      'State': referralMessage.State,
      'Date': referralMessage.Date,
      'Name': patientMessage.Name,
      'PIN': patientMessage.PIN,
      'PatientId':patientId,
      'Gender': patientMessage.Gender,
      'Age': patientMessage.Age,
      'Resident': patientMessage.Resident,
     'Phone': patientMessage.Phone,
      'Birthplace': patientMessage.Birthplace,
      'Nationality': patientMessage.Nationality,
      'Occupation': patientMessage.Occupation,
      'FromInfo': {
        'Section': referralMessage.FromInfo.Section,
        'HospitalName': HospitalName,
        'Doctor': referralMessage.FromInfo.Doctor,
        'Phone': referralMessage.FromInfo.Phone,
        'ReferralType': referralMessage.ReferralType,
        'RelationDemand': referralMessage.RelationDemand,
        'PayWay': referralMessage.Payway,
        'IllnessState': referralMessage.IllnessState
      },
      'ToInfo': {
        'Section': referralMessage.ToInfo.Section,
        'Doctor': referralMessage.ToInfo.Doctor,
        'Phone': referralMessage.ToInfo.Phone,
        'RejectReason': referralMessage.ToInfo.ReasonIfRejected
      }
    }
  this.body = ref
}

const createReferralProfile = function* () {
  const patientId = this.params.patientId
  const seqInfo =yield referral.generateRefferralId(patientId)
  const patientString = yield patient.queryPatientByPatientId(patientId)
  var msg = JSON.parse(patientString)
  var ref = {
    'Id': seqInfo.referalId,
    'State': "undeal",
    'Date': seqInfo.date,
    'Name': msg.Name,
    'PIN': msg.PIN,
    'PatientId': patientId,
    'Gender': msg.Gender,
    'Age': msg.Age,
    'Resident': msg.Resident,
    'Phone': msg.Phone,
    'Birthplace': msg.Birthplace,
    'Nationality': msg.Nationality,
    'Occupation': msg.Occupation,
    'FromInfo': {
      'Section': null,
      'HospitalName': null,
      'Doctor': null,
      'Phone': null,
      'ReferralType': null,
      'RelationDemand': null,
      'PayWay': null,
      'IllnessState': null
    },
    'ToInfo': {
      'Section': null,
      'Doctor': null,
      'Phone': null,
      'RejectReason': null
    }
  }
  this.body = ref
}
const getReferralsAsReceiverByHospitalId = function* () {
  const msg = this.params.hospitalId
  const result = yield referral.queryReferralProfileInfoAsReceiverByHospitalId(msg)
  const referralsTodeal = JSON.parse(result)
  const referralsDealed = JSON.parse(result)    // 得到Referral
  let backReferrals = {
    'todealReferralProfileInfo': null,
    'dealedReferralProfileInfo': null
  }
  var con1 = count(referralsTodeal)
  var con2 = count(referralsDealed)
  for (var i = 0; i < con1; i++) {
    var state = referralsTodeal[i].State
    if (state !== 'undeal') {
      referralsTodeal.splice(i, 1)
      i--
      con1--
    }
  }
  for (var j = 0; j < con2; j++) {
    state = referralsDealed[j].State
    if (state === 'undeal') {
      referralsDealed.splice(j, 1)
      j--
      con2--
    }
  }                                                 // 筛选出referral
  var ref = {
    'Id': '20171010001',
    'State': 'undeal',
    'Date': '20171012',
    'PatientId': '85574',
    'Name': '王建国',
    'PIN': '142703199701012232',
    'Gender': '男',
    'Resident': '广东省广州市番禹区番禺小区4栋502号',
    'Phone': '13825646512',
    'Age': 20,
    'Birthplace': '陕西省忻州市五寨县',
    'Nationality': '汉',
    'Occupation': '电工',
    'FromInfo': {
      'Section': '内科',
      'HospitalName': '仁和医院',
      'Doctor': '张伟',
      'Phone': '13654681827',
      'ReferralType': '治疗重症',
      'RelationDemand': '要王伟专家负责',
      'PayWay': '医保',
      'IllnessState': '长期高烧不退，各种抗生素均无效'
    },
    'ToInfo': {
      'Section': '内科',
      'Doctor': '王伟',
      'Phone': '13427534816',
      'RejectReason': '王伟专家要出差'
    }
  }
  var referralInfoTodeal = []
  var referralInfoDealed = []
  var patientResult
  var whichPatient
  var hospitalResult
  var whichHospital
  for (i = 0; i < con1; i++) {
    patientResult = yield patient.queryPatientByPatientId(referralsTodeal[i].PatientId)
    whichPatient = JSON.parse(patientResult)
    hospitalResult = yield hospital.queryHospitalByHospitalId(referralsTodeal[i].ToInfo.HospitalId)
    whichHospital = JSON.parse(hospitalResult)
    ref = {
      'Id': referralsTodeal[i].Id,
      'State': referralsTodeal[i].State,
      'Date': referralsTodeal[i].Date,
      'Name': whichPatient.Name,
      'PatientId': referralsTodeal[i].PatientId,
      'PIN': whichPatient.PIN,
      'Gender': whichPatient.Gender,
      'Age': whichPatient.Age,
      'Resident': whichPatient.Resident,
      'Phone': whichPatient.Phone,
      'Birthplace': whichPatient.Birthplace,
      'Nationality': whichPatient.Nationality,
      'Occupation': whichPatient.Occupation,
      'FromInfo': {
        'Section': referralsTodeal[i].FromInfo.Section,
        'HospitalName': whichHospital.Name,
        'Doctor': referralsTodeal[i].FromInfo.Doctor,
        'Phone': referralsTodeal[i].FromInfo.Phone,
        'ReferralType': referralsTodeal[i].ReferralType,
        'RelationDemand': referralsTodeal[i].RelationDemand,
        'PayWay': referralsTodeal[i].PayWay,
        'IllnessState': referralsTodeal[i].IllnessState
      },
      'ToInfo': {
        'Section': referralsTodeal[i].ToInfo.Section,
        'Doctor': referralsTodeal[i].ToInfo.Doctor,
        'Phone': referralsTodeal[i].ToInfo.Phone,
        'RejectReason': referralsTodeal[i].ToInfo.RejectReason
      }
    }
    referralInfoTodeal.push(ref)
  }
  for (i = 0; i < con2; i++) {
    patientResult = yield patient.queryPatientByPatientId(referralsDealed[i].PatientId)
    whichPatient = JSON.parse(patientResult)
    hospitalResult = yield hospital.queryHospitalByHospitalId(referralsDealed[i].ToInfo.HospitalId)
    whichHospital = JSON.parse(hospitalResult)
    ref = {
      'Id': referralsDealed[i].Id,
      'State': referralsDealed[i].State,
      'Date': referralsDealed[i].Date,
      'Name': whichPatient.Name,
      'PatientId': referralsDealed[i].PatientId,
      'PIN': whichPatient.PIN,
      'Gender': whichPatient.Gender,
      'Age': whichPatient.Age,
      'Resident': whichPatient.Resident,
      'Phone': whichPatient.Phone,
      'Birthplace': whichPatient.Birthplace,
      'Nationality': whichPatient.Nationality,
      'Occupation': whichPatient.Occupation,
      'FromInfo': {
        'Section': referralsDealed[i].FromInfo.Section,
        'HospitalName': whichHospital.Name,
        'Doctor': referralsDealed[i].FromInfo.Doctor,
        'Phone': referralsDealed[i].FromInfo.Phone,
        'ReferralType': referralsDealed[i].ReferralType,
        'RelationDemand': referralsDealed[i].RelationDemand,
        'PayWay': referralsDealed[i].PayWay,
        'IllnessState': referralsDealed[i].IllnessState
      },
      'ToInfo': {
        'Section': referralsDealed[i].ToInfo.Section,
        'Doctor': referralsDealed[i].ToInfo.Doctor,
        'Phone': referralsDealed[i].ToInfo.Phone,
        'RejectReason': referralsDealed[i].ToInfo.RejectReason
      }
    }
    referralInfoDealed.push(ref)
  }
  backReferrals.todealReferralProfileInfo = referralInfoTodeal
  backReferrals.dealedReferralProfileInfo = referralInfoDealed
  this.body = backReferrals
}
module.exports = {
  getSendReferrals,
  getReceiveReferrals,
  getReferrals,
  createReferralProfile,
  getReferralsByPatientId,
  getReferralByreffralId,
  getReferralsAsReceiverByHospitalId
}
