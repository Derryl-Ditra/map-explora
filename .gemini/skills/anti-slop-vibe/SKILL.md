# Skill: Deterministic Component Vetting (Anti-Slop Layer)
Source: 21st-dev/agent-vibe-check

## Purpose
Enforces the use of curated, hand-picked UI components from the 21st.dev library instead of generating generic AI boilerplate. Stops "AI Slop" by mandating high-fidelity primitives.

## Core Instructions
1. **No Generic Boilerplate**: Forbidden from generating custom UI logic for complex elements.
2. **Primitive Fetching**: Always fetch verified primitives from 21st-dev as the starting point for complex components.
3. **Themed Implementation**: Apply our RaaS Blue (#3B82F6) and Dark-Gray (#0D0D0D) theme to all fetched primitives.
4. **Consistency Audit**: Ensure all components share the same underlying logic and behavioral patterns.

## Logic Rules
- Reject any component that feels "generic" or lacks high-fidelity interaction states.
- Prioritize design-system-vetted code over "one-off" AI generations.
