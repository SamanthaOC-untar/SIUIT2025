const express = require("express");
const router = express.Router();

// Import route cicilan
const pengeluaranRoutes = require("./components/pengeluaran/pengeluaran-route");
const userRoutes = require("./components/users/users-route");
const pendapatanRoutes = require('./components/pendapatan/pendapatan-route');
const cicilanRoutes = require('./components/cicilan/cicilan-route');
const tagihanRoutes = require('./components/tagihan/tagihan-route'); 

module.exports = router;
module.exports = () => {
  const router = express.Router();

  router.use('/pengeluaran', pengeluaranRoutes());
  // Panggil semua route
  pendapatanRoutes(router);
  pengeluaranRoutes(router); //untuk passing router ke sub-routes
  userRoutes(router);
  cicilanRoutes(router);
  tagihanRoutes(router);


  return router;
};