const penggunaRepository = require('./pengguna-repository');

async function getPengguna() {
  return penggunaRepository.getPengguna();
}

async function createPengguna(email, kataSandi, namaLengkap) {
  return penggunaRepository.createPengguna(
    email,
    kataSandi,
    namaLengkap
  );
}

module.exports = {
  getPengguna,
  createPengguna,
};