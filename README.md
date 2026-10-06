# Mega Safe Security Services Sdn Bhd — Website Korporat Bahasa Melayu

## Fungsi yang ditambah
- Permintaan Sebut Harga melalui WhatsApp: +60 16-363 9789
- Permintaan Sebut Harga melalui e-mel: megasafe.my@gmail.com
- Template automasi Google Form + Google Sheet dalam `google-form/BUAT-BORANG-SEBUT-HARGA.gs`
- Buletin dengan gambar aktiviti sebenar yang diberikan
- Pembantu AI Pelanggan dalam Bahasa Melayu

## Cara aktifkan Google Form
1. Buka https://script.google.com/ dan cipta projek baharu.
2. Salin kandungan `google-form/BUAT-BORANG-SEBUT-HARGA.gs` ke dalam Apps Script.
3. Jalankan fungsi `BUAT_BORANG_SEBUT_HARGA` dan beri kebenaran apabila diminta.
4. Buka Execution log / Logs dan salin `URL BORANG UNTUK PELANGGAN`.
5. Dalam `index.html`, cari `const GOOGLE_FORM_URL = "";` dan masukkan URL tersebut di antara tanda petikan.
6. Muat naik semula `index.html` ke GitHub Pages.

Google Form akan menyimpan jawapan secara automatik ke Google Sheet yang dicipta oleh skrip, supaya senarai permintaan sebut harga mudah disemak, ditapis dan dibalas.

## Media / Buletin
Gambar yang diberikan telah dimasukkan ke:
- `assets/buletin-01-anugerah.jpeg`
- `assets/buletin-02-aktiviti.jpeg`


## Cadangan aliran kerja sebut harga

1. Buka `google-form/BUAT-BORANG-SEBUT-HARGA.gs` di Google Apps Script.
2. Jalankan `BUAT_BORANG_SEBUT_HARGA()` sekali dan benarkan akses.
3. Salin URL Borang Google yang dipaparkan dalam Log.
4. Tampal URL tersebut ke pembolehubah `GOOGLE_FORM_URL` di `index.html`.
5. Upload semula website ke GitHub Pages.
6. Setiap penghantaran akan direkodkan dalam Google Sheet dan dihantar notifikasi ke `megasafe.my@gmail.com`.
7. Helaian `Tindakan Susulan` digunakan untuk status: Baru, Sedang Diproses, Sebutharga Dihantar, Susulan, Selesai atau Tidak Berjaya.

## Cadangan seterusnya

Untuk AI sebenar, gunakan backend/server sebagai perantara. Jangan masukkan API key AI terus dalam `index.html`.
