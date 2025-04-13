const usersRepository = require('./users-repository');
const password = require('../../../utils/password');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function loginUser(email, password) {
  // Mencari user berdasarkan email
  const user = await usersRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Jika login berhasil, kembalikan data user
  return user;
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
