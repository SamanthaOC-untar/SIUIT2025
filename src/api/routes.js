const express = require("express");

// Sesuaikan nama variabel import dengan file route pengeluaran
const pengeluaranRoutes = require("./components/pengeluaran/pengeluaran-route");
const userRoutes = require("./components/users/users-route");

module.exports = () => {
  const app = express.Router();

  // Panggil fungsi route dengan benar
  pengeluaranRoutes(app); // Menggunakan variabel `pengeluaranRoutes`
  userRoutes(app);

  return app;
};

