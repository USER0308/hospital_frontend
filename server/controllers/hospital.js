var referral = function (msg) {
  const genReferral = require('../models/referral')
  const hospital = require('../models/hospital')
  const WebSocket = require('ws')
  // const webSocket = require('./')
  if (msg.includes('@')) {
    return
  }
  if (!msg) {
    return
  }
  var message = JSON.parse(msg)
  if (message.operation === 'send') {
    //hospital.queryHospitalByHospitalName(message.referralProfile.FromInfo.HospitalName).then((hospitalInfo) => {
      // 建立与目标医院的webSocket连接
      //* 在区块链中生成转诊单
      let attrs = {
        Id: message.referralProfile.Id,
        State: 'undeal',
        PatientId: message.referralProfile.PatientId,
        ReferralType: message.referralProfile.FromInfo.ReferralType,
        RelationDemand: message.referralProfile.FromInfo.ReferralType,
        PayWay: message.referralProfile.FromInfo.PayWay,
        IllnessState: message.referralProfile.FromInfo.IllnessState,
        FromInfo: {
          HospitalId: 'hospital01',
          Section: message.referralProfile.FromInfo.Section,
          Doctor: message.referralProfile.FromInfo.Doctor,
          Phone: message.referralProfile.FromInfo.Phone
        },
        ToInfo: {
          HospitalId: 'hospital02',
          Section: message.referralProfile.ToInfo.Section,
          Doctor: message.referralProfile.ToInfo.Doctor,
          Phone: message.referralProfile.ToInfo.Phone
        }
      }
      genReferral.generateReferralProfile(attrs).then((res) => {
        var h = new WebSocket('ws://' + '192.168.98.129:8889' + '/referral/host')
        // 发送信息

        var sendmsg = {
          operation: 'send',
          patientId: message.patientId,
          referralProfile: message.referralProfile
        }
        this.ws.referralMsg = sendmsg
        h.on('open', function open () {
          h.send(JSON.stringify(sendmsg))
        })
        var wss = this.wss
        h.on('message', function incoming (data) {
          var message = JSON.parse(data)
          if (message.operation === 'accept' || message.operation === 'reject') {
            var reply = {
              operation: message.operation,
              referralProfile: message.referralProfile
            }
            wss.sendMessage('/referral', JSON.stringify(reply))
          }
        })
      })

      // 接受返回信息
    //})
  }
  if (message.operation === 'accept' || message.operation === 'reject') {
    // 若使用fabric请去掉注释
    // 同意转诊
    let attrs = {
      Id: message.referralProfile.Id,
      State: message.operation,
      ToInfo: {
        HospitalId: 'hospital01',
        Section: message.referralProfile.ToInfo.Section,
        Doctor: message.referralProfile.ToInfo.Doctor,
        Phone: message.referralProfile.ToInfo.Phone,
        RejectReason: message.referralProfile.ToInfo.RejectReason
      }
    }
    const genReferral = require('../models/referral')
    genReferral.ReferralReturn(attrs).then((res) => {
      var reply = {
        operation: message.operation,
        referralProfile: message.referralProfile
      }
      this.wss.sendMessage('/referral/host', JSON.stringify(reply))
    })
    // })
  }
}

var referralHost = function (msg) {
  if (!msg) {
    return
  }
  var message = JSON.parse(msg)
  if (message.operation === 'send') {
    var reply = {
      operation: 'receive',
      patientId: message.patientId,
      referralProfile: message.referralProfile

    }
    this.wss.sendMessage('/referral', JSON.stringify(reply))
  }
}

module.exports = {
  referral,
  referralHost
}
