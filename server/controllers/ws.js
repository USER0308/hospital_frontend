const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server
const sendHospitalwss = new WebSocketServer({port: 4000})
const receiveHospitalwss = new WebSocketServer({port: 5000})
let obj
sendHospitalwss.on('connection', (ws) => {
  console.log('send hospital wss connected')
  // console.log(ws)
  ws.onmessage = function (event) {
    // console.log('ws get message')
    // console.log(event.data)
    // send message to another hospital
    obj = event.data
    ws.send('您已成功提交转诊请求')
    console.log('将data赋值给obj,obj的值是', obj)
  }
})

receiveHospitalwss.on('connection', (ws) => {
  console.log('receive hospital wss connected')
  console.log('在wss2中obj的值是', obj)
  ws.onmessage = function (event) {
// console.log('ws get message')
// console.log(event.data)
// send message to another hospital
    ws.send('这是一条服务器发送给接受转诊的医院的消息')
    ws.send(obj)
  }
})
