const { errorResponder, errorTypes } = require('../../../core/errors');
const penggunaService = require('./pengguna-service');

// Mengambil data Pengguna
async function getPengguna(request, response, next) {
  try {
    const pengguna = await penggunaService.getPengguna();
    return response.status(200).json(pengguna);
  } catch (error) {
    return next(error);
  }
}

// Menambah data Pengguna
async function createPengguna(request, response, next) {
  try {
    const { email, kataSandi, namaLengkap } = request.body;

    // Validasi input
    if (!email || !kataSandi || !namaLengkap) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Email, kata sandi, dan nama lengkap wajib diisi'
      );
    }

    const newPengguna = await penggunaService.createPengguna(
      email,
      kataSandi,
      namaLengkap
    );

    return response.status(201).json(newPengguna);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPengguna,
  createPengguna,
};