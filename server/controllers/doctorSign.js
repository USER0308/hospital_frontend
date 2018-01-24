const jwt = require('koa-jwt')
const network = require('composer-client')

var client = new network.BusinessNetworkConnection()

const buildConnect = function* () {
  return client.connect('connetion.json', 'org-acme-biznet', 'admin', 'adminpw')
  .then(function (businessNetworkDefinition) {
    console.log('doctor connect good')
  })
}

const postDoctorAuth = function* () {
  const data = this.request.body
  const userInfo = {
    name: 'doctor',
    password: 'doctorpw'
  }
  if (userInfo.name === data.name) {                              // passwd not right
    if (userInfo.password !== data.password) {
      this.body = {
        success: false,
        info: 'Wrong password!'
      }
    } else {                                    // messages pass to userToken
      const userToken = {
        name: userInfo.name,
        password: userInfo.password
      }
      const secret = 'vue-koa-demo'                      // config the cryptoKey
      const token = jwt.sign(userToken, secret)         // sign the token
      this.body = {
        success: true,
        token: token                                      // return the token
      }
    }
  } else {
    this.body = {
      success: false,
      info: 'Not exists!'
    }
  }
}

module.exports = {
  buildConnect,
  postDoctorAuth
}
