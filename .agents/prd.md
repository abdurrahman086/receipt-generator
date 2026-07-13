# Product Requirement Document (PRD) - ReceiptViewer

## 1. Executive Summary
ReceiptViewer adalah platform berbasis web sederhana yang memungkinkan pengguna mengubah struk belanja fisik menjadi struk digital profesional dalam hitungan detik secara instan dan tanpa perlu registrasi login. Struk yang dihasilkan dapat diekspor ke format PDF berkualitas tinggi yang siap dicetak atau dibagikan melalui WhatsApp.

---

## 2. Target Audience & Core Value Proposition
* **Target Pengguna:** Pemilik UMKM, pekerja lepas (freelancer), atau individu yang memerlukan pembuatan ulang struk belanja dengan cepat untuk keperluan pencatatan keuangan atau klaim (reimbursement).
* **Nilai Utama:** * **Instan & Tanpa Registrasi:** Menjaga privasi penuh tanpa meminta email atau password.
    * **Kalkulasi Otomatis:** Menghitung subtotal, pajak, dan total akhir dengan presisi matematis secara real-time.
    * **Ekspor PDF Tajam:** Menghasilkan file PDF bersih siap cetak.

---

## 3. User Flow & Features Requirement

### Halaman 1: Landing Page (Beranda)
* **Hero Section:** CTA utama "Buat Struk Sekarang" dan "Lihat Contoh". Menampilkan preview struk digital interaktif.
* **Fitur Keunggulan:** Grid informasi yang menjelaskan 4 pilar (Instan, Ekspor PDF, Multi-Platform, Kalkulasi Otomatis).
* **Footer CTA:** Section ajakan terakhir untuk mulai menggunakan aplikasi secara gratis.

### Halaman 2: Form Input Data Struk
Formulir input dibagi menjadi 4 section modular:
1.  **Informasi Toko (Merchant):** Input Nama Toko, Kota, dan Alamat Lengkap.
2.  **Detail Transaksi:** Input Tanggal (date picker), Waktu (time picker), Metode Pembayaran (Dropdown: Tunai, Visa, dll), dan ID Pesanan (Autogenerate / Manual).
3.  **Daftar Produk:** * Tabel dinamis dengan kolom Deskripsi Item, QTY (Quantity), dan Harga (RP).
    * Tombol "+ TAMBAH ITEM" untuk menyisipkan baris baru.
    * Tombol hapus (ikon tempat sampah) di setiap baris item.
    * Kalkulator internal otomatis untuk Subtotal dan Total Akhir.
4.  **Informasi Pelanggan (Opsional):** Input Nama Pelanggan dan No. Telepon / Email.

* **Aksi Utama:** Tombol "Reset Form" untuk mengosongkan data dan "GENERATE STRUK" (dengan ikon AI/Sparkle) untuk memproses struk.

### Halaman 3: Preview & Cetak Struk
* Tampilan layout struk belanja yang bersih dan profesional.
* Menampilkan logo/placeholder toko, detail metadata transaksi, tabel item dengan kuantitas (misal: `3x`), detail pajak (Tax 11%), total dengan font kontras/besar, serta footer otomatis "Thank you for shopping...".
* **Aksi Utama:** Tombol "Print to PDF" di bagian atas navigasi untuk mencetak atau mengunduh dokumen.

---

## 4. Non-Functional Requirements (NFR)
* **Responsiveness:** UI harus adaptif (Mobile, Tablet, Desktop).
* **Privacy & Security:** Tidak ada penyimpanan data sensitif di database pusat; data form diproses di sisi klien (Client-side rendering/state).
* **Performance:** Proses *render* PDF harus instan (< 2 detik).