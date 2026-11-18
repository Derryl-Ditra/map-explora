# Feedback draft: comparison, fees and provider depth

18 November 2026. Draft only. No merge or deployment.

## Baseline and scope

Based on main f7e7e4a (the separately reviewed four-branch data release). There are 160 stored records, 148 public branches, 19 public branches with at least one sourced fee and 144 with a recorded rating. These are coverage counts, not a new check of opening status, price validity or every review. This PR changes presentation, not venue facts.

## Per-item assessment

| Request | Draft change | Effort / remaining work |
| --- | --- | --- |
| Compare places | EN/ID two-branch comparison, shareable selection, source-backed ages, fees, reviews and location. Map-first entry remains unchanged. Detail pages link to comparison with the first branch selected. | Medium UI work. Draft implemented; independent QC and owner review remain. No rankings or automatic cheapest recommendation. |
| Fee information | Replaces the outdated no-prices guide with all 19 priced public branches and a dynamic coverage count. Comparison exposes amount, product/unit, official versus partner source, notes, extras and read date. Missing means not recorded, never free. | Small-to-medium presentation work, implemented. Ongoing source research is separate; no current quote is promised. |
| More providers, especially small independents | No invented growth. This PR adds zero providers and zero branches. The daily source queue remains the delivery lane. Four newly released Kiddies88 sites are one provider, not four providers. | Ongoing evidence work, not solved by a UI change. Exact branch identity, operating evidence and Maps binding are required before publication. Ages need exact branch evidence to become verified. |
| Reviews as an initial look | Keeps reviews in map details; adds the same snapshot concept to EN/ID place pages and comparison, with source/read date, sample caveats and attributed customer concerns. Low-count ratings carry a warning. | Small UI work, implemented. No review scraping refresh, safety score or teaching-quality verdict. |

## Independent-provider queue

The existing branch-depth research ledger records the next gaps without treating leads as public additions:

- Kidzero: exact location conflict remains unresolved. Do not choose the convenient pin or turn partner template ages into eligibility.
- Jiico: operating evidence remains incomplete.
- Kayy Kiddoz / Sensoria: confirm enrichment versus care/therapy scope first.
- Bintaro Inline Skate: bind the exact site and program. General provider ages are not branch eligibility.
- Biruuu Jatisari: held after a temporary-closure label, not added.

These are prior research dispositions, not fresh claims that each is unchanged today. Re-read the original current sources before promoting a lead. See `2026-11-18-branch-depth.md` for evidence URLs, source dates and full reasons. Continue bounded public-source research without paid APIs or verification-page bypasses. Count unique providers separately from physical branches in future growth reports.

## Data and UX limits

- Existing venue data and source dates are untouched. A new page is not a new verification date.
- Branch brochures may be undated. Packages, session fees and play tickets are different products. Confirm extra charges, expiry and refund conditions before paying.
- Unconfirmed program notes and age conflicts remain visible, including specialist education context. Comparison does not make an age match or seat guarantee.
- Cautioned locations retain visible warnings and the existing map-link guard.
- Reviews may describe the whole facility rather than its under-5 class. Customer accounts are not verified findings.
- Public inventory excludes hidden and government-related records, including URL-selected IDs.
- No booking, outreach, paid API, merge or deploy is part of this draft.

## QC handoff

Check the exact remote head, not an earlier local tree. Run all tests, lint and production build; compare venue data against main. Inspect 320px, 390px and desktop EN/ID comparison, missing data, duplicate and hidden IDs, language switching, place-to-comparison entry, map return and fee sources. Inspect specialist-program and location warnings and both complaint notes and low-count review warnings. Owner review follows independent QC.
