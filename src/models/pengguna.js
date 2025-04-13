module.exports = (db) =>
  db.model(
    'Pengguna',
    db.Schema(
      {
        email: { type: String, required: true, unique: true },
        kataSandi: { type: String, required: true },
        namaLengkap: { type: String, required: true },
      },
      { timestamps: true } // otomatis menambahkan dibuatPada & diperbaruiPada
    )
  );
