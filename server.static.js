'use strict';

const hydraExpress = require('fwsp-hydra-express');
const express = hydraExpress.getExpress();
const path = require('path');

let api = express.Router();
api.use(express.static(path.join(__dirname, 'public')));

const config = require('./config/config.json');

// API end points
hydraExpress.init(config.hydraExpressStatic, () => {
    hydraExpress.registerRoutes({
      'static': api,
      'trainer': api

    });
  })
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);
  })
  .catch((err) => {
    console.log('err', err);
  });
