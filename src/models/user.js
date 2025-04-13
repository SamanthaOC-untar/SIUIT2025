module.exports = (db) =>
  db.model(
    'Users',
    db.Schema(
      {
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        full_name: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      }
    )
  );