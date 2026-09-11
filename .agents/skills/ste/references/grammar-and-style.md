# ASD-STE100 Grammar and Style Rules

This document details the essential grammar, syntax, and layout rules defined by the ASD-STE100 specification (Issue 8/Current).

---

## 1. Sentence Structure & Length

### Rule 1.1: Maximum Sentence Length
- **Procedural sentences**: Maximum **20 words**.
- **Descriptive sentences**: Maximum **25 words**.
- Count hyphenated words as single words only if the compound is an approved term or standard technical unit.

### Rule 1.2: One Instruction per Sentence
- State only one action per sentence.
- *Non-STE*: "Remove the access panel and disconnect the electrical connector."
- *STE*: "Remove the access panel. Disconnect the electrical connector."
- *Exception*: Two actions that must occur simultaneously (*"Hold the valve and turn the locking nut."*).

### Rule 1.3: Paragraph Limits
- Descriptive paragraphs must not exceed **6 sentences**.
- Procedural text must be presented as sequential numbered or bulleted steps, never running paragraphs.

---

## 2. Voice, Mood, and Verbs

### Rule 2.1: Procedural Steps in Imperative Mood
- Every procedural step must start with an imperative verb (a command).
- *Non-STE*: "The technician should calibrate the sensor."
- *STE*: "Calibrate the sensor."

### Rule 2.2: Active Voice
- Use the active voice in both descriptive and procedural text.
- *Non-STE*: "The hydraulic fluid is filtered by the primary element."
- *STE*: "The primary element filters the hydraulic fluid."
- *Permitted Exception*: Passive voice is only allowed in descriptive text when the agent causing the action is unknown or irrelevant (e.g., *"The unit was damaged during transit."*).

### Rule 2.3: Approved Verb Forms and Tenses
- Permitted forms:
  - **Infinitive** / **Imperative**: *"Turn the screw."*
  - **Simple Present**: *"The valve opens when pressure increases."*
  - **Simple Past**: *"The light flashed twice."*
  - **Simple Future**: Using **will** only to express an inevitable consequence or result (*"The indicator will turn green."*).
- **Forbidden forms**:
  - Continuous / progressive forms (`-ing` forms like *is operating*, *was turning*).
  - Perfect forms (*has opened*, *had been installed*).
  - Conditional modals (*would*, *could*, *should*).

### Rule 2.4: Modal Verbs
Only three modal auxiliaries are approved in ASD-STE100:
- **must**: Mandatory action or requirement (*"You must obey all safety instructions."*).
- **can**: Capability or physical possibility (*"The module can store up to 50 logs."*).
- **may**: Permission (*"You may use solvent A or solvent B."*).
- **FORBIDDEN**: *shall*, *should*, *ought to*, *might*.

---

## 3. Noun Clusters & Technical Names

### Rule 3.1: Noun String Limit (The "Rule of Three")
- Do not string more than **three consecutive nouns** together.
- When four or more nouns appear in a sequence, break them apart using prepositions (*of*, *for*, *with*) or restructure the sentence.
- *Non-STE*: "Fuel pump system pressure relief valve adjustment screw." (7 nouns)
- *STE*: "Adjustment screw for the pressure relief valve of the fuel pump system."

### Rule 3.2: Technical Names and Technical Verbs
- A **Technical Name (TN)** is a recognized, standardized term for a component, tool, material, or phenomenon (e.g., *hex wrench*, *O-ring*, *Ohm*).
- A **Technical Verb (TV)** is a standardized engineering process verb with a defined technical meaning (e.g., *drill*, *ream*, *solder*).
- Always use the official nomenclature consistently. Do not invent informal abbreviations or nicknames.

---

## 4. Conditional Sentences & Instructions

### Rule 4.1: Condition First, Action Second
- State the condition before the instruction so the reader does not perform the action before confirming the prerequisite.
- *Non-STE*: "Replace the seal if you find cracks."
- *STE*: "If you find cracks, replace the seal."

### Rule 4.2: Clear Consequence Statements
- Keep results clearly distinct from actions.
- *Format*:
  ```text
  1. Push the test button.
     - The TEST LED illuminates.
  ```

---

## 5. Punctuation, Pronouns, and Ambiguity

### Rule 5.1: Unambiguous Pronouns
- Pronouns such as *it*, *this*, *that*, *these*, *those* frequently create ambiguity in technical writing.
- If there is any doubt about what a pronoun refers to, repeat the noun.
- *Non-STE*: "Disconnect the cable from the terminal and inspect it."
- *STE*: "Disconnect the cable from the terminal. Inspect the cable."

### Rule 5.2: No Contractions or Colloquialisms
- Never use contractions (*don't*, *can't*, *won't*, *it's*).
- Never use slang, buzzwords, or colloquial idioms (*run of the mill*, *ballpark*, *heads up*).

### Rule 5.3: Latin Abbreviations Forbidden
- Do not use *e.g.*, *i.e.*, *etc.*, *via*, *vs.*
- Use approved English equivalents:
  - *e.g.* -> *for example*
  - *i.e.* -> *that is*
  - *etc.* -> specify the full list or use *and so on* (where permitted)
