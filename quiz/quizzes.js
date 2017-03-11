const hydraExpress = require('fwsp-hydra-express');
const express = hydraExpress.getExpress();
let api = express.Router();

const quizzes = require('./quizzes-data-store');

const HTTP_OK = 200;

/**
 * @description Create the question.
 * @param {function} route handler
 */
api.post('', (req, res) => {
    const question = quizzes.create(req.body);
    return hydraExpress.sendResponse(201, res, {
        result: {
            success: true,
            status: 'existing',
            quiz: question
        }
    });
});


/**
 * @description See all the questions.
 * @param {function} route handler
 */
api.get('', (req, res) => {
    const questions = quizzes.get();
    return hydraExpress.sendResponse(200, res, {
        result: {
            success: true,
            status: 'existing',
            quizzes: questions
        }

    });
});

/**
 * @description See the question.
 * @param {function} route handler
 */
api.get('/:id', (req, res) => {
    const question = quizzes.get(req.param.id);
    return hydraExpress.sendResponse(200, res, {
        result: {
            success: true,
            status: 'existing',
            quiz: question
        }
    });
});
module.exports = api;
