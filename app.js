const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS sebagai template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk membaca data dari Form Body
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 1. RUTE HALAMAN FORM INPUT DATA
app.get('/', (req, res) => {
    res.render('form');
});

// 2. RUTE HALAMAN HASIL VERIFIKASI (Menerima input user)
app.post('/cetak', (req, res) => {
    const dataIjazah = {
        mahasiswa: {
            namaLengkap: req.body.namaLengkap,
            nim: req.body.nim,
            nomorIjazahNasional: req.body.nomorIjazahNasional,
            programStudi: req.body.programStudi,
            tanggalKelulusan: req.body.tanggalKelulusan
        },
        dokumen: {
            tanggalTerbit: req.body.tanggalTerbit,
            perguruanTinggi: "Universitas Syiah Kuala",
            fakultas: req.body.fakultas,
            jenisIjazah: req.body.jenisIjazah,
            statusVerifikasi: "TERVERIFIKASI"
        }
    };

    res.render('ijazah', { data: dataIjazah });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

