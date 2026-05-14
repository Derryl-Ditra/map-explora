const query = `[out:json][timeout:25];(node["amenity"="charging_station"](-6.4,106.6,-6.0,107.0););out body;`;

fetch('https://overpass.kumi.systems/api/interpreter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'data=' + encodeURIComponent(query)
})
.then(r => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
})
.then(d => {
  console.log('Total stations found:', d.elements.length);
  d.elements.forEach(e => {
    console.log(JSON.stringify({
      id: e.id,
      lat: e.lat,
      lon: e.lon,
      name: e.tags?.name || 'Unnamed',
      operator: e.tags?.operator || 'Unknown',
      brand: e.tags?.brand || '',
      socket_type2: e.tags?.['socket:type2'] || '',
      socket_chademo: e.tags?.['socket:chademo'] || '',
      socket_ccs2: e.tags?.['socket:ccs2'] || '',
      capacity: e.tags?.capacity || '',
      opening_hours: e.tags?.opening_hours || ''
    }));
  });
})
.catch(e => console.error('Error:', e.message));
