# Mobile action hierarchy

## Primary
- Directions (or Search Maps for uncertain pins): filled green, widest action; always visible once a place is open because this is the next location action. Uses the existing honest destination helper.
- Search, age/area/activity filters and place cards: primary during discovery, not global buttons; they occupy the list context rather than competing with Directions inside details.

## Secondary
- Back to map: persistent text action next to Directions in mobile details; recovery is always reachable but visually quieter than the external navigation action. Returns to selected map card without clearing search.
- Details: outlined, narrower than Directions on selected map card; checks evidence before travel.
- All places: existing contextual top back link retains list-return behavior.
- Locate me: map-only circular utility; relevant when exploring nearby, not while reading details.
- Close selected card and sheet handle: reversible exit/resize controls; remain separate from travel CTA.
- Reset filters / Reset empty results: contextual recovery, shown only when needed.
- Age plus/minus and Any: contextual input controls, not competing global actions.

## Tertiary
- Share: quiet text/icon in card header, not a persistent competing pill.
- Toggle map style and Class guides: map-only utility/reference actions; no new bottom-bar clutter.
- Official site, Instagram, provider age/evidence links and conflict sources: inline links at the relevant evidence.
- Review source/dates, Why we list this, Report problem and Save local note: contextual disclosures/tools in the scroll flow, no global prominence.
- Phone remains plain contact information, not a newly introduced call action.
- Share modal close/copy/export actions are scoped to the existing modal and unchanged.

## Implementation and QA
A mobile-only footer is a flex sibling outside the detail scroll area, not a fixed overlay over content. It reserves its own height including safe-area bottom padding; handle stays at the top. Desktop Directions remains inline. No duplicated mobile Directions button.49 tests/typecheck/build pass.390px long Rockstar BSD card checked at middle and bottom, content/report reachable above footer, Directions/Back to map always visible, map-card exit and reopen work, no JS errors or horizontal overflow. No data, performance, eligibility or sharing semantics changed. Draft only.
