// Only reviewed translations are published. Unmapped source prose stays at
// its source link, never silently promoted to translated or verified evidence.
const translations: Record<string,string> = {
  "per session": "per sesi",
  "per package": "per paket",
  "registration fee": "biaya pendaftaran",
  "per trial package": "per paket percobaan",
  "per 2-week membership": "keanggotaan 2 minggu",
  "per 1-month membership": "keanggotaan 1 bulan",
  "Baby Crawler class (5-13 months)": "Kelas Baby Crawler (5-13 bulan)",
  "One child, 4 lessons x 30 minutes": "Untuk 1 anak, 4 pertemuan masing-masing 30 menit",
  "Separate registration charge": "Pendaftaran dibayar terpisah",
  "5 trial sessions, not regular tuition": "5 sesi percobaan, bukan biaya kelas reguler",
  "Basic membership, November 2026 (listing marked estimated)": "Keanggotaan Basic, November 2026 (harga ditandai perkiraan)",
  "Gymnastics class, 60 minutes": "Kelas senam, 60 menit",
  "Private online gymnastics, 60 minutes": "Senam privat daring, 60 menit",
  "Weekend Class (1-3 yrs)": "Kelas akhir pekan (1-3 tahun)",
  "Weekend Class (3-5 yrs)": "Kelas akhir pekan (3-5 tahun)",
  "KINDERRA PLAY FLEXI 3X (1-5 yrs)": "KINDERRA PLAY FLEXI 3X (1-5 tahun)",
  "KINDERRA PLAY FLEXI 2X (1-5 yrs)": "KINDERRA PLAY FLEXI 2X (1-5 tahun)",
  "No end date is stated. This is Baby Crawler, not preschool or daycare tuition. Confirm the next class and any registration fee.": "Tanggal akhir berlaku belum disebut. Ini biaya Baby Crawler, bukan biaya sekolah atau penitipan anak. Tanyakan kelas berikutnya dan biaya pendaftarannya.",
  "Registration is separate below. No validity period or baby-class allocation is stated; confirm the applicable program and current fee.": "Pendaftaran terpisah, lihat rincian di bawah. Masa berlaku dan jatah kelas bayi belum disebut. Tanyakan program yang bisa diikuti serta biaya terbarunya.",
  "Confirm whether this charge applies to your enrolment. Not included in the package price above.": "Tanyakan apakah biaya ini berlaku untuk pendaftaran Anda. Belum termasuk dalam harga paket di atas.",
  "All 5 sessions must be used within 2 weeks; unused sessions are non-refundable. No end date or separate registration fee is stated.": "Kelima sesi harus dipakai dalam 2 minggu. Sesi yang tidak dipakai tidak bisa diuangkan kembali. Tanggal akhir berlaku dan biaya pendaftaran terpisah belum disebut.",
  "Rp185,000 registration is separate. Advance booking and admin confirmation required; no walk-ins; subject to class availability. Full T&C are supplied after registration. Confirm eligibility, dates and refund terms before paying.": "Pendaftaran Rp185.000 terpisah. Wajib memesan kelas dan mendapat konfirmasi admin; tidak bisa langsung datang. Tergantung ketersediaan kelas. Ketentuan lengkap baru diberikan setelah daftar. Tanyakan syarat usia, tanggal berlaku dan aturan pengembalian dana sebelum membayar.",
  "Rp185,000 registration is separate. Not a class-specific price. Advance booking/admin confirmation required; no walk-ins. Full T&C, dates, eligibility and refund terms need confirmation.": "Pendaftaran Rp185.000 terpisah. Bukan harga untuk satu kelas tertentu. Wajib memesan dan mendapat konfirmasi admin; tidak bisa langsung datang. Ketentuan lengkap, tanggal berlaku, syarat usia dan aturan pengembalian dana perlu ditanyakan.",
  "Saturday 09:00-10:00 WIB": "Sabtu 09.00-10.00 WIB",
  "Tuesday-Saturday, subject to the available schedule": "Selasa-Sabtu, mengikuti jadwal yang tersedia",
  "Weekdays 14:00, 15:30, 17:00 on the page; open 11:00-19:00. Ask the admin to confirm Kinder slots.": "Halaman sumber mencantumkan hari kerja pukul 14.00, 15.30 dan 17.00, serta jam buka 11.00-19.00. Tanyakan jadwal kelas Kinder ke admin.",
  "Open daily 11:00-19:00 on the page; class slots not listed. Kinder (from 3.5 yrs) needs a companion. Ask the branch to confirm slots.": "Halaman sumber mencantumkan buka setiap hari 11.00-19.00, tetapi jadwal kelas belum disebut. Kelas Kinder (mulai 3,5 tahun) perlu pendamping. Tanyakan jadwal ke cabang.",
  "Age conflict: official baby-gym page says 6-11 months; official homepage says 6-12 months. Confirm eligibility with Bloom, especially at 12 months.": "Sumber usia berbeda: halaman Baby Gym menyebut 6-11 bulan, halaman utama menyebut 6-12 bulan. Tanyakan ke Bloom, terutama jika anak berusia 12 bulan.",
  "Age conflict: Bloom pages start at 19 months; the ABC Kids / Brighton school listing starts at 20 months. Confirm the 19-month boundary with Bloom.": "Halaman Bloom menyebut mulai 19 bulan, sedangkan daftar ABC Kids / Brighton mulai 20 bulan. Tanyakan apakah anak 19 bulan sudah bisa ikut.",
  "Product title and description say 8-19 bulan; the current November 2026 Cibubur timetable says Gym Bayi 8-18 bulan. Conflicting upper bounds: not confirmed. Product thumbnail is an older 2-5-year Gym Class poster.": "Judul dan keterangan produk menyebut 8-19 bulan. Jadwal Cibubur November 2026 menyebut Gym Bayi 8-18 bulan. Batas usia berbeda, jadi belum terkonfirmasi. Gambar produk masih memakai poster lama kelas usia 2-5 tahun.",
  "\"3 yrs\" upper bound ambiguous. Source states a single age; exact upper eligibility not stated.": "Sumber hanya menyebut usia 3 tahun. Batas usia atasnya belum jelas; tanyakan usia tepat yang masih bisa ikut.",
  "Official location: PIM1 Ground Floor / Outdoor Area. Earlier Maps address evidence says PIM3; not re-fetched in this correction. Confirm the entrance with the branch before visiting; in-app routing remains off.": "Lokasi resmi: PIM1 lantai dasar, area luar. Alamat Maps yang dibaca sebelumnya menyebut PIM3; alamat itu belum diperiksa ulang saat koreksi ini. Tanyakan pintu masuk ke cabang sebelum datang. Petunjuk arah dari pin peta tetap dimatikan."
};
export function placeText(text: string | undefined,lang: 'en'|'id',fallback=''): string {
 if(!text)return '';return lang==='en'?text:(translations[text] ?? fallback);
}
export function placeRegion(city:string,area:string) { return city.trim().toLowerCase()===area.trim().toLowerCase()?city:`${city} · ${area}`; }

export function publicProgramNote(text:string|undefined,lang:'en'|'id') {
 if(!text)return '';
 if(/exact[- ]age[- ]match|upper[- ]bound inclusivity|sourceConflict|JSON-LD|in-app routing|not re-fetched/i.test(text)) {
  return lang==='id'?'Batas usia perlu ditanyakan langsung ke cabang. Cek sumber sebelum memilih kelas.':'Confirm the exact age limit with the branch before choosing this class.';
 }
 return placeText(text,lang);
}
export function publicCaution(text:string,lang:'en'|'id') {
 if(lang==='id')return placeText(text,lang,'Tanyakan alamat dan pintu masuk ke cabang sebelum datang.');
 if(text.startsWith('Official location: PIM1'))return 'The official location is PIM1 Ground Floor / Outdoor Area. An earlier Maps record gives PIM3. Confirm the entrance with the branch before visiting.';
 return text;
}
