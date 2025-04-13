const { Pendapatan } = require('../../../models');

async function getPendapatan() {
  return Pendapatan.find({});
}

async function createPendapatan(sumber, jumlah, tanggal, kategori) {
  return Pendapatan.create({
    sumber,
    jumlah,
    tanggal: new Date(tanggal),
    kategori
  });
}

module.exports = {
  getPendapatan,
  createPendapatan
};