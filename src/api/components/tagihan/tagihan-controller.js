const { errorResponder, errorTypes } = require('../../../core/errors');
const tagihanService = require('./tagihan-service');

// Mengambil data Tagihan
async function getTagihan(request, response, next) {
  try {
    const tagihan = await tagihanService.getTagihan();
    return response.status(200).json(tagihan);
  } catch (error) {
    return next(error);
  }
}

// Menambah data Tagihan
async function createTagihan(request, response, next) {
  try {
    const { 
      namaTagihan, 
      jumlahTagihan, 
      tanggalJatuhTempo, 
      kategori,
      status 
    } = request.body;

    // Validasi input
    if (!namaTagihan || !jumlahTagihan || !tanggalJatuhTempo || !kategori) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Nama Tagihan, Jumlah Tagihan, Tanggal Jatuh Tempo, dan Kategori wajib diisi'
      );
    }

    const newTagihan = await tagihanService.createTagihan(
      namaTagihan,
      jumlahTagihan,
      tanggalJatuhTempo,
      kategori,
      status
    );

    return response.status(201).json(newTagihan);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTagihan,
  createTagihan,
};