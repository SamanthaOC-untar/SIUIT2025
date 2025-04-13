const express = require('express');
const cicilanController = require('./cicilan-controller');

const router = express.Router();

router.get('/', cicilanController.getCicilan);
router.post('/', cicilanController.createCicilan);

module.exports = (app) => {
  app.use('/cicilan', router);
};