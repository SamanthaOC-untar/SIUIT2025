const { Tagihan } = require('../../../models');

async function getTagihan() {
  return Tagihan.find({});
}

async function createTagihan(namaTagihan, jumlahTagihan, tanggalJatuhTempo, kategori, status) {
  return Tagihan.create({
    namaTagihan,
    jumlahTagihan,
    tanggalJatuhTempo: new Date(tanggalJatuhTempo),
    kategori,
    status
  });
}

module.exports = {
  getTagihan,
  createTagihan,
};