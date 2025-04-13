const { Cicilan } = require('../../../models');

async function getCicilan() {
  return Cicilan.find({});
}

async function createCicilan(nama, jumlahPembayaran, tenor, kategori, sisaCicilan, tanggalJatuhTempo) {
  return Cicilan.create({
    nama,
    jumlahPembayaran,
    tenor,
    kategori,
    sisaCicilan,
    tanggalJatuhTempo: new Date(tanggalJatuhTempo),
  });
}

module.exports = {
  getCicilan,
  createCicilan,
};