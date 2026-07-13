# Multi-Agent Architecture Blueprint - ReceiptViewer

Dokumen ini mendefinisikan arsitektur berbasis agen cerdas (AI Agents/Micro-services) yang menangani alur kerja end-to-end aplikasi ReceiptViewer dari input hingga dokumen siap cetak.

## 1. Agent Architecture Breakdown

### 🤖 1. Merchant & Metadata Validator Agent
* **Tanggung Jawab:** Memvalidasi kelengkapan data toko dan detail waktu transaksi.
* **Tugas Khusus:**
    * Memastikan format alamat dan nama merchant bersih dari typo (autocorrect jika diperlukan).
    * Melakukan standarisasi ID Pesanan (Order ID) unik jika user mengosongkannya.
    * Memastikan format penulisan zona waktu (WIB/WITA/WIT) sinkron dengan waktu input.

### 🤖 2. Financial Math & Tax Agent
* **Tanggung Jawab:** Menjamin akurasi perhitungan matematis pada daftar produk.
* **Tugas Khusus:**
    * Menerima array objek `Daftar Produk` (QTY $\times$ Harga per unit).
    * Menghitung $Subtotal = \sum (QTY \times Harga)$.
    * Menerapkan kalkulasi pajak secara dinamis (misal: $Tax (11\%) = Subtotal \times 0.11$).
    * Mengembalikan nilai `Total Akhir` dalam format integer bersih untuk di-parsing ke Rupiah (`Rp`).

### 🤖 3. Layout Designer & Receipt Formatter Agent
* **Tanggung Jawab:** Mengubah data mentah (JSON) menjadi representasi visual struk belanja yang estetik dan rapi.
* **Tugas Khusus:**
    * Menentukan struktur hierarki font (ukuran nama toko vs ukuran item belanja).
    * Menambahkan teks pelengkap otomatis (e.g., "Verified Transaction Digital Record" atau "THANK YOU FOR YOUR PURCHASE").
    * Membuat barcode/QR code representatif di bagian bawah struk untuk estetika digital receipt.

### 🤖 4. PDF Rendering & Export Agent
* **Tanggung Jawab:** Mengompilasi hasil desain visual menjadi dokumen fisik siap cetak beresolusi tinggi.
* **Tugas Khusus:**
    * Menangani fungsi *print command* browser via window print api atau library serverless PDF generator.
    * Memastikan rasio ukuran kertas struk (efek thermal paper gulung atau A4 terkompresi) pas dan tidak terpotong pada layar mobile saat diekspor.

---

## 2. Inter-Agent Communication Flow

1.  Pengguna menekan tombol **Generate Struk**.
2.  `Form Data` dikirim ke **Validator Agent** untuk verifikasi teks.
3.  Payload produk diteruskan ke **Financial Math Agent** untuk mengamankan kalkulasi angka.
4.  Data bersih hasil komputasi digabung kembali dan dikirim ke **Layout Designer Agent** untuk menyusun kode visual/HTML komponen struk.
5.  Saat tombol **Print to PDF** diklik, **PDF Rendering Agent** mengeksekusi konversi