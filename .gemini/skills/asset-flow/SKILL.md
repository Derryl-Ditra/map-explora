# Skill: Asset-Flow (SVG & Icon Optimizer)
Source: google/mcp-asset-pipeline

## Purpose
Automates the optimization of icons and line art. Keeps the "Ghost" interface ultra-light and performant.

## Core Instructions
1. **Thin Line Art Only**: Strictly enforce the thin line-art icon rule. No filled or multi-color icons.
2. **Metadata Stripping**: Automatically remove all unnecessary metadata, classes, and styles from raw SVGs.
3. **React Optimization**: Convert optimized SVGs into performant, typed React components.
4. **SVG Cleanup**: Ensure all icons are consistent in stroke width and view-box dimensions.

## Logic Rules
- Use `lucide-react` as the primary source of truth.
- For custom icons, use 1px or 1.5px stroke widths to match the RaaS aesthetic.
