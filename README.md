# Jakarta EV HUD — Logistics Dispatch Interface

A high-fidelity, interactive logistics dashboard designed for tracking and navigating to EV charging stations across Jakarta. This project serves as a technical demonstration of **Spatial-Logic** principles and **Antigravity RaaS (Robotics-as-a-Service)** design aesthetics.

![Live Deployment](https://img.shields.io/badge/Status-Live-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Design](https://img.shields.io/badge/Design-Zinc_Dark_Mode-09090b?style=for-the-badge)

## 🌌 The Concept
The **Jakarta EV HUD** is designed for the modern logistics dispatcher or EV owner who needs real-time spatial intelligence. Unlike generic map applications, this interface prioritizes **high-contrast telemetry** and **optimistic motion feedback**, providing a "command center" feel for Jakarta's urban swarm.

### Core Features:
- **Intelligent Proximity Engine**: Automatically calculates and sorts the closest charging stations based on the user's real-time position.
- **Urban Swarm ETA**: Real-time routing via OSRM (Open Source Routing Machine) with dynamic distance and duration calculations.
- **HUD-First Interactivity**: A minimalist dark interface (Zinc-950) that reduces visual fatigue and emphasizes critical data points like power output and connector types.
- **Optimized Mobile UX**: A responsive "Drawer" interface with hardware-accelerated transitions for seamless touch interaction.

## 🛠 Tech Decisions & Architecture

### 🗺️ Geospatial Logic (Leaflet.js)
- **Decision**: Used Leaflet.js over heavier alternatives for its performance and extensibility.
- **Implementation**: Custom SVG marker rendering with selective updates. Markers utilize `z-index` offsets and halo-pulse animations to maintain visual hierarchy during map movement.

### ⚡ Performance & Motion (Framer Motion)
- **Decision**: Implemented a "Motion-First" approach using Framer Motion for state transitions.
- **Optimization**: Utilized `will-change` hardware acceleration and debounced routing requests to maintain a consistent 60fps, even on low-power mobile devices.

### 🎨 Design System (RaaS Aesthetic)
- **Palette**: A curated Zinc-based dark mode (`#09090b` background) with high-visibility blue accents (`#3b82f6`) for active navigation elements.
- **Typography**: Plus Jakarta Sans for high readability in high-density data environments.

## 🚀 Deployment
This project is built as a **Static HTML Export** and is automatically deployed via **GitHub Actions**.

**Live URL**: [https://Derryl-Ditra.github.io/map-explora/](https://Derryl-Ditra.github.io/map-explora/)

---
*Built with precision for the Jakarta Logistics Ecosystem.*
