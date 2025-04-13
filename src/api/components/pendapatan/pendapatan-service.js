const pendapatanRepository = require('./pendapatan-repository');

async function getPendapatan() {
  return pendapatanRepository.getPendapatan();
}

async function createPendapatan(sumber, jumlah, tanggal, kategori) {
  return pendapatanRepository.createPendapatan(
    sumber,
    jumlah,
    tanggal,
    kategori
  );
}

module.exports = {
  getPendapatan,
  createPendapatan,
};