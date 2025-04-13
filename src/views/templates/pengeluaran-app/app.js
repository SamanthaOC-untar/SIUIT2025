// Konfigurasi API
const API_BASE_URL = 'http://localhost:3000/pengeluaran';

// DOM Elements
const tabelPengeluaran = document.getElementById('tabelPengeluaran');
const dataBody = document.getElementById('dataBody');
const formPengeluaran = document.getElementById('formPengeluaran');
const filterKategori = document.getElementById('filterKategori');
const btnFilter = document.getElementById('btnFilter');
const errorMessage = document.getElementById('errorMessage');

// Fungsi untuk memformat angka ke Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

// Fungsi untuk memuat data pengeluaran
async function loadPengeluaran(kategori = '') {
  try {
    let url = API_BASE_URL;
    if (kategori) {
      url += `?kategori=${kategori}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    dataBody.innerHTML = '';
    
    if (data.length === 0) {
      dataBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center;">Tidak ada data pengeluaran</td>
        </tr>
      `;
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.sumber}</td>
        <td>${formatRupiah(item.jumlah)}</td>
        <td>${item.kategori}</td>
        <td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
      `;
      dataBody.appendChild(row);
    });

  } catch (error) {
    console.error('Error:', error);
    dataBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: red;">
          Gagal memuat data
        </td>
      </tr>
    `;
  }
}

// Fungsi untuk menambah pengeluaran
async function tambahPengeluaran(data) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal menambah data');
    }

    window.location.href = 'index.html';
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

// Event Listeners
if (formPengeluaran) {
  formPengeluaran.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
      sumber: document.getElementById('sumber').value,
      jumlah: parseInt(document.getElementById('jumlah').value),
      kategori: document.getElementById('kategori').value
    };

    tambahPengeluaran(data);
  });
}

if (btnFilter) {
  btnFilter.addEventListener('click', () => {
    loadPengeluaran(filterKategori.value);
  });
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    loadPengeluaran();
  }
});