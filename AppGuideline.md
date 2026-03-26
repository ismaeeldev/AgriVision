# AgriVision Android App - Premium Styling & Feature Guideline

This document serves as the single source of truth for translating the premium, web-based SaaS architecture of AgriVision into a native Android Application. The goal is to ensure 100% visual consistency, physics-based animations, and a high-end "biotech/agritech" feel across platforms.

## 1. Color Palette & Theming (Compose Colors / colors.xml)

The app utilizes the same earthy, agriculture-inspired palette, elevated by high-contrast premium UI concepts.

### Core Colors
*   **Deep Agriculture Green (Primary Backgrounds / App Bars / Bottom Sheets)**
    *   Hex: `#1B5E20`
    *   Usage: Grounds the design. Used for heavy contrast areas or primary branding headers.
*   **Fresh Leaf Green (Accents / CTAs / Fabs / Highlights)**
    *   Hex: `#4CAF50`
    *   Usage: Primary buttons, active states, glowing accents, and trailing highlighted words in typography.
*   **Golden Wheat (Premium Accents)**
    *   Hex: `#C9A227`
    *   Usage: Star ratings, critical trust markers, warnings, and special iconography.

### Surface & Background Tones (Light/Dark Mode considerations)
*   **Main Background**: Pure White (`#FFFFFF`) or off-white (`#FAFAFA`).
*   **Dark Mode Background**: Deep Forest/Black tint (`#08120A`).
*   **Glassmorphism (Dark)**: Translucent overlays (`#1AFFFFFF`) with subtle borders (`1dp` border of `#1AFFFFFF`).
*   **Glassmorphism (Light)**: High opacity white (`#B3FFFFFF`) with heavy blur and a white stroke (`#66FFFFFF`).

## 2. Typography

We prioritize incredibly bold, striking typography to emulate top-tier tech presentations (like Apple or Stripe apps).

*   **Typeface**: Integrate a modern geometric sans-serif (e.g., **Inter** or **SF Pro/Roboto Flex**). Do not use the standard, stiff default Android font without customization.
*   **Section Headers (H1/H2) - `MaterialTheme.typography.h3/h4` equivalents**:
    *   Weight: Extremely Bold (`FontWeight.ExtraBold` or `800`).
    *   Tracking: Tight spacing (`letterSpacing = (-0.5).sp`).
    *   Layout styling: Frequent use of dual-tone text (e.g., standard text color but the final keyword is styled `color = Color(0xFF4CAF50)`).
*   **Subheaders & Labels (Overlines)**:
    *   Uppercase with heavy tracking (`letterSpacing = 2.sp`).
    *   Text color: Muted foreground (`alpha = 0.7f` or `Color(0xFF1B5E20).copy(alpha = 0.7f)` for light mode).

## 3. Component Architecture & Shapes

**Rule: No Sharp Corners.** The app strictly uses heavily rounded corners to imply modern safety and biotechnology.

*   **Primary Cards (Products, Disease Results)**:
    *   Border Radius: `RoundedCornerShape(16.dp)` to `RoundedCornerShape(24.dp)`.
    *   Internal Padding: Lavish use of whitespace (`16.dp` to `24.dp` padding minimum).
*   **Giant Layout Blocks (Bottom Sheets, Modal Drawers)**:
    *   Border Radius: Massive top rounding `RoundedCornerShape(topStart = 40.dp, topEnd = 40.dp)`.
*   **Buttons, Badges, & FABs**:
    *   Exclusively fully rounded pills (`CircleShape`).
    *   Badges should use tinted backgrounds (e.g., `#334CAF50` background with `#4CAF50` text).

## 4. Depth & Lighting (Shadows & Glass)

Avoid flat design. The premium feel relies on depth, lighting, and ambient blurs.

*   **Interaction Shadows**: Instead of standard Android hard black elevations, use custom drawn soft shadow modifiers with massive spread and low alpha (e.g., simulating a `blur radius` of `40px` and `0.1` alpha opacity).
*   **Background Orbs/Glows**: Behind glassmorphism cards, draw absolute radial gradient colored blurs (e.g., a massive green glowing circle with `Modifier.blur(80.dp)`) to prevent dark backgrounds from looking flat.
*   **Blur Effects**: Utilize Jetpack Compose `Modifier.blur()` (API 31+) or `RenderEffect` to achieve authentic frosted glass overlays for floating navigation or sticky headers.

## 5. Animation & Physics (The "Framer Motion" Engine for Android)

Animations MUST be physics-driven using Springs. Eliminate linear, "snappy", or stiff Android UI jank.

*   **Spring Physics System**: Use Jetpack Compose `spring()` animations.
    *   `dampingRatio = Spring.DampingRatioMediumBouncy` or `NoBouncy` depending on mass.
    *   `stiffness = Spring.StiffnessLow` to match the web's mass of 1.2.
*   **Scroll Reveal (General Content)**: As items enter the `LazyColumn`, they should animate their `alpha` from `0f -> 1f` and `translationY` from `40.dp -> 0.dp` with a gentle spring.
*   **Touch/Press Interactions**: Buttons and cards should scale down under the finger (`Modifier.scale` targets `0.95f` on press) and spring back to `1.0f` on release.
*   **The "Scroll Stack" (Macro-layout)**: To emulate the web's defining scrolling feature, implement custom `LazyList`/`Pager` logic where elements scrolling out of the view towards the top scale down (`0.9f`), lose brightness, and become heavily blurred, sitting "behind" the currently active card.

## 6. Core Feature Parity Requirements

To serve the exact same feature set as the web platform, the app must include:

1.  **AI Crop Doctor (Dual Mode)**:
    *   A seamless, highly animated toggle between a familiar Conversational Chat interface and an intelligent Camera Scanner mode.
2.  **Immersive AR/Camera Scanner**:
    *   Full-bleed edge-to-edge camera viewfinder.
    *   Animated overlay graphics (scanning reticles, corner brackets).
    *   Haptic Feedback (Vibrations) synced to successful scans and AI analysis completion.
3.  **Product E-Commerce Platform**:
    *   Dynamic Product Grid with smooth, animated re-ordering when filtering tags are selected.
    *   Shared Element Transitions seamlessly expanding a grid item into its full Product Detail Page natively.
    *   Animated, expandable native search bar.

## 7. Recommended Android Stack

*   **UI Toolkit**: Jetpack Compose (Mandatory to achieve the required layout fluidity, blurs, and spring animations).
*   **Architecture**: MVVM with Kotlin Coroutines/StateFlow.
*   **Camera API**: CameraX (for lifecycle-aware image analysis).
*   **Image Loading**: Coil (ensure crossfade transitions are enabled for all remote images).