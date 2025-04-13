// src/api/components/pengeluaran/pengeluaran-page-controller.js

async function showPengeluaranPage(request, response) {
  try {
    return response.render('pengeluaran'); // Render file pengeluaran.ejs
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).send('Internal Server Error');
  }
}

module.exports = {
  showPengeluaranPage,
};