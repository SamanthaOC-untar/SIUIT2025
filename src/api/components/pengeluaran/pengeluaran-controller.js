const { errorResponder, errorTypes } = require('../../../core/errors');
const pengeluaranService = require('./pengeluaran-service');

//Mengambil data Pengeluaran
async function getPengeluaran(request, response, next) {
  try {
    const pengeluaran = await pengeluaranService.getPengeluaran();
    return response.status(200).json(pengeluaran);
  } catch (error) {
    return next(error);
  }
}

//Menambah data Pengeluaran
async function createPengeluaran(request, response, next) {
  try {
    const { sumber, jumlah, kategori } = request.body;

    // Validasi input
    if (!sumber || !jumlah || !kategori) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Sumber, jumlah, dan kategori wajib diisi'
      );
    }

    const newPengeluaran = await pengeluaranService.createPengeluaran(
      sumber,
      jumlah,
      kategori
    );

    return response.status(201).json(newPengeluaran);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPengeluaran,
  createPengeluaran,
};