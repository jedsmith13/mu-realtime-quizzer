'use strict';

const hydraExpress = require('fwsp-hydra-express');

const config = require('./config/config.json');
const classesApi = require('./classes');
const classes = require('./data-sources/classes');

// API end points
hydraExpress.init(config.hydraExpress, () => {
    hydraExpress.registerRoutes({
      '/classes': classesApi
    });
  })
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);
  })
  .catch((err) => {
    console.log('err', err);
  });


// MQ end points
const hydra = hydraExpress.getHydra();

hydra.on('message', (message) => {
  // message will be a UMF formatted object
  console.log(`Received object message: ${message.mid}: ${JSON.stringify(message)}`);
  if (message.bdy && message.bdy.className) {
    let response = classes.addTrainer(message.bdy.className, {connectionId: message.frm, via: message.via});
    if (response instanceof Error) {
      hydra.sendReplyMessage(message, hydra.createUMFMessage({
        bdy: {
          success: false,
          message: response.message
        }
      }));
    }
    else {
      hydra.sendReplyMessage(message, hydra.createUMFMessage({
        bdy: {
          success: true,
          message: 'Successfully connected to class.',
          class: response
        }
      }));
      sendClassUpdate(message.bdy.className);
    }
  }

  if (message.bdy && message.bdy.signIn) {
    let response = classes.addClassMember(message.bdy.signIn, {name: message.bdy.name, connectionId: message.frm, via: message.via});
    if (response instanceof Error) {
      hydra.sendReplyMessage(message, hydra.createUMFMessage({
        bdy: {
          success: false,
          message: response.message
        }
      }));
    }
    else {
      hydra.sendReplyMessage(message, hydra.createUMFMessage({
        bdy: {
          success: true,
          message: 'Successfully added to class.'
        }
      }));
      sendClassUpdate(response);
    }
  }
});

const sendClassUpdate = (className) => {
  let currentClass = classes.get(className);
  console.log('Send class update:', currentClass);
  if (currentClass) {
    currentClass.trainers.forEach((trainer) => {
      let message = hydra.createUMFMessage({
        to: trainer.via,
        via: trainer.via,
        frm: hydra.getInstanceID() + '@' + hydra.getServiceName() + ':/',
        bdy: {
          success: true,
          message: className + ' updated.',
          class: currentClass
        }
      });
      
      console.log('Update message:', message);
      hydra.sendMessage(message).then(result => {
        console.log('Update message success', result);
      }, err => {
        console.error('Update message failure', err);
      });
    });
  }
};
