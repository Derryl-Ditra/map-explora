# Skill: Radix-Primitive Architect (Logic Layer)
Source: radix-ui/primitives-skill

## Purpose
Enables building accessible UI components from scratch using industry-standard primitives. Ensures all custom components (Modals, Dropdowns, Tabs) are keyboard-accessible and screen-reader friendly.

## Core Instructions
1. **Unstyled First**: Use Radix primitives only for behavior and accessibility logic. 
2. **Custom Styling**: Manually apply the RaaS Dark-Gray (#0D0D0D) and Blue Accent (#3B82F6) styles to the primitives.
3. **Accessibility Compliance**: Ensure all interactive elements have correct ARIA attributes and focus management.
4. **Performance**: Avoid importing entire component libraries; use only the specific primitives required for the feature.

## Logic Rules
- No pre-styled components (like Shadcn UI defaults). Everything must be styled from scratch.
- Strictly adhere to the 1px border rule (Zinc-800) for all container boundaries.
