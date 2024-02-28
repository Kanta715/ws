'use strict'

const WebSocketServer = require('ws').WebSocketServer

const wss = new WebSocketServer({
  port:           8080,
  clientTracking: true
})

wss.on('connection', socket => {
  console.log('コネクション確立!!!')

  socket.onmessage = (message) => {
    console.group('サーバーがメッセージを受信')
    console.log(message.data)
    console.groupEnd()

    wss.clients.forEach(client => {
      if (client !== socket) {
        client.send(message.data)
      }
    })
  }

  socket.onclose = _ => {
    console.log('Closed...')
  }
})