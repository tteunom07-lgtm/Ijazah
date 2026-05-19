const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// FUNGSI BARU: Mengunci kualitas asli resolusi tinggi gambar tanpa kompresi rusak
function readImageToBase64(namaFile) {
    try {
        const filePath = path.resolve(__dirname, namaFile);

        if (!fs.existsSync(filePath)) {
            console.log(`❌ File tidak ditemukan: ${namaFile}`);
            return null;
        }

        // Ambil ekstensi asli file secara aman
        const ext = path.extname(namaFile).toLowerCase();
        let mimeType = 'image/png'; // Default
        
        if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        if (ext === '.svg') mimeType = 'image/svg+xml';
        if (ext === '.gif') mimeType = 'image/gif';

        const fileData = fs.readFileSync(filePath);
        const base64Data = fileData.toString('base64');

        console.log(`| OK | [${namaFile}] dikonversi dengan Mime: ${mimeType} (${fileData.length} bytes).`);
        return `data:${mimeType};base64,${base64Data}`;
    } catch (error) {
        console.log(`❌ Gagal membaca gambar [${namaFile}]:`, error.message);
        return null;
    }
}

app.get('/verif', (req, res) => {
    // 1. Ambil token kunci rahasia dari URL (?PDDikti=...)
    const tokenAkses = req.query.PDDikti;

    // 2. Buat token pengunci khusus (Bisa kamu ganti sesuka hati)
    const kunciRahasia = "USK_IjazahTTE2025"; 

    // Ambil aset gambar bawaan
    const logoUskBase64 = readImageToBase64('usklogo.png');
    const logoBsreBase64 = readImageToBase64('logo.png');

    // Data mahasiswa tetap aman di dalam backend
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

    // 3. Validasi: Cek apakah user membawa kunci token yang cocok dari QR Code
    if (tokenAkses === kunciRahasia) {
        // JIKA COCOK (Lewat QR): Buka halaman ijazah asli
        res.render('verifikasi', {
            dataLulusan,
            informasiDokumen,
            logoUskBase64,
            logoBsreBase64
        });
    } else {
        // JIKA SALAH / KETIK MANUAL: Blokir akses secara aman
        res.status(403).send(`
            <div style="text-align:center; margin-top:80px; font-family:-apple-system,sans-serif; padding:20px;">
                <div style="font-size:60px; color:#dc2626; margin-bottom:15px;">⚠️</div>
                <h1 style="color:#111827; font-size:24px; font-weight:800; margin-bottom:8px;">AKSES DI-BLOKIR</h1>
                <p style="color:#4b5563; font-size:15px; max-width:400px; margin:0 auto; line-height:1.5;">
                    Dokumen digital ini dilindungi. Anda hanya dapat memverifikasi keaslian ijazah dengan melakukan 
                    <strong>Pemindaian (Scan) QR Code Resmi</strong> yang tertera pada dokumen fisik.
                </p>
                <div style="margin-top:25px; font-size:12px; color:#9ca3af;">Universitas Syiah Kuala - Keamanan Sistem</div>
            </div>
        `);
    }
});


app.listen(PORT, () => {
    console.log(`Server aktif! Akses lewat Tab Samaran: http://localhost:${PORT}/verif`);
});

