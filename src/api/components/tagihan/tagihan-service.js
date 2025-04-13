const tagihanRepository = require('./tagihan-repository');

async function getTagihan() {
  return tagihanRepository.getTagihan();
}

async function createTagihan(namaTagihan, jumlahTagihan, tanggalJatuhTempo, kategori, status) {
  return tagihanRepository.createTagihan(
    namaTagihan,
    jumlahTagihan,
    tanggalJatuhTempo,
    kategori,
    status
  );
}

module.exports = {
  getTagihan,
  createTagihan,
};