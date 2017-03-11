const hydraExpress = require('fwsp-hydra-express');
const express = hydraExpress.getExpress();
let api = express.Router();

const classes = require('./classes-data-store');

const HTTP_OK = 200;

/**
 * @description Create the question.
 * @param {function} route handler
 */
api.post('/', (req, res) => {
  if (req.body.className) {
    let className = req.body.className;
    let activeClass = classes.get(className);
    if (activeClass) {
      return hydraExpress.sendResponse(201, res, {
        result: {
          success: true,
          status: 'existing',
          class: activeClass
        }
      });
    }

    activeClass = classes.create(className);
    
    return hydraExpress.sendResponse(HTTP_OK, res, {
      result: {
        success: true,
        status: 'existing',
        class: activeClass
      }
    });
  }

  hydraExpress.sendResponse(400, res, {
    result: {
      success: false, 
      message: 'Please include a className'
    }
  });
});


/**
 * @description Provide a form for asking the question.
 * @param {function} route handler
 */
api.get('/', (req, res) => {
  if (req.body.className) {
    let className = req.body.className;
    let activeClass = classes.get(className);
    if (activeClass) {
      return hydraExpress.sendResponse(HTTP_OK, res, {
        result: {
          success: true,
          status: 'existing',
          class: activeClass
        }
      });
    }

    return hydraExpress.sendResponse(HTTP_OK, res, {
      result: {
        success: false,
        message: 'Does not exist'
      }
    });
  }
});

module.exports = api;