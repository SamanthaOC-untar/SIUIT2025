const { Users } = require('../../../models');
const { hashPassword } = require('../../../utils/password');

async function loginUser(email, password) {
  // Cari user berdasarkan email
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Cek apakah password cocok
  hashPassword(password, user.password);
  if (!passwordMatched(password, user.password)) {
    throw new Error('Invalid email or password');
  }

  // Jika valid, kembalikan user
  return user;
}

async function getUsers() {
  return Users.find({});
}

async function getUser(id) {
  return Users.findById(id);
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(email, password, fullName) {
  return Users.create({ email, password, fullName });
}

async function updateUser(id, email, fullName) {
  return Users.updateOne({ _id: id }, { $set: { email, fullName } });
}

async function changePassword(id, password) {
  return Users.updateOne({ _id: id }, { $set: { password } });
}

async function deleteUser(id) {
  return Users.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  loginUser
};
