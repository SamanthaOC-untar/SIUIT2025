const { errorResponder, errorTypes } = require('../../../core/errors');
const pendapatanService = require('./pendapatan-service');

async function getPendapatan(request, response, next) {
  try {
    const pendapatan = await pendapatanService.getPendapatan();
    return response.status(200).json(pendapatan);
  } catch (error) {
    return next(error);
  }
}

async function createPendapatan(request, response, next) {
  try {
    const { sumber, jumlah, tanggal, kategori } = request.body;

    if (!sumber || !jumlah || !tanggal || !kategori) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Semua field wajib diisi'
      );
    }

    const newPendapatan = await pendapatanService.createPendapatan(
      sumber,
      jumlah,
      tanggal,
      kategori
    );

    return response.status(201).json(newPendapatan);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPendapatan,
  createPendapatan,
};