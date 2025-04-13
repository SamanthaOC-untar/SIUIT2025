// script.js (untuk halaman Pengeluaran)
document.addEventListener('DOMContentLoaded', () => {
  // Handle form tambah pengeluaran
  const formPengeluaran = document.getElementById('formPengeluaran');
  if (formPengeluaran) {
    formPengeluaran.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        sumber: e.target.sumber.value,
        jumlah: parseInt(e.target.jumlah.value),
        kategori: e.target.kategori.value
      };

      try {
        const response = await fetch('/pengeluaran', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          window.location.href = '/'; // Redirect ke halaman utama
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
      const response = await fetch('/pengeluaran');
      const data = await response.json();
      
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = data.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.sumber}</td>
          <td>${formatRupiah(item.jumlah)}</td>
          <td>${item.kategori}</td>
          <td>${formatTanggal(item.tanggal)}</td>
          <td>${formatTanggal(item.dibuatPada)}</td>
        </tr>
      `).join('');
      
    } catch (error) {
      console.error('Gagal memuat data:', error);
    }
  }

  // Jalankan update tabel jika di halaman utama
  if (window.location.pathname === '/') {
    updateTable();
    setInterval(updateTable, 5000); // Update setiap 5 detik
  }
});