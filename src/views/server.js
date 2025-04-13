const express = require('express');
const path = require('path');
const axios = require('axios'); // Untuk komunikasi dengan backend API

const app = express();
const API_URL = 'http://localhost:3000/pengeluaran'; // Sesuaikan dengan URL backend Anda

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Dashboard',
    header: 'Selamat Datang',
    body: '<p>Sistem Manajemen Pengeluaran</p>'
  });
});

// Ambil data dari backend API
app.get('/pengeluaran', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.render('pengeluaran', { 
      pengeluaran: response.data,
      error: null
    });
  } catch (err) {
    res.render('pengeluaran', {
      pengeluaran: [],
      error: 'Gagal memuat data'
    });
  }
});

// Form tambah data
app.get('/pengeluaran/tambah', (req, res) => {
  res.render('tambah', { error: null });
});

// Proses tambah data
app.post('/pengeluaran', async (req, res) => {
  try {
    await axios.post(API_URL, req.body);
    res.redirect('/pengeluaran');
  } catch (err) {
    res.render('tambah', {
      error: err.response?.data?.message || 'Gagal menyimpan data'
    });
  }
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});