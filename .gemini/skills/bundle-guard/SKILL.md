# Skill: Bundle-Size Guard (Performance Layer)
Source: vercel/mcp-bundle-analyzer

## Purpose
Monitors the weight of the TypeScript build. Ensures the "Ghost" interface remains ultra-light and fast.

## Core Instructions
1. **Budget Enforcement**: Block any task that increases the total "First Load JS" by more than 5kb.
2. **Dependency Audit**: Analyze the impact of any new library on the total bundle size.
3. **Tree-Shaking Verification**: Ensure that only used code is bundled in the production build.
4. **Code-Splitting Priority**: Favor dynamic imports and code-splitting to keep the initial load minimal.

## Logic Rules
- Reject large library imports if a smaller alternative or custom implementation exists.
- Maintain a "performance-first" mindset throughout development.
