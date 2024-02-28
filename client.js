'use strict'

const WebSocket = require('ws').WebSocket
const clientId  = process.argv[2] ?? Math.random()

const ws = new WebSocket(
  'ws://localhost:8080',
  {
    perMessageDeflate: true
  }
)
ws.onmessage = (message) => {
  console.group(`クライアント（${clientId}）がメッセージを受信`)
  console.log(message.data)
  console.groupEnd()
}
ws.onopen = _ => {
  console.log(`クライアントID: ${clientId}`)

  setTimeout(_ => {
    ws.send(`クライアントID = ${clientId} のメッセージ`)
  }, 2000)

  setTimeout(_ => {
    ws.send(`クライアントID = ${clientId} のメッセージ2`)
  }, 5000)
}
