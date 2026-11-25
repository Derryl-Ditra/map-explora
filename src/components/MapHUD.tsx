"use client";
import {recordCompareOpen} from "@/utils/compareCounter";
import ComparePlaces from "./ComparePlaces";
import { VENUES } from "@/data/venues";
import { comparisonInventory, comparisonSelection } from "@/utils/comparePlaces";
import LocationNotice from "./ui/LocationNotice";

import { useState, useCallback, useEffect, useSyncExternalStore, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useVenueFilters } from "@/hooks/useVenueFilters";
import { VenueFilterState } from "@/types/venue";
import MobileDrawer from "./ui/MobileDrawer";
import ShareCard from "./ui/ShareCard";
import {ageBandLabel} from '@/utils/ageBands';
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { HelpCircle, Baby, Crosshair, Loader2, X } from "lucide-react";

// Dynamic import for the map (client-only)
const VectorMap = dynamic(() => import("./map/VectorMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#f6f2ec] flex flex-col items-center justify-center gap-3 text-[#6d675f]">
      <Loader2 className="w-8 h-8 text-[#1a7a4a] animate-spin" />
      <span className="text-sm font-semibold">Loading the map...</span>
    </div>
  ),
});


function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  );
}

const compareVenues = comparisonInventory(VENUES);

export default function MapHUD({initialCompare=false, compareLang="en"}:{initialCompare?:boolean;compareLang?:"en"|"id"}) {
  const [comparisonOpen,setComparisonOpen]=useState(initialCompare);
  const [comparisonLanguage,setComparisonLanguage]=useState(compareLang);
  const comparisonOrigin=useRef(false);
  const compareTrigger=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    const pop=()=>{const q=new URLSearchParams(location.search);setComparisonOpen(q.has("c") || q.get("compare")==="1" || /\/compare\//.test(location.pathname));};
    const open=(event:Event)=>{const id=(event as CustomEvent<string>).detail;const ids=comparisonSelection(compareVenues,id,null);if(!ids[0])return;compareTrigger.current=document.activeElement as HTMLElement;comparisonOrigin.current=true;const u=new URL(location.href);u.searchParams.delete("c");u.searchParams.set("compare","1");u.searchParams.set("a",ids[0]);u.searchParams.delete("b");const language=u.searchParams.get("shareLang")==="id"?"id":"en";setComparisonLanguage(language);history.pushState(history.state,"",u);recordCompareOpen();setComparisonOpen(true);};
    window.addEventListener("map-explora-compare",open);window.addEventListener("popstate",pop);const tick=requestAnimationFrame(pop);
    return()=>{cancelAnimationFrame(tick);window.removeEventListener("map-explora-compare",open);window.removeEventListener("popstate",pop);};
  },[]);
  useEffect(()=>{if(!comparisonOpen&&comparisonOrigin.current&&compareTrigger.current){compareTrigger.current.focus({preventScroll:true});compareTrigger.current=null;}},[comparisonOpen]);
  const closeComparison=(ids:[string,string])=>{if(comparisonOrigin.current){history.back();}else{const base=process.env.NODE_ENV==="production"?"/map-explora":"";const u=new URL(base+"/",location.origin);u.searchParams.set("shareLang",new URLSearchParams(location.search).get("shareLang")||compareLang);if(ids[0]&&!ids[1])u.searchParams.set("venue",ids[0]);location.assign(u);}};
  const {
    userPos,
    accuracy,
    hasActualLocation,
    isLocating,
    error: locationError,
    errorCode: locationErrorCode,
    recenterTick,
    locatedAt,
    refresh,
  } = useGeolocation();
  // Distances are only computed from a real fix. Without location
  // permission we must not imply proximity to the default map center.
  const { filters, updateFilter, resetFilters, categories, areas, confirmed, unconfirmed } =
    useVenueFilters(hasActualLocation ? userPos : null);
  const { activeVenue, showShareCard, mobileView, setMode: handleSetView, select: handleSelectVenue, close: handleClearActiveVenue, openShare, dismissToMap } = useAppNavigation();
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const showSidebarButton = useRef<HTMLButtonElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpMenu = useRef<HTMLDivElement>(null);
  const helpButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!helpOpen) return;
    const close = (event: PointerEvent) => { if (!helpMenu.current?.contains(event.target as Node)) setHelpOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [helpOpen]);
  // Mobile is map-first: the map is the default view. The list, search and
  // filters open from the "places" bar or the List toggle.

  const isDesktop = useIsDesktop();
  const showDetails = !!activeVenue;
  // Location notice: dismissible, auto-hides, never covers sheet controls.
  const [locationNoticeGone, setLocationNoticeGone] = useState(false);
  const [locationAttempt, setLocationAttempt] = useState(0);
  const handleLocate = useCallback(() => {
    setLocationNoticeGone(false);
    setLocationAttempt(n => n + 1);
    refresh();
  }, [refresh]);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented && activeVenue && !showShareCard) {
        event.preventDefault();
        handleClearActiveVenue();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [activeVenue, showShareCard, handleClearActiveVenue]);
  // Bumped when the area or activity filter changes so the map frames all matches.
  const [centerPlaceTick, setCenterPlaceTick] = useState(0);
  const [peekKey, setPeekKey] = useState<string | null>(null);
  const mapPeek = peekKey === (activeVenue?.id ?? "results");
  const handleCenterMap = () => {
    if (!activeVenue && confirmed.length + unconfirmed.length === 0) return;
    setPeekKey(activeVenue?.id ?? "results");
    if (activeVenue) setCenterPlaceTick(t => t + 1);
    else setFitTick(t => t + 1);
  };
  const [fitTick, setFitTick] = useState(0);
  // Bumped by the map Age pill: opens the list with the age panel ready.
  const [ageOpenTick, setAgeOpenTick] = useState(0);
  const listTouch = useRef<{ x: number; y: number } | null>(null);
  // Pin and list selections open the same detail page, without a preview state.
  const handleSelectFromList = (venue: Parameters<typeof handleSelectVenue>[0]) => {
    setPeekKey(null);
    setDesktopCollapsed(false);
    handleSelectVenue(venue);
  };
  // Each explicit locate attempt gets a fresh five-second notice window.
  useEffect(() => {

    if (!locationError || locationErrorCode===1) return;
    const t = setTimeout(() => setLocationNoticeGone(true), 5000);
    return () => clearTimeout(t);
  }, [locationError, locationErrorCode, locationAttempt]);

  // Choosing an area or activity moves the map to show every matching place.
  const handleUpdateFilter = useCallback(
    <K extends keyof VenueFilterState>(key: K, value: VenueFilterState[K]) => {
      updateFilter(key, value);
      if (key === "area" || key === "category") setFitTick((t) => t + 1);
    },
    [updateFilter]
  );
  const handleResetFilters = useCallback(() => {
    resetFilters();
    setFitTick((t) => t + 1);
  }, [resetFilters]);

  return (
    <><div inert={comparisonOpen} className="relative h-dvh w-screen bg-[#f6f2ec] overflow-hidden flex flex-col font-sans select-none">
      <h1 className="sr-only">Map Explora - Under-5 baby, toddler and preschool classes in Jakarta and Jabodetabek</h1>

      {/* Location permission notice: above the sheet on phones (never over
          Back/venue names), top-center on desktop. Dismissible, auto-hides. */}
      {locationError && !locationNoticeGone && !activeVenue && mobileView === "map" && (!isDesktop || desktopCollapsed) && (
        <div className="absolute bottom-[204px] md:bottom-auto md:top-4 left-1/2 -translate-x-1/2 z-[1001] w-[min(92vw,340px)]">
          <div className="bg-white border border-[#e7e0d4] rounded-xl pl-3 pr-1 py-1.5 text-sm text-[#4a443c] shadow-sm flex items-center gap-2">
            
            <LocationNotice message={locationError} denied={locationErrorCode===1} />
            <button
              type="button"
              onClick={() => setLocationNoticeGone(true)}
              aria-label="Dismiss location notice"
              className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[#6d675f] hover:text-[#221d18]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Map Canvas */}
      <div className="absolute inset-0 z-0">
        <VectorMap
          venues={[...confirmed, ...unconfirmed]}
          activeVenueId={activeVenue?.id || null}
          onSelectVenue={handleSelectFromList}
          userPos={userPos}
          showUserMarker={hasActualLocation}
          userAccuracy={accuracy}
          recenterTick={recenterTick}
          fitTick={fitTick}
          centerPlaceTick={centerPlaceTick}
        />
      </div>

      {/* Floating Map Controls (Top-Right) */}
      <div className="absolute top-4 right-4 z-[500] flex flex-col items-end gap-2">
        {/* Screen readers get the locate state; the visible control below
            carries the same meaning as an icon or short label. */}
        <span aria-live="polite" className="sr-only">
          {isLocating ? "Finding your location..." : hasActualLocation ? "Location available" : ""}
        </span>
        {isDesktop || hasActualLocation ? (
          /* Desktop stays icon-only. On phones the labeled pill below
             collapses to this same icon-only button once a real fix
             exists; from then on it only recenters the map. */
          <button
            type="button"
            onClick={handleLocate}
            disabled={isLocating}
            aria-label={hasActualLocation ? "Center on my location" : "Use my location"} title={hasActualLocation ? "Center on my location" : "Use my location"}
            className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#4a443c] hover:text-[#221d18] flex items-center justify-center gap-2 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#1a7a4a]"
          >
            {isLocating ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#1a7a4a]" />
            ) : (
              <Crosshair className="w-5 h-5" />
            )}
          </button>
        ) : (
          /* Phone, no fix yet: a labeled invitation. Hidden in the list
             view, where the list has its own locate button. */
          (!activeVenue && mobileView === "map") && (
            <button
              type="button"
              onClick={handleLocate}
              disabled={isLocating}
              className="min-h-12 px-4 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#14532d] text-[1rem] font-bold flex items-center gap-2 active:scale-95 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-[#1a7a4a]"
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#1a7a4a]" />
              ) : (
                <Crosshair className="w-4 h-4 text-[#1a7a4a]" />
              )}
              Use my location
            </button>
          )
        )}

        <div ref={helpMenu} className="relative" onKeyDown={(event) => { if(event.key === "Escape") { event.stopPropagation(); setHelpOpen(false); helpButton.current?.focus(); } }}>
          <button ref={helpButton} type="button" aria-label="Guides and information" aria-expanded={helpOpen} aria-controls="map-help-menu" onClick={() => setHelpOpen(open => !open)} className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#4a443c] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#1a7a4a]">
            <HelpCircle className="w-5 h-5" />
          </button>
          {helpOpen && <nav id="map-help-menu" aria-label="Additional information" className="absolute right-0 top-14 w-56 rounded-2xl border border-[#e7e0d4] bg-[#f6f2ec] p-2 shadow-lg text-[#14532d] text-sm font-semibold">
            <Link href="/activities/" className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white focus-visible:outline-2">Class guides</Link>
            <Link href="/venues.json" className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white focus-visible:outline-2">Sources and public data</Link>
            <Link href="/contact/" className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white focus-visible:outline-2">Contact</Link>
          </nav>}
        </div>
      </div>

      {desktopCollapsed && <button ref={showSidebarButton} type="button" aria-controls="places-sidebar" aria-expanded={false} onClick={() => setDesktopCollapsed(false)} className="hidden md:flex absolute top-16 left-6 z-[500] min-h-12 px-4 items-center rounded-full bg-[#f6f2ec] border border-[#e7e0d4] shadow-md text-[#14532d] font-bold">Show sidebar</button>}

      {/* Phone: one Age pill on the map, so a child's age is one tap away. */}
      {((!activeVenue && mobileView === "map") || (isDesktop && desktopCollapsed)) && (
        <button
          type="button"
          onClick={() => { if (isDesktop) setDesktopCollapsed(false); handleSetView("list"); setAgeOpenTick((t) => t + 1); }}
          aria-label="Set your child's age"
          className={`${desktopCollapsed ? "md:flex md:top-32 md:left-6" : "md:hidden"} absolute top-4 left-4 z-[500] min-h-12 px-4 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#14532d] text-[1rem] font-bold flex items-center gap-2 active:scale-95`}
        >
          <Baby className="w-4 h-4 text-[#1a7a4a]" />
          {filters.ageBand === null ? "Age" : ageBandLabel(filters.ageBand)}
        </button>
      )}

      {/* Mobile-Native Bottom Sheet / Desktop Floating HUD */}
      <MobileDrawer
        desktopCollapsed={desktopCollapsed}
        mapPeek={mapPeek}
        onExpandDetails={() => setPeekKey(null)}
        onCenterMap={handleCenterMap}
        onHideSidebar={() => { setDesktopCollapsed(true); requestAnimationFrame(() => showSidebarButton.current?.focus()); }}
        confirmed={confirmed}
        unconfirmed={unconfirmed}
        activeVenue={activeVenue}
        onSelectFromList={handleSelectFromList}
        showDetails={showDetails}
        ageOpenTick={ageOpenTick}
        filters={filters}
        onUpdateFilter={handleUpdateFilter}
        onResetFilters={handleResetFilters}
        categories={categories}
        areas={areas}
        onOpenShare={openShare}
        onDismissToMap={dismissToMap}
        onLocate={handleLocate}
        locationNotice={locationError && !locationNoticeGone ? locationError : null}
        locationDenied={locationErrorCode===1}
        onDismissLocationNotice={() => setLocationNoticeGone(true)}
        isLocating={isLocating}
        hasActualLocation={hasActualLocation}
        mobileView={mobileView}
        onSetMobileView={handleSetView}
      />

      {!activeVenue && mobileView === "map" && (
        <button type="button" onClick={() => handleSetView("list")} onTouchStart={(event) => {
            const touch = event.touches.length === 1 ? event.touches[0] : null;
            listTouch.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
          }} onTouchCancel={() => { listTouch.current = null; }} onTouchEnd={(event) => {
            const start = listTouch.current, end = event.changedTouches[0];
            listTouch.current = null;
            // A completed sheet swipe can suppress the browser's next synthetic
            // click. Activate a real tap directly; never activate a drag.
            if (start && end && Math.hypot(end.clientX - start.x, end.clientY - start.y) < 10) {
              event.preventDefault(); handleSetView("list");
            }
          }} className="touch-manipulation md:hidden absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-4 right-4 z-[500] min-h-14 rounded-2xl bg-[#f6f2ec] border border-[#e7e0d4] shadow-md text-[#1a7a4a] font-bold">
          List · {confirmed.length} {confirmed.length === 1 ? "place" : "places"}
        </button>
      )}

      {/* Meta Threads Share Card Modal */}
      {showShareCard && activeVenue && (
        <ShareCard
          venue={activeVenue}
          onClose={handleClearActiveVenue}
        />
      )}
    </div>{comparisonOpen&&<ComparePlaces venues={compareVenues} lang={comparisonLanguage} initialFix={hasActualLocation&&userPos&&locatedAt?{lat:userPos[0],lng:userPos[1],at:locatedAt,accuracy:accuracy||0}:null} onBack={closeComparison}/>}</>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
