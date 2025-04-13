const cicilanRepository = require('./cicilan-repository');

async function getCicilan() {
  return cicilanRepository.getCicilan();
}

async function createCicilan(nama, jumlahPembayaran, tenor, kategori, sisaCicilan, tanggalJatuhTempo) {
  return cicilanRepository.createCicilan(
    nama,
    jumlahPembayaran,
    tenor,
    kategori,
    sisaCicilan,
    tanggalJatuhTempo
  );
}

module.exports = {
  getCicilan,
  createCicilan,
};