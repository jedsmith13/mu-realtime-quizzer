'use strict';

const hydraExpress = require('fwsp-hydra-express');
const cors = require('cors');

const config = require('./config/config.json');
const quizzesApi = require('./quiz/quizzes');
const quizzes = require('./quiz/quizzes-data-store');

const classServiceName = config.hydraExpressClass.hydra.serviceName;

// API end points
hydraExpress.init(config.hydraExpressQuiz, () => {
        hydraExpress.registerRoutes({
            '/question': quizzesApi
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
        if (message.typ === 'sendQuiz' && message.bdy.className && message.bdy.quizId) {
            return sendQuiz(message, message.bdy.className, message.bdy.quizId);
        }

        if (message.typ === 'recieveAnswer' && message.bdy.quizId && message.bdy.answer) {
            //TODO: extract classMemberId from the frm
            return receiveAnswer(message, message.bdy.quizId, message.frm, message.bdy.answer);
        }

        if (message.typ === 'broadcastResults' && message.bdy.quizId && message.bdy.answer) {
            return broadcastResults(message, message.bdy.quizId, message.bdy.answer);
        }
    }
});

const sendQuiz = (originalMessage, className, quizId) => {
    getClassMembers(className, classMembers => {
        if (classMembers && classMembers.length > 0) {
            const quiz = quizzes.attachClass(quizId, className, classMembers);
            classMembers.forEach(classMember => {
                sendQuestion(classMember, quiz);
            });

            hydra.sendReplyMessage(originalMessage, hydra.createUMFMessage({
                bdy: {
                    success: true,
                    message: 'Successfully added class to quiz and sent question to class members.'
                }
            }));
        }
    });
};

const sendQuestion = (classMember, quiz) => {
    let message = hydra.createUMFMessage({
        to: classMember.via,
        via: classMember.via,
        frm: hydra.getInstanceID() + '@' + hydra.getServiceName() + ':/',
        typ: 'newQuestion',
        bdy: {
            success: true,
            message: 'New question',
            question: quiz.question,
            quizId: quiz.id
        }
    });

    console.log('Sent Question:', message);
    hydra.sendMessage(message);
};

const receiveAnswer = (originalMessage, quizId, classMemberId, answer) => {
    quizzes.addAnswer(quizId, classMemberId, answer);

    hydra.sendReplyMessage(originalMessage, hydra.createUMFMessage({
        bdy: {
            success: true,
            message: 'Successfully submitted your answer.'
        }
    }));

    sendQuizUpdate(quizId);
};

const sendQuizUpdate = (quizId) => {
    const quiz = quizzes.get(quizId);
    getTrainers(quiz.className, trainers => {
        console.log('Send quiz update:', quizId);
        if (quiz) {
            trainers.forEach((trainer) => {
                let message = hydra.createUMFMessage({
                    to: trainer.via,
                    via: trainer.via,
                    frm: hydra.getInstanceID() + '@' + hydra.getServiceName() + ':/',
                    typ: 'quizUpdate',
                    bdy: {
                        success: true,
                        message: 'Quiz answers updated',
                        quiz: quiz
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
    });
};

const getClassMembers = (className, cb) => {
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
        const classMembers = result.bdy.classMembers;
        cb(classMembers);
    }, err => {
        console.error('Request message failure', err);
    });
};

const getTrainers = (className, cb) => {
    let message = hydra.createUMFMessage({
        to: classServiceName + ':/',
        frm: hydra.getInstanceID() + '@' + hydra.getServiceName() + ':/',
        typ: 'requestTrainers',
        bdy: {
            className: className
        }
    });

    console.log('Request message:', message);
    hydra.sendMessage(message).then(result => {
        console.log('Request message success', result);
        const trainers = result.bdy.trainers;
        cb(trainers);
    }, err => {
        console.error('Request message failure', err);
    });
};

const broadcastResults = (originalMessage, quizId, correctAnswer) => {
    const quiz = quizzes.get(quizId);
    if (quiz) {
        if (quiz.classMembers && quiz.classMembers.length > 0) {
            const classMembers = quiz.classMembers;
            classMembers.forEach(classMember => {
                sendCorrectAnswer(classMember, quizId, correctAnswer);
            });
        }
    }
};

const sendCorrectAnswer = (classMember, quizId, correctAnswer) => {
    let message = hydra.createUMFMessage({
        to: classMember.via,
        via: classMember.via,
        frm: hydra.getInstanceID() + '@' + hydra.getServiceName() + ':/',
        typ: 'correctAnswer',
        bdy: {
            success: true,
            message: 'Correct Answer.',
            correctAnswer: correctAnswer,
            quizId: quizId
        }
    });

    console.log('Correct Answer:', message);
    hydra.sendMessage(message);
};