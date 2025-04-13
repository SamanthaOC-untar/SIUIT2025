const { errorResponder, errorTypes } = require('../../../core/errors');
const cicilanService = require('./cicilan-service');

// Mengambil data Cicilan
async function getCicilan(request, response, next) {
  try {
    const cicilan = await cicilanService.getCicilan();
    return response.status(200).json(cicilan);
  } catch (error) {
    return next(error);
  }
}

// Menambah data Cicilan
async function createCicilan(request, response, next) {
  try {
    const {
      nama,
      jumlahPembayaran,
      tenor,
      kategori,
      sisaCicilan,
      tanggalJatuhTempo,
    } = request.body;

    // Validasi input
    if (!nama || !jumlahPembayaran || !tenor || !kategori || !sisaCicilan || !tanggalJatuhTempo) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Semua field (nama, jumlahPembayaran, tenor, kategori, sisaCicilan, tanggalJatuhTempo) wajib diisi'
      );
    }

    const newCicilan = await cicilanService.createCicilan(
      nama,
      jumlahPembayaran,
      tenor,
      kategori,
      sisaCicilan,
      tanggalJatuhTempo
    );

    return response.status(201).json(newCicilan);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCicilan,
  createCicilan,
};