export interface ChargingStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  power: string;
  kw: number;
  brand: string;
  connectors: string[];
  is_gated: boolean;
  fee: number;
  reliability: number;
  type: 'Ultra Fast' | 'Fast' | 'Medium' | 'Standard';
}

export const STATIONS: ChargingStation[] = [
    // --- ULTRA FAST HUBS (200kW+) ---
    { id: 'ufc-01', name: 'SPKLU Menara Danareksa', lat: -6.1834, lng: 106.8248, power: '200kW', kw: 200, brand: 'PLN', connectors: ['CCS2'], is_gated: true, fee: 10000, reliability: 98, type: 'Ultra Fast' },
    { id: 'ufc-02', name: 'SPKLU PLN UID Jakarta Raya (Gambir)', lat: -6.1751, lng: 106.8271, power: '150kW', kw: 150, brand: 'PLN', connectors: ['CCS2', 'CHAdeMO'], is_gated: false, fee: 0, reliability: 95, type: 'Ultra Fast' },
    { id: 'ufc-03', name: 'SPKLU Kantor Pusat PLN', lat: -6.2372, lng: 106.8014, power: '100kW', kw: 100, brand: 'PLN', connectors: ['CCS2', 'Type 2'], is_gated: true, fee: 5000, reliability: 92, type: 'Fast' },

    // --- STRATEGIC MALL CLUSTERS (Gated / Paid) ---
    { id: 'mall-01', name: 'Plaza Indonesia (P2)', lat: -6.1919, lng: 106.8229, power: '22kW', kw: 22, brand: 'Starvo', connectors: ['Type 2'], is_gated: true, fee: 5000, reliability: 88, type: 'Medium' },
    { id: 'mall-02', name: 'Senayan City (B1)', lat: -6.2272, lng: 106.7972, power: '50kW', kw: 50, brand: 'Voltron', connectors: ['CCS2'], is_gated: true, fee: 5000, reliability: 90, type: 'Fast' },
    { id: 'mall-03', name: 'Gandaria City', lat: -6.2443, lng: 106.7836, power: '50kW', kw: 50, brand: 'Starvo', connectors: ['CCS2', 'Type 2'], is_gated: true, fee: 5000, reliability: 85, type: 'Fast' },
    { id: 'mall-04', name: 'Mall Kelapa Gading', lat: -6.1585, lng: 106.9089, power: '22kW', kw: 22, brand: 'PLN', connectors: ['Type 2'], is_gated: true, fee: 4000, reliability: 82, type: 'Medium' },
    { id: 'mall-05', name: 'Central Park Mall', lat: -6.1774, lng: 106.7919, power: '50kW', kw: 50, brand: 'Starvo', connectors: ['CCS2'], is_gated: true, fee: 5000, reliability: 87, type: 'Fast' },
    { id: 'mall-06', name: 'Pacific Place', lat: -6.2246, lng: 106.8097, power: '22kW', kw: 22, brand: 'Bluebird', connectors: ['Type 2'], is_gated: true, fee: 10000, reliability: 94, type: 'Medium' },

    // --- SHELL RECHARGE (Premium Gas Stations) ---
    { id: 'shell-01', name: 'Shell Recharge Fatmawati', lat: -6.2734, lng: 106.7967, power: '50kW', kw: 50, brand: 'Shell', connectors: ['CCS2'], is_gated: false, fee: 0, reliability: 96, type: 'Fast' },
    { id: 'shell-02', name: 'Shell Recharge S. Parman', lat: -6.1852, lng: 106.7915, power: '50kW', kw: 50, brand: 'Shell', connectors: ['CCS2'], is_gated: false, fee: 0, reliability: 95, type: 'Fast' },
    { id: 'shell-03', name: 'Shell Recharge Antasari', lat: -6.2624, lng: 106.8065, power: '50kW', kw: 50, brand: 'Shell', connectors: ['CCS2'], is_gated: false, fee: 0, reliability: 93, type: 'Fast' },

    // --- PLN LOCAL HUBS ---
    { id: 'pln-01', name: 'SPKLU PLN Bandengan', lat: -6.1364, lng: 106.8021, power: '50kW', kw: 50, brand: 'PLN', connectors: ['CCS2', 'CHAdeMO'], is_gated: false, fee: 0, reliability: 89, type: 'Fast' },
    { id: 'pln-02', name: 'SPKLU PLN Senen', lat: -6.1747, lng: 106.8436, power: '22kW', kw: 22, brand: 'PLN', connectors: ['Type 2'], is_gated: false, fee: 0, reliability: 80, type: 'Medium' },
    { id: 'pln-03', name: 'SPKLU Bulungan', lat: -6.2447, lng: 106.7946, power: '22kW', kw: 22, brand: 'PLN', connectors: ['Type 2'], is_gated: false, fee: 0, reliability: 85, type: 'Medium' },
    { id: 'pln-04', name: 'SPKLU PLN Kebon Jeruk', lat: -6.1924, lng: 106.7672, power: '50kW', kw: 50, brand: 'PLN', connectors: ['CCS2'], is_gated: false, fee: 0, reliability: 91, type: 'Fast' },
    { id: 'pln-05', name: 'SPKLU PLN Lenteng Agung', lat: -6.3324, lng: 106.8345, power: '22kW', kw: 22, brand: 'PLN', connectors: ['Type 2'], is_gated: false, fee: 0, reliability: 78, type: 'Medium' },

    // --- EMERGING PRIVATE NETWORKS ---
    { id: 'pvt-01', name: 'Hotel Indonesia Kempinski', lat: -6.1952, lng: 106.8231, power: '22kW', kw: 22, brand: 'Voltron', connectors: ['Type 2'], is_gated: true, fee: 15000, reliability: 97, type: 'Medium' },
    { id: 'pvt-02', name: 'Gedung Medco Ampera', lat: -6.2824, lng: 106.8189, power: '50kW', kw: 50, brand: 'Medco', connectors: ['CCS2'], is_gated: true, fee: 5000, reliability: 90, type: 'Fast' },
    { id: 'pvt-03', name: 'Tunas Toyota Kebayoran Lama', lat: -6.2251, lng: 106.7794, power: '7kW', kw: 7, brand: 'Toyota', connectors: ['Type 2'], is_gated: true, fee: 0, reliability: 88, type: 'Standard' },
    { id: 'pvt-04', name: 'Hyundai Stargazer Center', lat: -6.2145, lng: 106.8123, power: '50kW', kw: 50, brand: 'Hyundai', connectors: ['CCS2'], is_gated: true, fee: 0, reliability: 94, type: 'Fast' },

    // --- NORTH JAKARTA ---
    { id: 'north-01', name: 'PIK Avenue', lat: -6.1114, lng: 106.7389, power: '50kW', kw: 50, brand: 'Starvo', connectors: ['CCS2'], is_gated: true, fee: 5000, reliability: 89, type: 'Fast' },
    { id: 'north-02', name: 'Ancol Park & Charge', lat: -6.1245, lng: 106.8323, power: '22kW', kw: 22, brand: 'PLN', connectors: ['Type 2'], is_gated: true, fee: 25000, reliability: 75, type: 'Medium' },

    // --- EAST JAKARTA ---
    { id: 'east-01', name: 'AEON Mall JGC', lat: -6.1667, lng: 106.9612, power: '50kW', kw: 50, brand: 'PLN', connectors: ['CCS2'], is_gated: true, fee: 5000, reliability: 91, type: 'Fast' },
    { id: 'east-02', name: 'TMII Entrance Hub', lat: -6.3012, lng: 106.8923, power: '22kW', kw: 22, brand: 'PLN', connectors: ['Type 2'], is_gated: true, fee: 10000, reliability: 84, type: 'Medium' }
];
