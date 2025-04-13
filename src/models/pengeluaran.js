module.exports = (db) =>
  db.model(
    'Pengeluaran',
    db.Schema(
      {
        sumber: String,       // Sumber pengeluaran (misalnya: belanja, tagihan)
        jumlah: Number,       // Jumlah uang yang dikeluarkan
        tanggal: Date,        // Tanggal pengeluaran
        kategori: String,     // Kategori pengeluaran (misalnya: kebutuhan, hiburan)
      },
      {
        timestamps: {
          createdAt: 'dibuatPada',
          updatedAt: 'diperbaruiPada',
        },
      }
    )
  );
