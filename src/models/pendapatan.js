module.exports = (db) =>
  db.model(
    'Pendapatan',
    db.Schema({
      sumber: String,       // Sumber pendapatan (misalnya: gaji, penjualan)
      jumlah: Number,       // Jumlah pendapatan
      tanggal: Date,        // Tanggal pendapatan dicatat
      kategori: String,     // Kategori pendapatan (misalnya: pekerjaan, investasi)
    })
  );