
const medicalLogs = require('../models/medicalLogList.js')
const transactions = require('../models/transactionList')

const getMedicalLogs = function* () { // get all medicalLogs that need
  const id = this.params.id // 获取url里传过来的参数里的id
  const result = yield medicalLogs.getMedicalLogsById(id)  // get medical logs of certain doctor through id
  console.log('getMedicalLog ok')
  this.body = result
}
const getTransactions = function* () { // get all transactions boardcast here
  const id = this.params.id // get id through url
  const result = yield transactions.getTodolistById(id)  // get transactions of certain doctor through id
  this.body = result
}

module.exports = {
  getMedicalLogs,
  getTransactions
}
