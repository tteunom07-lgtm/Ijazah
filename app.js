app.post('/cetak', (req, res) => {
    // Menangkap semua data form tanpa peduli huruf besar/kecil, lalu lempar ke ijazah
    res.render('ijazah', { ...req.body });
});

