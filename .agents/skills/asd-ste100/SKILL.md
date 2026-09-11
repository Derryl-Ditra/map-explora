---
name: asd-ste100
description: >-
  Apply the ASD-STE100 (Simplified Technical English) specification to write, edit,
  and audit technical documentation. Use this skill whenever the user asks to write,
  rewrite, or review text according to ASD-STE100, Simplified Technical English (STE),
  aerospace/defense technical documentation standards, or controlled English rules.
---

# Skill: ASD-STE100 (Simplified Technical English)

## Purpose
Enforces strict compliance with the ASD-STE100 specification (Simplified Technical English). ASD-STE100 is an international controlled language standard designed to remove ambiguity, eliminate translation errors, and ensure clear comprehension for non-native English speakers in technical, maintenance, and safety-critical documentation.

---

## Core Principles

1. **One Word, One Meaning, One Part of Speech**:
   - Use each approved word only with its designated meaning and designated grammatical category (e.g., *close* is an approved verb, never an adjective; use *near* for distance).
2. **Strict Sentence Length Limits**:
   - **Procedural sentences (instructions)**: Maximum **20 words**.
   - **Descriptive sentences (explanations)**: Maximum **25 words**.
3. **One Instruction per Sentence**:
   - State only one action per sentence, unless two actions must occur simultaneously.
4. **Paragraph Length**:
   - Maximum **6 sentences** per paragraph in descriptive text.
   - Use numbered or bulleted lists for all procedures.
5. **Active Voice & Imperative Mood**:
   - Use **imperative mood** for procedural steps (*"Remove the cover."*, *"Turn the switch to OFF."*).
   - Use **active voice** for descriptive text (*"The sensor detects pressure."*, not *"Pressure is detected by the sensor."*).
   - Reserve passive voice strictly for rare descriptive contexts where the actor is truly unknown.
6. **Noun Cluster Restriction**:
   - Maximum **3 consecutive nouns** in a noun phrase. If a string has 4 or more nouns, break it up with prepositions or restructure.
7. **Restricted Verb Tenses & Modals**:
   - Use only Simple Present, Simple Past, Simple Future (*will* for inevitable outcomes), and Imperative.
   - No continuous/progressive forms (`-ing` verbs).
   - Use **must** for mandatory requirements. Never use *shall*, *should*, or *ought to*.
   - Use **can** for capability/possibility.
   - Use **may** for permission.
8. **No Informal Language or Contractions**:
   - No contractions (*don't*, *can't*, *it's* are forbidden; use *do not*, *cannot*, *it is*).
   - No slang, idioms, metaphors, or vague qualifiers (*approximately*, *etc.*, *e.g.*, *i.e.*).

---

## Standard Safety Alerts Layout

ASD-STE100 mandates a strict sequence for safety messages (Hazard Condition -> Consequence -> Corrective Action):

- **WARNING**: Used when injury or loss of life is possible.
- **CAUTION**: Used when damage to equipment or data is possible.
- **NOTE**: Provides clarifying information only. **A NOTE must never contain an instruction or imperative action.**

```text
WARNING: HIGH VOLTAGE CAN CAUSE INJURY OR DEATH. DISCONNECT THE POWER SUPPLY BEFORE YOU TOUCH THE TERMINALS.

CAUTION: ELECTROSTATIC DISCHARGE CAN DAMAGE CIRCUIT BOARDS. WEAR AN ESD GROUNDING WRIST STRAP BEFORE HANDLING THE COMPONENT.

NOTE: The backup battery maintains system time for up to 48 hours.
```

---

## Step-by-Step Writing & Audit Workflow

When tasked with creating, revising, or validating text under ASD-STE100:

1. **Step 1: Structural Scan & Sentence Splitting**
   - Check sentence word counts. Split any procedural sentence over 20 words and any descriptive sentence over 25 words.
   - Ensure each procedural sentence contains only one directive.
2. **Step 2: Mood & Voice Verification**
   - Convert procedural sentences into the imperative mood (*"You must remove the bracket"* -> *"Remove the bracket"*).
   - Convert passive constructions into active voice.
3. **Step 3: Unravel Noun Clusters**
   - Identify chains of 4+ nouns. Break with prepositions (*"primary flight display bezel mounting screws"* -> *"mounting screws for the bezel of the primary flight display"*).
4. **Step 4: Controlled Vocabulary Substitution**
   - Replace unapproved verbs and synonyms with approved STE terms (see [Vocabulary Guide](./references/vocabulary-guide.md)).
   - Eliminate prohibited `-ing` participle constructions.
5. **Step 5: Ambiguity & Pronoun Audit**
   - Replace vague pronouns (*this*, *that*, *it*) with the specific noun.
   - Remove Latin abbreviations (*e.g.* -> *for example*, *i.e.* -> *that is*, *etc.* -> omit or specify).
6. **Step 6: Output Presentation**
   - Output the text using standard technical layout (numbered steps, conditional clauses first: *"If [condition], [imperative action]"*).

---

## Supplementary References

- [Grammar and Style Rules](./references/grammar-and-style.md): Detailed breakdown of the 53 writing rules, noun groups, punctuation, and clause positioning.
- [Vocabulary Guide](./references/vocabulary-guide.md): Common forbidden words and their approved ASD-STE100 replacements.
- [Before-and-After Examples](./examples/before-and-after.md): Realistic transformations of procedural, descriptive, and safety documentation.
