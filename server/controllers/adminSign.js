const jwt = require('koa-jwt')
const network = require('composer-client')

var client = new network.BusinessNetworkConnection()

const buildConnect = function* () {
  return client.connect('connection.json', 'org-acme-biznet', 'admin', 'adminpw')
  .then(function (businessNetworkDefinition) {
    console.log('admin connect good')
  })
}

const postAdminAuth = function* () {
  const data = this.request.body
  const hospitals = {
    user1: {
      Id: 'hospital01',
      password: 'hospital01pw'
    },
    user2: {
      Id: 'hospital02',
      password: 'hospital02pw'
    }
  }
  if (hospitals.user1.Id === data.name) {
    if (hospitals.user1.password !== data.password) {         // passwd not right
      this.body = {
        success: false,
        info: '密码错误!'
      }
    } else {                                           // messages pass to userToken
      const userToken = {
        name: '人民医院',
        Id: hospitals.user1.Id
      }
      const secret = 'blockchainForHealthcare'                    // config the cryptoKey
      const token = jwt.sign(userToken, secret)        // sign the token
      this.body = {
        success: true,
        token: token                                   // return the token
      }
    }
  } else if (hospitals.user2.Id === data.name) {
    if (hospitals.user2.password !== data.password) {         // passwd not right
      this.body = {
        success: false,
        info: '密码错误!'
      }
    } else {                                           // messages pass to userToken
      const userToken = {
        name: '华工校医院',
        Id: hospitals.user2.Id
      }
      const secret = 'blockchainForHealthcare'                    // config the cryptoKey
      const token = jwt.sign(userToken, secret)        // sign the token
      this.body = {
        success: true,
        token: token                                   // return the token
      }
    }
  } else {
    this.body = {
      success: false,
      info: '账户不存在!'
    }
  }
}

module.exports = {
  buildConnect,
  postAdminAuth
}
