# Verified class visibility draft

Owner chose C with clarification: show high-confidence names and ages only, hide explanatory note lines; keep this draft unmerged. Data is not deleted. All 136 provider-listed places remain visible, including places with no verified class ages. This draft is separate from the mobile action hierarchy draft #27.

One shared rule drives detail rows, map preview and exact-age filter/counts: offered at this branch, provider-confirmed branch-level age evidence, source URL, finite complete ordered age bounds, no source conflict and no ambiguous note. Brand catalog ages do not establish branch eligibility. No inferred high-confidence tier is introduced.

Impact on main e380401:
- 110 offered class rows become 47 visible verified rows; 63 hidden.
- 127 of 136 places have no visible named class rows. One of those, Gymnademics Gading Serpong, retains a verified complete branch age statement.
- 126 have neither a visible named class nor a verified complete branch age statement. Details, list and map preview say "Class ages not verified yet". The absence of evidence is not an assertion that the branch offers no classes.
- Any age counter stays 136. With an age selected, confirmed plus unconfirmed remains 136, before other filters. Empty-evidence places never enter Confirmed for this age.
- Confirmed counts at 0/6/12/18/24/30/36/47/48/59 months are 0/10/10/8/8/8/8/6/6/1. 59 months was 6: five Rockstar branches previously matched ambiguous rows that are now hidden. Tests check all 60 months against the same visible evidence.
- "Age range unclear at this branch" and worst-case warnings from hidden rows are removed from preview; it reports whether verified age evidence is available. Location/identity caution remains unchanged.

QA: 54 tests, typecheck and production build pass locally. Actual 390px pixels inspected for verified Rockstar rows and English 1 Bintaro empty state. No dataset changes. No merge or deployment authorized.

Per owner clarification, row notes and source-disagreement prose are not rendered on the card. Underlying notes and source links remain intact in the dataset. Verification pass is scoped separately, not started.
