PROJECT CONTEXT: PERSONAL PORTFOLIO (The "Antigravity" Build)
1. Project Overview
Product Name: Al Ferro Portfolio (v2026) Owner: Al Ferro Putra Yusanda Role: Full Stack Developer, Video Editor, AI Engineer. Core Philosophy: "Spacious, Minimalist, Kinetic." A monochrome, typography-led digital experience where the content flows over a cinematic background. Design Reference: Local file @designInspo/inspo1.webp (Strict adherence to the vibe of this reference).

2. Tech Stack & Architecture
Framework: Next.js 14+ (App Router).

Language: TypeScript (Strict Mode).

Styling Engine: Tailwind CSS.

Component Library: ShadcnUI (Latest version).

Animation Engine (Crucial):

GSAP: For timeline-based complex animations, typography splits, and ScrollTrigger pinning.

Framer Motion: For layout transitions (AnimatePresence), scroll-triggered presence, and component-level micro-interactions.

State Management: Zustand (for global theme state & menu toggle).

Deployment: Vercel / Railway.

3. Design System & UI Rules
Theme: Dual-mode (Light/Dark).

Constraint: Colors must be strictly monochrome (Black, White, Grays).

Typography:

Primary Font: Sans-serif geometric (e.g., Geist, Inter, or Manrope).

Display Font: Strong, editorial style for headers.

Layout:

Spaciousness: Extensive padding-y (10rem+).

Negative Contrast: Text overlapping the navbar must invert visibility (mix-blend-mode: difference).

4. Key Functional Features
A. The "Central" Navbar
Trigger: Minimized "Hamburger" icon fixed at Top-Center.

Interaction: Click triggers a Full-Page Slide overlay using GSAP stagger for menu items.

Responsiveness: Maintain center alignment and ratio across devices.

B. Splash Screen & Page Transitions
Initial Load: Minimal typographical preloader.

Route Change: Framer Motion mode="wait" for smooth exit/enter transitions (no hard cuts).

C. Dynamic Scroll Presence
Mechanism: Elements translate-y and unblur (blur(10px) -> blur(0px)) upon entering the viewport.

5. Content Architecture
Section 1: Header / Hero (Video Background)
Visual Asset: Use local video file @designInspo/BG-HERO.mp4.

Behavior:

The video is Fixed/Sticky at the top viewport (z-index: 0 or negative).

Curtain Effect: The video remains static (or subtle parallax). As the user scrolls down, the "Main Content" wrapper (which has a solid background color and higher z-index) slides UP from the bottom, effectively covering/obscuring the video.

Content: Name "Al Ferro Putra Yusanda" and roles overlaying the video with clear typography.

Section 2: About (Personal)
Narrative: Informatics Student (Undip), AI/NLP focus, Video Editing background.

Transition: This is the first section that "slides over" the Hero video.

Section 3: Work Experience
Format: Minimal list with expandable details (Accordion style).

Data:

Machine Learning Lab Assistant (Undip).

Staff of Arts & Sports (HMIF).

Section 4: Projects (The Showcase)
Layout: Masonry or Horizontal Scroll.

Featured:

TemcyRun: Running collective platform.

WASKITA: HIV/AIDS Education App.

Bicycle Classification: Computer Vision/Object Detection.

Thesis: NLP Text Summarization for Indonesian News.

Section 5: Tech Stack & Skills
Visual: Marquee or Clean Grid.

Items: Next.js, React, TS, Python, GSAP, Framer Motion, Video Editing Tools.

Section 6: Footer
Content: Call to action, Social Links (LinkedIn, GitHub), Copyright 2026.

6. Implementation Prompts (For AI Agent)
"Configure the Hero section with position: fixed and z-index: 0 containing the @designInspo/BG-HERO.mp4. Ensure the video loops and covers the full viewport (h-screen)."

"Wrap the rest of the page content (About, Work, etc.) in a main tag with position: relative, z-index: 10, and a bg-background class (dynamic dark/light) so it slides over the fixed header naturally on scroll."

"Implement the Navbar using a Portal to ensure it sits above both the video and the content layer."

"Create a reusable ScrollSection component that wraps children in a Framer Motion div with a 'fade-up-and-unblur' variant."