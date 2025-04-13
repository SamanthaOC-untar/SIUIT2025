// script-pendapatan.js (untuk halaman Pendapatan)
document.addEventListener('DOMContentLoaded', () => {
  // Handle form tambah pendapatan
  const formPendapatan = document.getElementById('formPendapatan');
  if (formPendapatan) {
    formPendapatan.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        sumber: e.target.sumber.value,
        jumlah: parseInt(e.target.jumlah.value),
        tanggal: e.target.tanggal.value,
        kategori: e.target.kategori.value
      };

      try {
        const response = await fetch('/pendapatan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          window.location.href = '/pendapatan'; // Redirect ke halaman utama pendapatan
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
      const response = await fetch('/pendapatan');
      const data = await response.json();

      const tbody = document.querySelector('tbody');
      tbody.innerHTML = data.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.sumber}</td>
          <td>${formatRupiah(item.jumlah)}</td>
          <td>${formatTanggal(item.tanggal)}</td>
          <td>${item.kategori}</td>
        </tr>
      `).join('');

    } catch (error) {
      console.error('Gagal memuat data:', error);
    }
  }

  // Jalankan update tabel jika di halaman pendapatan
  if (window.location.pathname === '/pendapatan') {
    updateTable();
    setInterval(updateTable, 5000); // Update setiap 5 detik
  }
});
