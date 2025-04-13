// script-tagihan.js (untuk halaman Tagihan)
document.addEventListener('DOMContentLoaded', () => {
  // Handle form tambah tagihan
  const formTagihan = document.getElementById('formTagihan');
  if (formTagihan) {
    formTagihan.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        namaTagihan: e.target.namaTagihan.value,
        jumlahTagihan: parseInt(e.target.jumlahTagihan.value),
        tanggalJatuhTempo: e.target.tanggalJatuhTempo.value,
        kategori: e.target.kategori.value,
        status: e.target.status.checked ? "Lunas" : "Belum Lunas"
      };

      try {
        const response = await fetch('/tagihan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          window.location.href = '/tagihan'; // Redirect ke halaman utama tagihan
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
      const response = await fetch('/tagihan');
      const data = await response.json();

      const tbody = document.querySelector('tbody');
      tbody.innerHTML = data.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.namaTagihan}</td>
          <td>${formatRupiah(item.jumlahTagihan)}</td>
          <td>${formatTanggal(item.tanggalJatuhTempo)}</td>
          <td>${item.kategori}</td>
          <td>${item.status}</td>
        </tr>
      `).join('');

    } catch (error) {
      console.error('Gagal memuat data:', error);
    }
  }

  // Jalankan update tabel jika di halaman tagihan
  if (window.location.pathname === '/tagihan') {
    updateTable();
    setInterval(updateTable, 5000); // Update setiap 5 detik
  }
});
