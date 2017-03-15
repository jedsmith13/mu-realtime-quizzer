'use strict';

const hydraExpress = require('fwsp-hydra-express');
const cors = require('cors');

const config = require('./config/config.json');
const classesApi = require('./class/classes');
const classes = require('./class/classes-data-store');

// API end points
hydraExpress.init(config.hydraExpressClass, 'v1', () => {
        hydraExpress.registerRoutes({
            '/classes': classesApi
        });
    }, () => {
        let app = hydraExpress.getExpressApp();
        app.use(cors());
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
    if (message.typ) {
        if (message.typ === 'requestClassMembers' && message.bdy.className) {
            return getClassMembers(message, message.bdy.className);
        }

        if (message.typ === 'requestTrainers' && message.bdy.className) {
            return getTrainers(message, message.bdy.className);
        }
    }

    if (message.bdy && message.bdy.className) {
        return addTrainer(message, message.bdy.className);
    }

    if (message.bdy && message.bdy.signIn) {
        return addClassMember(message, message.bdy.signIn);
    }

});

const getClassMembers = (originalMessage, className) => {
    const response = classes.classMembers.get(className);
    if (response instanceof Error) {
        sendError(originalMessage, response);
    } else {
        hydra.sendReplyMessage(originalMessage, hydra.createUMFMessage({
            bdy: {
                success: true,
                message: 'Found Class.',
                classMembers: response
            }
        }));
    }
};

const getTrainers = (originalMessage, className) => {
    const response = classes.trainers.get(className);
    if (response instanceof Error) {
        sendError(originalMessage, response);
    } else {
        hydra.sendReplyMessage(originalMessage, hydra.createUMFMessage({
            bdy: {
                success: true,
                message: 'Found Class.',
                trainers: response
            }
        }));
    }
};

const addTrainer = (originalMessage, className) => {
    const response = classes.trainers.add(className, {
        connectionId: originalMessage.frm,
        via: originalMessage.via
    });
    if (response instanceof Error) {
        sendError(originalMessage, response);
    } else {
        hydra.sendReplyMessage(originalMessage, hydra.createUMFMessage({
            bdy: {
                success: true,
                message: 'Successfully connected to class.',
                class: response
            }
        }));
        sendClassUpdate(originalMessage.bdy.className);
    }
};

const addClassMember = (originalMessage, signIn) => {
    const response = classes.classMembers.add(signIn, {
        name: originalMessage.bdy.name,
        connectionId: originalMessage.frm,
        via: originalMessage.via
    });
    if (response instanceof Error) {
        sendError(originalMessage, response);
    } else {
        hydra.sendReplyMessage(originalMessage, hydra.createUMFMessage({
            bdy: {
                success: true,
                message: 'Successfully added to class.'
            }
        }));
        sendClassUpdate(response);
    }
};

const sendClassUpdate = (className) => {
    const currentClass = classes.get(className);
    const trainers = classes.trainers.get(className);

    console.log('Send class update:', currentClass);
    if (currentClass) {
        trainers.forEach((trainer) => {
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

const sendError = (originalMessage, error) => {
    hydra.sendReplyMessage(originalMessage, hydra.createUMFMessage({
        bdy: {
            success: false,
            message: error.message
        }
    }));
}