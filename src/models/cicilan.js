module.exports = (db) =>
  db.model(
    'Cicilan',
    db.Schema({
      nama: String,           // Nama cicilan (misalnya: Kredit Motor, KPR)
      jumlahPembayaran: Number, // Jumlah yang dibayarkan per cicilan
      tenor: Number,          // Tenor cicilan (misalnya: jumlah bulan)
      kategori: String,       // Kategori cicilan (misalnya: kendaraan, rumah)
      sisaCicilan: Number,    // Sisa total cicilan yang harus dibayar
      tanggalJatuhTempo: Date, // Tanggal jatuh tempo cicilan
    })
  );