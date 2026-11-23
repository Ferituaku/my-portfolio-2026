# Liquid Orbit Implementation Plan

**Goal:** Replace the initial ripple with the approved liquid orbit.
**Architecture:** Render the motion graph as a small vector animation. Keep the existing root layout mount and dismiss on poster readiness.
**Tech stack:** React, SVG, CSS and Framer Motion.
**Spec:** ../specs/2026-11-23-liquid-orbit-design.md

- [ ] Build the three intersecting orbits and the static reduced-motion pose.
- [ ] Decode the real hero poster with a bounded wait. Release on other routes immediately after mount.
- [ ] Check mobile, tablet, desktop, poster failure, slow response and animation continuity.
