// A dated, non-interactive snapshot. It is not the live map or a location fix.
const base = process.env.NODE_ENV === "production" ? "/map-explora" : "";
export default function MapPreview() {
  return (
    <div data-map-preview="true" role="status" className="absolute inset-0 bg-[#f6f3ec] overflow-hidden pointer-events-none">
      <picture>
        <source media="(min-width: 768px)" srcSet={`${base}/map-preview/desktop.webp`} />
        <img src={`${base}/map-preview/mobile.webp`} alt="Map preview of Jakarta, not yet interactive" fetchPriority="high" loading="eager" decoding="sync" {...{elementtiming: "map-preview"}} className="absolute inset-0 w-full h-full object-cover" />
      </picture>
      <div className="absolute left-1/2 -translate-x-1/2 top-24 md:top-6 bg-white/95 rounded-xl px-3 py-2 shadow-sm text-center text-xs text-[#51483d] max-w-[80vw]">
        <p className="font-semibold">Map preview - Jakarta</p>
        <p>Loading map for pan, zoom and place taps...</p>
      </div>
      <p className="absolute left-1 bottom-1 bg-white/95 px-1 text-[10px] text-[#51483d]">Preview Nov 12, 2026 · OpenFreeMap · © OpenMapTiles · © OpenStreetMap</p>
    </div>
  );
}
