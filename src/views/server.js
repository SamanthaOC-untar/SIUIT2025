const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.urlencoded({ extended: true }));

// API Routes (tetap menggunakan backend yang ada)
const apiRoutes = require('../api/routes');
app.use('/api', apiRoutes);

// Frontend Routes
app.get('/', async (req, res) => {
  try {
    // Gunakan axios untuk konsumsi API internal
    const { data } = await axios.get('http://localhost:3000/api/pengeluaran');
    res.render('list', { 
      pengeluaran: data,
      format: {
        rupiah: (num) => 'Rp ' + num.toLocaleString('id-ID'),
        tanggal: (date) => new Date(date).toLocaleDateString('id-ID')
      }
    });
  } catch (error) {
    res.render('list', { 
      pengeluaran: [], 
      error: 'Gagal memuat data'
    });
  }
});

app.get('/tambah', (req, res) => {
  res.render('form', { error: null, data: null });
});

app.post('/tambah', async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/pengeluaran', {
      sumber: req.body.sumber,
      jumlah: req.body.jumlah,
      kategori: req.body.kategori
    });
    res.redirect('/');
  } catch (error) {
    res.render('form', {
      error: error.response?.data?.message || 'Gagal menyimpan data',
      data: req.body
    });
  }
});

app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di http://localhost:${PORT}`);
});