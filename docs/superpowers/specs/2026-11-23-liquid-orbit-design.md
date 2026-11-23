# Splash orbit cair

## Arah visual

Pengguna memilih orbit cair. Tiga lingkaran putih dengan ukuran berbeda mengikuti lintasan elips yang berpotongan di tengah bidang hitam. Saat berdekatan, kontur menyatu seperti tetesan cairan. Alternatif tetes membelah memiliki arah gerak horizontal yang lebih kuat. Orbit memberi pusat visual yang stabil saat ukuran layar berubah.

## Gerak dan tipografi

Satu putaran berlangsung 1,6 detik. Posisi dan kecepatan di akhir putaran cocok dengan awal putaran. Durasi, radius, lintasan, dan fase setiap lingkaran tersimpan dalam satu konfigurasi motion graph. Teks “please wait” memakai huruf kecil, tetap diam di bawah orbit, dan berada di luar filter cairan. Filter hanya mencakup bidang ilustrasi.

## Perilaku

Splash tampil pada kunjungan awal. Di beranda, kesiapan poster hero cukup untuk memulai fade keluar 240 ms. Pada rute lain, splash bisa keluar setelah halaman terpasang. Batas tunggu 2,5 detik berlaku jika aset tertunda atau gagal. Preferensi reduced motion menampilkan komposisi statis. Splash tidak memindahkan posisi scroll.

## Verifikasi

Periksa sambungan loop, teks, dan posisi pada ponsel, tablet, serta desktop. Uji poster dari cache, pemuatan lambat, kegagalan poster, dan reduced motion. Pastikan navigasi kembali dapat memulihkan posisi halaman.
