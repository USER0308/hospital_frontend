const authA = require('../controllers/adminSign')
const authD = require('../controllers/doctorSign')
const infoOfDoc = require('../controllers/doctorDashbord')
const router = require('koa-router')()

// For admin to build connect
router.get('/admin', authA.buildConnect)
// For admin to login
router.post('/admin', authA.postAdminAuth)
// For doctor to build connect
router.get('/doctor', authD.buildConnect)
// For doctor to login
router.post('/doctor', authD.postDoctorAuth)
// Load in doctorDashboard
router.get('/doctorDash/:id', infoOfDoc.getMedicalLogs, infoOfDoc.getTransactions)
module.exports = router
