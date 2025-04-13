const { Pengeluaran } = require('../../../models'); // Ganti path model

async function getPengeluaran() {
  return Pengeluaran.find({});
}

async function createPengeluaran(sumber, jumlah, kategori) {
  return Pengeluaran.create({
    sumber,
    jumlah,
    kategori,
    tanggal: new Date(),
  });
}

module.exports = {
  getPengeluaran,
  createPengeluaran,
};