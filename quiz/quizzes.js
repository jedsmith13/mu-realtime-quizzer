 require('fwsp-hydra-express');
const express = hydraExpress.getExpress();
let api = express.Router();

const quizzes = require('./quizzes-data-store');

const HTTP_OK = 200;

/**
 * @description Create the question.
 * @param {function} route handler
 */
api.post('/', (req, res) => {
  return hydraExpress.sendResponse(501, res, {});
});


/**
 * @description Provide a form for asking the question.
 * @param {function} route handler
 */
api.get('/', (req, res) => {
  return hydraExpress.sendResponse(501, res, {});
});

module.exports = api;
