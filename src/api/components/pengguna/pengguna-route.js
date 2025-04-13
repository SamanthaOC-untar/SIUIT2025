const express = require('express');
const penggunaController = require('./pengguna-controller');

const router = express.Router();

router.get('/', penggunaController.getPengguna);
router.post('/', penggunaController.createPengguna);

module.exports = (app) => {
  app.use('/pengguna', router);
};