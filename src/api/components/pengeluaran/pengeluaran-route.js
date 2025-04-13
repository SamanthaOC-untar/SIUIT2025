const express = require('express');
const pengeluaranController = require('./pengeluaran-controller');

const router = express.Router();

router.get('/', pengeluaranController.getPengeluaran);
router.post('/', pengeluaranController.createPengeluaran);

module.exports = () => {
  const router = require('express').Router();
  router.get('/', (req,res) => {
    res.send('Ini endpoint GET /pengeluaran');
  });

  return router;
};