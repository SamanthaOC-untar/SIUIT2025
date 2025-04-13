const express = require('express');
const app = express();
const path = require('path');

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Route contoh
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'SIUIT Home',
    header: 'Selamat Datang',
    body: '<p>Sistem Pencatatan Terintegrasi</p>' 
  });
});

app.get('/records', async (req, res) => {
  // Contoh data (ganti dengan query MongoDB)
  const records = await Record.find().sort({ date: -1 });
  res.render('records', { records });
});

app.get('/add-record', (req, res) => {
  res.render('add-record');
});

app.listen(3000, () => console.log('Server running on port 3000'));