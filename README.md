# Inventori Packing – DXN DC Sendayan

Aplikasi mudah alih (PWA) untuk Admin dan Pengurusan Atasan menyemak inventori packing DXN DC Sendayan secara langsung daripada Google Sheet **DXN PACKING INVENTORY 2026**. Item yang habis stok atau berada di bawah paras minimum dipaparkan dengan **amaran merah berkelip**.

## Kandungan repositori
| Fail | Fungsi |
|---|---|
| `index.html` | Aplikasi penuh (paparan, logik, gaya) |
| `manifest.json` | Membolehkan app dipasang ke skrin utama telefon |
| `sw.js` | Service worker – app boleh dibuka walaupun luar talian (data terakhir) |
| `icons/` | Ikon app (192, 512, maskable, Apple) |

## Langkah pemasangan di GitHub Pages
1. **Kongsi Google Sheet**: Share → General access → *Anyone with the link* → **Viewer**. (Wajib – tanpa ini app tidak dapat membaca data.)
2. Log masuk ke GitHub (akaun `rulrizal8283-ai`) → **New repository** → nama: `dxn-inventori-packing` → Public → Create.
3. Klik **Add file → Upload files**, seret SEMUA fail dan folder `icons` daripada zip ini → **Commit changes**.
4. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → **Save**.
5. Tunggu 1–2 minit. Pautan app:
   `https://rulrizal8283-ai.github.io/dxn-inventori-packing/`

## Pasang di telefon
- **Android (Chrome)**: buka pautan → menu ⋮ → **Install app / Add to Home screen**.
- **iPhone (Safari)**: buka pautan → butang Share → **Add to Home Screen**.

## Logik status stok
| Status | Syarat | Paparan |
|---|---|---|
| Habis stok | CURRENT BALANCE ≤ 0 atau STOCK STATUS = OUT OF STOCK | Merah berkelip + banner amaran |
| Kurang stok | CURRENT BALANCE ≤ MIN STOCK / REORDER LEVEL, atau STOCK STATUS = REORDER | Jingga + berkelip merah |
| Mencukupi | Selain di atas | Hijau |

> Penting: Isi lajur **MIN STOCK / REORDER LEVEL** (lajur M) dalam ITEM MASTER bagi setiap item. Tanpa nilai ini, amaran "Kurang stok" tidak dapat dikesan – hanya "Habis stok" (baki 0).

## Ciri-ciri
- Ringkasan: jumlah item, habis stok, kurang stok, mencukupi, status mengikut kategori, pergerakan terkini.
- Stok: carian, tapis status/kategori, susunan paling kritikal; ketik item untuk spesifikasi & sejarah pergerakan.
- Transaksi: tapis mengikut bulan dan jenis (masuk/keluar).
- Bulanan: carta dan jadual MONTHLY SUMMARY.
- Kemas kini automatik setiap 60 saat; butang bunyi amaran (beep) dan getaran telefon bila senarai kritikal berubah.

## Kemas kini app
Jika `index.html` diubah, tukar `CACHE = 'dxn-inventori-v1'` dalam `sw.js` kepada `v2`, `v3` dan seterusnya supaya telefon mengambil versi baharu.

## Tukar ikon kepada logo rasmi DXN
Gantikan fail dalam folder `icons/` dengan logo DXN (PNG, saiz sama: 192×192, 512×512, 180×180) menggunakan nama fail yang sama.
