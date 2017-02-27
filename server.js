'use strict';

const hydraExpress = require('fwsp-hydra-express');
const http = require('http');
const WebSocket = require('ws');
const uuid = require('uuid-v4')

const config = require('./config/config.json');

hydraExpress.init(config.hydraExpress, () => {
    hydraExpress.registerRoutes({
      '/greeting': require('./greeting')
    });
  })
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);
  })
  .catch((err) => {
    console.log('err', err);
  });

var server = http.createServer(hydraExpress.getExpress());

const wss = new WebSocket.Server({
  server
});

wss.on('connection', function connection(ws) {
  console.log('connected');
  ws.on('message', function incoming(message) {
    let incomingMessage = JSON.parse(message);
    console.log('received:', message);
    
    ws.send(JSON.stringify({
        bdy: {massage: incomingMessage.bdy.message},
        to: incomingMessage.frm,
        mid: uuid(),
        frm: incomingMessage.to,
        ts: new Date(),
        // typ: "message",
        ver: "UMF/1.4.3"
      }));
  });
});

const hydra = hydraExpress.getHydra();

hydra.on('message', function(message) {
  // message will be a UMF formatted object
  console.log(`Received object message: ${message.mid}: ${JSON.stringify(message)}`);

  // to send a reply message here or elsewhere in your service use the `sendReplyMessage` call.
  hydra.sendReplyMessage(message, hydra.createUMFMessage({
    bdy: message.bdy
  }));
});
