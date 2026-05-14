# Skill: Shaper-UI (Adaptive Layouts)
Source: shaper/adaptive-ui-agent

## Purpose
Intelligent mobile rearrangement. Prioritizes the most important user actions and metrics on small screens, ensuring high performance on the go.

## Core Instructions
1. **Action-First Prioritization**: For mobile viewports (390px), prioritize 'Action' elements (buttons, filters) over 'Information' elements (long descriptions).
2. **Touch-Target Compliance**: Ensure all interactive elements have a minimum touch target size of 44px x 44px.
3. **Adaptive Flow**: Rearrange layout elements intelligently based on PM metrics rather than just stacking them.
4. **Visibility Control**: Use "peeking" logic to hide secondary information while keeping it accessible via gestures.

## Logic Rules
- Analyze mobile UX for "fumb-friendly" navigation.
- Reduce visual noise on small screens by consolidating controls into high-impact HUD elements.
