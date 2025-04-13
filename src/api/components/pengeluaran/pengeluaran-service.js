const pengeluaranRepository = require('./pengeluaran-repository');

async function getPengeluaran() {
  return pengeluaranRepository.getPengeluaran();
}

async function createPengeluaran(sumber, jumlah, kategori) {
  return pengeluaranRepository.createPengeluaran(sumber, jumlah, kategori);
}

module.exports = {
  getPengeluaran,
  createPengeluaran,
};