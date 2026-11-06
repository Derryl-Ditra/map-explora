// Aggregate-only Google Maps refresh, 2026-11-07 (weekly run). Identity-matched via place_id
// or exact-coordinate name match for all 148 venues; only drifted entries are listed.
// Full audit: docs/review-aggregate-2026-11-07.csv. Existing review theme dates stay unchanged.
export const UPDATES_2026_11_07: Record<string, { rating: number; reviewCount: number; sourceUrl: string }> = {
  "english-1-cinere-depok": { "rating": 4.8, "reviewCount": 358, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Cinere+Depok&query_place_id=ChIJU26STkbuaS4RXP3tp-gXj9g" },
  "english-1-pluit-village": { "rating": 4.9, "reviewCount": 435, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Pluit+Village&query_place_id=ChIJfxl19ZUdai4RlXPUi4JnAiA" },
  "english-1-puri-indah": { "rating": 5, "reviewCount": 520, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Puri+Indah&query_place_id=ChIJz_CewRL3aS4R4s4UhENCgMc" },
  "english-1-tangcity-tangerang": { "rating": 5, "reviewCount": 817, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Tangcity+Tangerang&query_place_id=ChIJTTQd7jH5aS4ReEoc7pbmfMg" },
  "i-can-read-ciledug": { "rating": 5, "reviewCount": 28, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=I+Can+Read+Ciledug&query_place_id=ChIJtZlEt_n7aS4R_rNGP0p_CBM" },
  "sparks-sports-academy-harapan-indah-bekasi": { "rating": 4.3, "reviewCount": 152, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Harapan+andah+Bekasi&query_place_id=ChIJI-AlvaGLaS4RipyrwRi-q6o" },
  "sparks-sports-academy-kalimalang": { "rating": 4.4, "reviewCount": 138, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Kalimalang&query_place_id=ChIJcySIfDDzaS4R_phVJfWHiAA" },
  "sparks-sports-academy-pajajaran-bogor": { "rating": 4.5, "reviewCount": 135, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Pajajaran+Bogor&query_place_id=ChIJJRXv5zPFaS4RXxnF-MPcI80" },
  "sparks-sports-academy-pejaten": { "rating": 4.1, "reviewCount": 97, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Pejaten&query_place_id=ChIJj0oC-ZPzaS4R27vIoJlywyE" },
  "sparks-sports-academy-cikarang": { "rating": 4.9, "reviewCount": 321, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Cikarang&query_place_id=ChIJwVuoKO2baS4RrnEh0hJv2HY" },
  "buumi-playscape-pacific-place": { "rating": 4.4, "reviewCount": 449, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Buumi+Playscape&query_place_id=ChIJCde1CiPxaS4RiRhdJsI6z5w" },
  "english-1-cibinong": { "rating": 4.9, "reviewCount": 210, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Cibinong+City+Mall+Bogor&query_place_id=ChIJTYepCxLBaS4RClcNKmi4GNI" },
  "english-1-pajajaran": { "rating": 5, "reviewCount": 1393, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Pajajaran+Bogor&query_place_id=ChIJVaeRJ9vFaS4RZh7mBzEwtCA" },
  "english-1-taman-yasmin": { "rating": 5, "reviewCount": 1118, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Taman+Yasmin+Bogor&query_place_id=ChIJ9RfZyGLEaS4RTddHwTDpDug" },
  "sparks-swim-bintaro-utown": { "rating": 3.5, "reviewCount": 11, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Swim+-+Bintaro+Utown&query_place_id=ChIJodkZ3y_xaS4R8l_mHsQwP4s" },
  "i-can-read-bsd2": { "rating": 5, "reviewCount": 126, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=I+Can+Read+BSD+2&query_place_id=ChIJH5YVXuD7aS4RxxCLHUyZ-r0" },
  "i-can-read-galaxy": { "rating": 5, "reviewCount": 206, "sourceUrl": "https://www.google.com/maps/search/?api=1&query=I+Can+Read+Grand+Galaxy&query_place_id=ChIJwa57xHeNaS4R4Iugfi2Ya20" },
};
