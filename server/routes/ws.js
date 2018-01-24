const hospital = require('../controllers/hospital')

var routers = {
  '/referral': hospital.referral,
  '/referral/host': hospital.referralHost
}

module.exports = routers
