'use strict';

const hydraExpress = require('fwsp-hydra-express');

const config = require('./config/config.json');
const quizzesApi = require('./quiz/quizzes');
const quizzes = require('./quiz/quizzes-data-store');

const classServiceName = config.hydraExpressClass.hydra.serviceName;

// API end points
hydraExpress.init(config.hydraExpressQuiz, () => {
    hydraExpress.registerRoutes({
      '/quizzes': quizzesApi
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
});

const sendQuiz = (className, quiz) => {
  let message = hydra.createUMFMessage({
    to: classServiceName + ':/',
    frm: hydra.getInstanceID() + '@' + hydra.getServiceName() + ':/',
    typ: 'requestClassMembers',
    bdy: {
      className: className
    }
  });

  console.log('Request message:', message);
  hydra.sendMessage(message).then(result => {
    console.log('Request message success', result);
  }, err => {
    console.error('Request message failure', err);
  });
};
