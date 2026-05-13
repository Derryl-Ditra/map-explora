# Skill: Motion-First Orchestration (Vibe Layer)
Source: framer/motion-mcp (Official)

## Purpose
Enables buttery smooth transitions and micro-interactions. Reduces "perceived latency" in RaaS prototypes by providing immediate, high-fidelity visual feedback.

## Core Instructions
1. **Spring Physics**: All animations must use the spring physics model for a crisp, high-end feel.
   - Default Config: `{ stiffness: 400, damping: 30 }`
2. **Orchestrated Transitions**: Coordinate entry and exit animations across components to create a unified user flow.
3. **Micro-Interactions**: Apply motion to button states, hover effects, and layout changes to enhance the premium feel.
4. **Latency Reduction**: Use optimistic motion to mask background processing time.

## Logic Rules
- Prefer `framer-motion` for complex layout transitions.
- Ensure all motion is "meaningful" and doesn't distract from the core task.
- Enforce the RaaS Blue accent in active motion states.
