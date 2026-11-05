// Aggregate-only Google Maps refresh, 2026-11-05. Full 128-place source audit:
// docs/review-aggregate-refresh.csv. Existing review theme dates stay unchanged.
export const UPDATES: Record<string, { rating: number; reviewCount: number; sourceUrl: string }> = {
  "english-1-jagakarsa-tanjung-barat": {
    "rating": 5,
    "reviewCount": 959,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Jagakarsa+Tanjung+Barat&query_place_id=ChIJYyZDfjbtaS4Rq15hzJf7KWE"
  },
  "english-1-pamulang-tangerang": {
    "rating": 4.8,
    "reviewCount": 164,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Pamulang+Tangerang&query_place_id=ChIJU36f4XjvaS4RHCnR7YpGyQE"
  },
  "english-1-sawangan-depok": {
    "rating": 4.9,
    "reviewCount": 181,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=English+1+Sawangan+Depok&query_place_id=ChIJYXD43VPvaS4RxfsIGIV6Vss"
  },
  "i-can-read-bsd": {
    "rating": 4.9,
    "reviewCount": 57,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=I+Can+Read+BSD&query_place_id=ChIJ6dCh09L6aS4RE1PcUzkgq7w"
  },
  "i-can-read-bintaro": {
    "rating": 5,
    "reviewCount": 726,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=I+Can+Read+Bintaro+%7C+Kursus+Bahasa+Inggris+anak+%26+remaja&query_place_id=ChIJ5c3fbpD6aS4Rkifzh14xT6Y"
  },
  "sparks-sports-academy-kemang-ampera": {
    "rating": 4.6,
    "reviewCount": 5,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Kemang+Ampera&query_place_id=ChIJM7yHtwLzaS4RUwWy9DqFXR8"
  },
  "sparks-sports-academy-pamulang": {
    "rating": 4.6,
    "reviewCount": 123,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Pamulang&query_place_id=ChIJ24np8iTlaS4RuKRm3SUQPO0"
  },
  "sparks-sports-academy-tanjung-duren": {
    "rating": 4.4,
    "reviewCount": 151,
    "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Tanjung+Duren&query_place_id=ChIJDc8Zi0_3aS4R5cJ4VAT8DiE"
  }
};
