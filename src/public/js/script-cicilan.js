// script-cicilan.js (untuk halaman Cicilan)
document.addEventListener('DOMContentLoaded', () => {
  // Handle form tambah cicilan
  const formCicilan = document.getElementById('formCicilan');
  if (formCicilan) {
    formCicilan.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        nama: e.target.nama.value,
        jumlahPembayaran: parseInt(e.target.jumlahPembayaran.value),
        tenor: parseInt(e.target.tenor.value),
        kategori: e.target.kategori.value,
        sisaCicilan: parseInt(e.target.sisaCicilan.value),
        tanggalJatuhTempo: e.target.tanggalJatuhTempo.value,
      };

      try {
        const response = await fetch('/cicilan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          window.location.href = '/cicilan'; // Redirect ke halaman utama cicilan
        } else {
          const error = await response.json();
          showError(error.message);
        }
      } catch (error) {
        showError('Gagal menyimpan data');
      }
    });
  }

  // Fungsi menampilkan error
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.querySelector('h1').after(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
  }

  // Format angka ke Rupiah
  function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(angka);
  }

  // Format tanggal
  function formatTanggal(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  // Update data tabel secara real-time
  async function updateTable() {
    try {
      const response = await fetch('/cicilan');
      const data = await response.json();

      const tbody = document.querySelector('tbody');
      tbody.innerHTML = data.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nama}</td>
          <td>${formatRupiah(item.jumlahPembayaran)}</td>
          <td>${item.tenor} bulan</td>
          <td>${item.kategori}</td>
          <td>${formatRupiah(item.sisaCicilan)}</td>
          <td>${formatTanggal(item.tanggalJatuhTempo)}</td>
        </tr>
      `).join('');

    } catch (error) {
      console.error('Gagal memuat data:', error);
    }
  }

  // Jalankan update tabel jika di halaman cicilan
  if (window.location.pathname === '/cicilan') {
    updateTable();
    setInterval(updateTable, 5000); // Update setiap 5 detik
  }
});
