module.exports = (db) =>
  db.model(
    'Tagihan',
    db.Schema({
      namaTagihan: String,       // Nama tagihan (misalnya: Listrik, Internet)
      jumlahTagihan: Number,     // Jumlah tagihan yang harus dibayar
      tanggalJatuhTempo: Date,   // Tanggal jatuh tempo tagihan
      kategori: String,          // Kategori tagihan (misalnya: utilitas, langganan)
      status: {                  // Status pembayaran tagihan (misalnya: belum dibayar, dibayar)
        type: String,
        enum: ['belum dibayar', 'dibayar'],
        default: 'belum dibayar',
      },
    })
  );