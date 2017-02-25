'use strict';

const Primus = require('primus.io');
const hydraExpress = require('fwsp-hydra-express');
const http = require('http');

const config = require('./config/config.json');

config.hydraExpress.hydra.servicePort = process.env.PORT || config.hydra.servicePort;
config.hydraExpress.hydra.serviceIP = process.env.IP || config.hydra.serviceIP;

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

var primus = new Primus(server, config.primus);

primus.on('connection', function connection(spark) {
  spark.on('data', function received(data) {
    console.log(spark.id, 'received message:', data);
    spark.write(data);
  });
});

primus.save(__dirname +'/public/js/primus.js', function save(err) {
  if (err) return console.error(err);
});
