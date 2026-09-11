# ASD-STE100 Before-and-After Transformation Examples

This document demonstrates typical non-compliant technical writing rewritten into ASD-STE100 compliance.

---

## Example 1: Procedural Maintenance Steps

### Non-STE (Original)
> In order to ensure optimal performance, the technician should begin by carefully verifying that the power switch is in the off position prior to utilizing the hex wrench to unscrew the five chassis retaining fasteners, which should subsequently be placed in a clean parts tray so they don't get lost.

**Violations**:
- Exceeds 20-word limit (52 words).
- Multiple instructions in a single sentence.
- Unapproved verbs and modals: *should*, *begin*, *verifying*, *prior to*, *utilizing*, *ensure*.
- Contraction: *don't*.
- Passive/indirect voice: *"the technician should..."*.

### ASD-STE100 (Compliant)
```text
1. Make sure that the power switch is in the OFF position.
2. Use a hex wrench to remove the 5 screws from the chassis.
3. Put the screws into a clean parts container.
```

**Why this is compliant**:
- 3 clear, sequential sentences.
- All sentences under 20 words (12 words, 11 words, 8 words).
- All steps start with imperative verbs (*Make sure*, *Use*, *Put*).
- All terms are approved (*use* instead of *utilize*, *remove* instead of *unscrew*, *container* instead of *parts tray*).

---

## Example 2: Descriptive / Technical Explanation

### Non-STE (Original)
> The aircraft cabin environmental control system primary air heat exchanger bypass valve assembly is utilized for modulating the bypass airflow when excessive differential pressure is detected across the matrix.

**Violations**:
- Noun cluster exceeds 3 nouns: *"aircraft cabin environmental control system primary air heat exchanger bypass valve assembly"* (11 consecutive nouns!).
- Passive voice: *"is utilized for modulating..."*, *"is detected"*.
- Verb participle: *modulating*.
- Unapproved vocabulary: *utilized*, *excessive*.

### ASD-STE100 (Compliant)
```text
The bypass valve assembly controls the airflow around the primary air heat exchanger. If the differential pressure across the heat exchanger core is too high, the valve opens to increase the bypass airflow.
```

**Why this is compliant**:
- Noun string disassembled using prepositional phrases.
- Active voice and simple present tense (*controls*, *opens*).
- Sentences are 14 and 20 words (both well under the 25-word limit for descriptive text).
- Condition precedes action/result (*"If the differential pressure... the valve opens..."*).

---

## Example 3: Safety Alert (Warning / Caution / Note)

### Non-STE (Original)
> CAUTION: Prior to touching the exposed circuit board components, personnel must be sure to ground themselves using an anti-static wrist strap, otherwise static electricity could damage the delicate microchips. Note that the wrist strap should be clipped to the chassis grounding post.

**Violations**:
- The hazard, consequence, and action are tangled together.
- Word count: 32 words in first sentence.
- Note contains an instruction (*"the wrist strap should be clipped..."*). NOTE must never contain instructions!
- Unapproved words: *prior to*, *delicate*, *could*.

### ASD-STE100 (Compliant)
```text
CAUTION: STATIC ELECTRICITY CAN CAUSE DAMAGE TO SENSITIVE COMPONENTS. ATTACH AN ESD WRIST STRAP TO THE CHASSIS GROUND POST BEFORE YOU TOUCH THE CIRCUIT BOARD.

NOTE: The ground post is adjacent to the power inlet.
```

**Why this is compliant**:
- Strict ASD-STE100 alert layout: Hazard condition & consequence first, corrective imperative action second.
- Noun use of *damage* (*cause damage to* rather than unapproved verb *damage*).
- NOTE contains only contextual reference information, with no imperative actions or requirements.
