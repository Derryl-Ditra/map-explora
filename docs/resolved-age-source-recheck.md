# Official age source recheck

Checked 5 November 2026. Separate draft, not a merge approval.

## Applied: Bright Little Stars

Only three learning-center records change. Eleven fully month-bounded class rows. No branch-wide range is substituted for a class. No changes to addresses, coordinates, review snapshots, operating status, other branches or UI.

- Kemang: Baby Blossoms 6-12 months, Giggles and Glows 12-18 months, Cuddle Bugs 18-24 months. The provider's [Little Sparkles page](https://www.brightlittlestarsedu.com/programs/little-sparkles) explicitly places this program at Kemang. Giggles and Glows and Cuddle Bugs have numeric month bounds in the prose. Baby Blossoms prose says 6 months and up; the adjacent provider class image supplies 6-12 months, not a conflicting lower age.
- Bintaro and BSD Learning Center: Incredible Infant 3-6 months, Brilliant Baby 6-12 months, Thriving Toddler 12-18 months, Talented Toddler 18-24 months. The provider's [Sensory Immersion page](https://www.brightlittlestarsedu.com/programs/sensory-immersion) explicitly names Bintaro and BSD. Actual provider class images were inspected for the names and numeric month bounds. BSD Preschool is a different record and receives no classes.
- Provider image evidence: [Baby Blossoms](https://images.squarespace-cdn.com/content/v1/627dcf6879247b260c0d0910/7c9f5806-a0e7-4ed4-9b3d-0847555456eb/14.png), [Giggles and Glows](https://images.squarespace-cdn.com/content/v1/627dcf6879247b260c0d0910/18e6ced2-7260-4ebe-8a26-385db2a4c358/15.png), [Incredible Infant](https://images.squarespace-cdn.com/content/v1/627dcf6879247b260c0d0910/57b41d1b-135a-4aa5-9f94-95b45c436b42/1.png), [Brilliant Baby](https://images.squarespace-cdn.com/content/v1/627dcf6879247b260c0d0910/c8a331f7-c14e-4546-9ad2-2548da57c8c2/2.png), [Thriving Toddler](https://images.squarespace-cdn.com/content/v1/627dcf6879247b260c0d0910/005bf7f4-7e73-4124-a573-cad1d726cf41/3.png), [Talented Toddler](https://images.squarespace-cdn.com/content/v1/627dcf6879247b260c0d0910/dd1afe6f-588b-485b-9733-9779ce81f85b/4.png).

## Not cleared by the recheck

- Rockstar: the [curriculum page](https://www.rockstaracademy.com/programs/early-childhood) gives Learn & Play 1 6-18 months, Learn & Play 2 19-35 months and Smartology 3-4 years. However the current [BSD](https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city), [Bintaro](https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro) and [Pejaten](https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten) branch grids retain 0-2 years, 1-3 years and 2-5 years. Crawler has a 6-18mo label beside 0-2 Years metadata. A curriculum fetch does not settle the branch disagreement. Existing Rockstar rows are unchanged, including the Gandaria conflict flags. No new year-to-month conversion.
- Aquatic Baby: the [same program page](https://aquatic-baby.com/program-1) still says 6 months to 2 years in its summary and 3 months to 2 years in the detail. The [FAQ](https://aquatic-baby.com/faq) and [homepage](https://aquatic-baby.com/) say 6 months, but do not remove the contradictory detail. The sourceConflict flag remains; no restrictive-bound workaround is newly applied.
- Aquababies: [About](https://aquababiesindonesia.id/about-us/) gives a method-wide 0 months to 3 years range; [FAQ](https://aquababiesindonesia.id/faq/) gives Hatchlings 0-5 months and Baby Level 1 6-17 months. The [location list](https://aquababiesindonesia.id/locations/) does not establish either class at Menteng or Bintaro. No branch ages or classes added.
- Funtastic Funny Bugs: [class page](https://thefuntasticgym.com/funnybugs/) gives 3-4 years, while the [Pondok Indah schedule](https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/) says 3 years. Exact upper-month inclusivity remains unresolved; unchanged.
- BLS whole-center ranges of six months or three months to five years are not exact class claims. Older groups with year-based/open bounds are not added.
- Sparks Teras Kota's existing brand-level provider-confirmed sensory flag is not proof of a branch-specific age level. The [Tangerang sensory page](https://academy.sparks-edu.com/kelas-sensori-bayi/tangerang/) lists a Teras Kota location but no numeric month bounds. Flag reported for review, not silently changed. It remains excluded by the UI's branch-level rule.
- Anak Air, Gymboree, KindyROO, StudioRenang and other proxy-only leads are not applied.

## Checks

66 tests, typecheck and production build pass. Actual 390px detail checks cover all three BLS learning centers, all 11 class rows and no horizontal overflow. Visible places remain 138. Verified class rows increase 54 to 65; places without verified programs fall 124 to 121, and without verified age evidence 123 to 120. Only source data, regression tests and this record change. Independent QC and a fresh user yes are required before merge.
