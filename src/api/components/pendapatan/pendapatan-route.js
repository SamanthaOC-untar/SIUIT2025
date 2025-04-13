const express = require('express');
const pendapatanController = require('./pendapatan-controller');

const router = express.Router();

router.get('/', pendapatanController.getPendapatan);
router.post('/', pendapatanController.createPendapatan);

module.exports = (app) => {
  app.use('/pendapatan', router);
};