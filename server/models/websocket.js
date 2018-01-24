const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

function createWebSocketServer (server) {
  // create websocket server instance
  let wss = new WebSocketServer({
    server: server
  })
  // 保存连接的ws
  wss.connections = {}
  // 保存路由,具体格式
  /*
    url: {
      message: f1, //接受到message时调用的函数
    }
  *
  */
  wss.router = {}
  // 建立连接
  wss.on('connection', function (ws, req) {
    console.log('connected')
    // router
    for (let url in wss.router) {
      let fs = wss.router[url]
      if (req.url === url) {
         // 记录ws
        wss.connections[url] = ws
        // 注册函数
        ws.on('message', fs.message.bind({
          ws: ws,
          wss: wss
        }))
      }
    }
  })
  // 注册router, 对应url调用相应的函数
  wss.routerRegister = function (url, messageFunction) {
    if (wss.router[url] == null) {
      wss.router[url] = {
        message: messageFunction
      }
    } else {
      wss.router[url].message = messageFunction
    }
  }
// 批量注册路由
  wss.routes = function (routers) {
    let urls = Object.keys(routers)
    for (let url of urls) {
      wss.routerRegister(url, routers[url])
    }
  }
/* 向对应url连接的客户端发送信息
ex: 向连接到服务器/referral/地址下的客户发送信息
*/
  wss.sendMessage = function (url, message) {
    var w = wss.connections[url]
    w.send(message)
  }
  console.log('WebSocketServer was attached.')
  return wss
}
module.exports = createWebSocketServer
