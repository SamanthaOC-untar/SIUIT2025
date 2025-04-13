const { Pengguna } = require('../../../models');

async function getPengguna() {
  return Pengguna.find({});
}

async function createPengguna(email, kataSandi, namaLengkap) {
  return Pengguna.create({
    email,
    kataSandi,
    namaLengkap
  });
}

module.exports = {
  getPengguna,
  createPengguna,
};