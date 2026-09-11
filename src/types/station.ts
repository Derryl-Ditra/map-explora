export type ParkingAccessType = 'Surface' | 'Basement' | 'Curbside' | 'Dedicated Hub';

export type ChargerCategory = 'Ultra Fast' | 'Fast' | 'Medium' | 'Standard';

export interface ChargingStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  power: string;
  kw: number;
  brand: string;
  connectors: ('CCS2' | 'Type 2' | 'CHAdeMO')[];
  parking_type: ParkingAccessType;
  height_clearance_m: number; // e.g. 99 for open sky, 2.1 for basement
  bay_length_m: number;       // e.g. 5.5 for long MPV, 4.8 for standard
  denza_approved: boolean;    // true if open surface or clearance >= 2.2m & bay >= 5.3m & kw >= 50
  open_data: boolean;         // public verified open dataset
  address: string;
  operating_hours: string;
  fee_per_kwh: number;        // in IDR
  fee?: number;               // legacy compatibility
  is_gated?: boolean;
  reliability?: number;
  type?: ChargerCategory | string;
  distance?: number;          // in km (calculated)
  eta?: number;               // in minutes (calculated)
}

export interface StationFilterState {
  searchQuery: string;
  minKw: number;
  surfaceOnly: boolean;
  denzaOnly: boolean;
  connector: 'ALL' | 'CCS2' | 'Type 2' | 'CHAdeMO';
}
