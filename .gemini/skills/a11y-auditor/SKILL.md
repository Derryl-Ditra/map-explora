# Skill: A11y Visual Auditor (Compliance Layer)
Source: google/a11y-mcp

## Purpose
Enables real-time WCAG 2.2/3.0 compliance checking. Ensures that high-contrast themes remain accessible and legible.

## Core Instructions
1. **Real-time Auditing**: Run accessibility checks before finalizing any UI component or layout.
2. **Contrast Verification**: Specifically verify the contrast ratios between RaaS Blue (#3B82F6), White (#FFFFFF), and Dark Gray (#0D0D0D).
3. **Keyboard Accessibility**: Verify that all custom Radix-based components are fully navigable via keyboard.
4. **ARIA Compliance**: Ensure all interactive elements have correct and descriptive ARIA roles.

## Logic Rules
- Fix any color contrast issues immediately.
- Ensure 4.5:1 ratio for normal text and 3:1 for large text/graphical elements.
