const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fungsi bantu untuk membaca gambar ke Base64 (Kode Asli Kamu)
function imageToBase64(filename) {
    try {
        const filePath = path.join(__dirname, filename);
        const fileData = fs.readFileSync(filePath);
        const mimeType = path.extname(filename).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
        return `data:${mimeType};base64,${fileData.toString('base64')}`;
    } catch (error) {
        console.error(`Gagal membaca gambar ${filename}:`, error.message);
        return null; // Balikan null jika gagal
    }
}

app.get('/verifikasi', (req, res) => {
    // Konversi logo secara otomatis dari folder utama kamu
    const logoUskBase64 = imageToBase64('usklogo.png');
    const logoBsreBase64 = imageToBase64('logo.png');

    // DATA ASLI KAMU (MUHAMMAD IQBAL)
    const dataLulusan = {
        namaLengkap: "MUHAMMAD IQBAL",
        nim: "2001102010031",
        nomorIjazah: "4030120250000845",
        programStudi: "S1 - Manajemen",
        tanggalKelulusan: "6 Januari 2025"
    };

    const informasiDokumen = {
        tanggalTerbit: "1 Februari 2025",
        perguruanTinggi: "Universitas Syiah Kuala",
        fakultas: "Fakultas Ekonomi Dan Bisnis",
        jenisIjazah: "Sarjana (S1)",
        statusVerifikasi: "TERVERIFIKASI"
    };

    // Mengirimkan seluruh data ke file views/verifikasi.ejs
    res.render('verifikasi', { 
        dataLulusan: dataLulusan, 
        informasiDokumen: informasiDokumen, 
        logoUskBase64: logoUskBase64, 
        logoBsreBase64: logoBsreBase64 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` Server berhasil berjalan aktif kembali!`);
    console.log(` Buka di HP kamu: http://localhost:${PORT}/verifikasi`);
    console.log(`==================================================`);
});

