const express = require("express");

// Import route cicilan
const pengeluaranRoutes = require("./components/pengeluaran/pengeluaran-route");
const userRoutes = require("./components/users/users-route");
const pendapatanRoutes = require('./components/pendapatan/pendapatan-route');
const cicilanRoutes = require('./components/cicilan/cicilan-route');
const tagihanRoutes = require('./components/tagihan/tagihan-route'); 
const penggunaRoutes =  require('./components/pengguna/pengguna-route');

module.exports = () => {
  const app = express.Router();

  // Panggil semua route
  pendapatanRoutes(app);
  pengeluaranRoutes(app);
  userRoutes(app);
  cicilanRoutes(app);
  tagihanRoutes(app);
  penggunaRoutes(app); // Tambahkan ini

  return app;
};