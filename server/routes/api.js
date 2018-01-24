
const router = require('koa-router')()

var channel = require('../controllers/channel')
var install = require('../models/installChaincode.js')
var instantiate = require('../models/instantiateChaincode.js')
var invoke = require('../models/invokeTransaction.js')
var query = require('../models/query.js')
var user = require('../controllers/user')
var patient = require('../controllers/patientQuery')
var referral = require('../controllers/referralQuery')

//* 以下api 与demo关联不大, 未来做开发者界面再搞
// Create Channel
router.post('/channels', channel.createChannel)
// Join Channels
router.post('/channels/:channelName/peers', channel.joinChannel)

//* demo接口
//* API 查询所有病人信息，病人病例
router.get('/patient/queryByHospitalName/:hospitalName', patient.getAllPatient)
router.get('/case/queryByPatientId/:patientId', patient.getCasesByPatientId)
router.get('/referral/send/queryByHospitalId/:hospitalId', referral.getSendReferrals)
router.get('/referral/receive/queryByHospitalId/:hospitalId', referral.getReceiveReferrals)
router.get('/sender/get_undeal_patients/:hospitalName', patient.getNormalPatientAsSender)
router.get('/sender/get_todeal_patients/:hospitalName', patient.getUndealPatientAsSender)
router.get('/sender/get_dealed_patients/:hospitalName', patient.getDealedPatientAsSender)
router.get('/receiver/get_todeal_patients/:hospitalName', patient.getUndealPatientAsReceiver)
router.get('/receiver/get_dealed_patients/:hospitalName', patient.getDealedPatientAsReceiver)
router.post('/referrals', referral.getReferrals)
router.get('/referralInfo/queryByPatientId/:patientId', referral.getReferralsByPatientId)
router.get('/referralInfo/queryReferralByreferralId/:referralId',referral.getReferralByreffralId)//new api by yan
router.get('/referralProfileInfo/queryByHospitalId/:hospitalId', referral.getReferralsAsReceiverByHospitalId)
router.get('/referral/create/:patientId', referral.createReferralProfile)

//* end of demo API

// todo 测试该api
// Register and enroll user
router.post('/users', user.enrollUser)

// todo 移植api到koa上
// Install chaincode on target peers
router.post('/chaincodes', install.installChaincode)
// Instantiate chaincode on target peers
router.post('/channels/:channelName/chaincodes', instantiate.instantiateChaincode)
// Invoke transaction on chaincode on target peers
router.post('/channels/:channelName/chaincodes/:chaincodeName', invoke.invokeChaincode)
// Query
// Query on chaincode on target peers
router.get('/channels/:channelName/chaincodes/:chaincodeName', query.queryChaincode)
//  Query Get Block by BlockNumber
router.get('/channels/:channelName/blocks/:blockId', query.getBlockByNumber)
// Query Get Transaction by Transaction ID
router.get('/channels/:channelName/transactions/:trxnId', query.getTransactionByID)
// Query Get Block by Hash
router.get('/channels/:channelName/blocks', query.getBlockByHash)
// Query for Channel Information
router.get('/channels/:channelName', query.getChainInfo)
// Query to fetch all Installed/instantiated chaincodes
router.get('/chaincodes', query.getInstalledChaincodes)
// Query to fetch channels
router.get('/channels', query.getChannels)
module.exports = router
