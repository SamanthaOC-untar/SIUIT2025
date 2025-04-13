const express = require('express');
const pengeluaranController = require('./pengeluaran-controller');

const router = express.Router();

router.get('/', pengeluaranController.getPengeluaran);
router.post('/', pengeluaranController.createPengeluaran);

module.exports = (app) => {
  app.use('/pengeluaran', router);
};