const express = require('express');
const tagihanController = require('./tagihan-controller');

const router = express.Router();

router.get('/', tagihanController.getTagihan);
router.post('/', tagihanController.createTagihan);

module.exports = (app) => {
  app.use('/tagihan', router);
};