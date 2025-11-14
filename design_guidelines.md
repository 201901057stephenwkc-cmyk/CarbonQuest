# CarbonQuest Mobile App - Design Guidelines

## Design Approach
**Reference-Based Gaming + Sustainability Hybrid**
Drawing inspiration from:
- **Duolingo** (streak mechanics, achievement celebration, progress visualization)
- **Pokémon GO** (quest/mission cards, boss battle aesthetics)
- **Habitica** (gamified task management, character progression)
- **Notion** (clean card layouts, organized information hierarchy)

Combining playful gaming energy with eco-conscious design to create an engaging yet purposeful experience for Gen Z users.

## Typography
- **Primary Font**: Outfit (Google Fonts) - geometric, modern, friendly
  - Headings: 700 (Bold) for dashboard stats, 600 (SemiBold) for quest titles
  - Body: 400 (Regular) for descriptions, 500 (Medium) for CTAs
- **Accent Font**: Space Grotesk for XP numbers, level indicators, and achievement badges
- **Scale**: Base 16px, H1: 32px, H2: 24px, H3: 20px, Body: 16px, Small: 14px, Micro: 12px

## Layout & Spacing
**Tailwind spacing primitives: 2, 4, 6, 8, 12, 16**
- Card padding: p-4 or p-6
- Section spacing: space-y-4 for tight groups, space-y-8 for distinct sections
- Screen margins: px-4 standard, safe area padding for mobile
- Tap targets: minimum h-12 (48px) for all interactive elements

## Component Library

### Navigation
**Bottom Tab Bar** (fixed, 5 icons):
Home (dashboard), Quests, Battle, Leaderboard, Profile
- Height: 64px with safe area padding
- Icons: Heroicons outline (inactive), solid (active)
- Active indicator: subtle glow effect + icon weight change

### Dashboard Cards
**Category Cards** (Transport, Food, Energy, Consumption):
- Rounded corners (rounded-2xl)
- Icon badge at top-left
- Level badge at top-right
- Streak counter with flame icon
- Progress ring visualization around category icon
- Subtle gradient background per category (Transport: blue gradient, Food: green, Energy: yellow, Consumption: purple)

**XP Progress Card** (prominent top card):
- Large progress bar with animated fill
- Current XP / Next level displayed above
- Level number in large accent font
- Celebratory particle effects on level-up (micro-animation)

**World Health Meter**:
- Horizontal progress bar with planet Earth icon
- Percentage displayed prominently
- Subtle pulse animation when active
- Community contribution count below

### Quest System
**Quest Cards** (scrollable list):
- Compact card design (rounded-xl, p-4)
- Quest icon on left
- Title + progress fraction (2/3 completed)
- Star reward indicator on right
- Progress bar at bottom
- "Mark Complete" button (full width when expanded)
- Swipe-to-complete gesture support

**Quest Detail Modal**:
- Full-screen overlay (slide up animation)
- Hero area with large quest icon
- Description, requirements, and tips in expandable sections
- Evidence upload area with camera icon
- Prominent "Complete Quest" button at bottom

### Boss Battle Screen
**Carbon Ogre Visualization**:
- Large character illustration at center-top
- HP bar above boss (animated depletion)
- World Health contribution meter below
- "Your Damage" vs "Community Damage" split visualization
- Attack animation trigger when user completes quests

**Battle Progress**:
- Countdown timer to next battle phase
- Community leaderboard snippet (top 5 contributors)
- Real-time damage feed (scrolling ticker)

### Leaderboards
**Tab Navigation**: Friends | Campus | Global (horizontal scroll)
- Ranked list with medals (1st, 2nd, 3rd icons)
- Avatar + Username + XP score + Recent badge
- Current user row highlighted with subtle border
- "Your Rank" sticky header when scrolled past

### Rewards Store
**Reward Cards** (grid layout):
- Image placeholder for reward item
- Star cost badge (top-right corner)
- Title + short description
- "Redeem" button
- Impact transparency note ("≈ 0.5 trees planted")

### Profile & Stats
**Stats Dashboard**:
- Circular stat displays (quests completed, streaks, emissions avoided)
- Achievement badges grid (unlocked + locked states)
- Progress bars for each category mastery
- Social share buttons (Instagram card generator, Discord invite)

### Onboarding Flow
**3-Screen Carousel**:
- Full-screen illustrations with minimal text
- Dot pagination at bottom
- "Skip" button (top-right)
- "Next" / "Get Started" primary action
- Swipe gesture support

## Accessibility
- Minimum 44x44px tap targets throughout
- High contrast text (WCAG AA minimum)
- Focus indicators for keyboard navigation
- Screen reader labels for all icons and interactive elements
- Haptic feedback on quest completion and level-up

## Animations
**Micro-interactions only** (subtle, purposeful):
- Progress bar fills (smooth easing)
- Card entry animations (stagger on list load)
- Level-up celebration (confetti + scale pulse)
- Boss damage number pop-ups (+50 XP)
- Streak flame flicker on active streaks
- Pull-to-refresh indicator

## Images
**No large hero images** - This is a functional app dashboard.

**Icons & Illustrations**:
- Category icons: Custom eco-themed SVG set (leaf, bike, lightbulb, shopping bag)
- Carbon Ogre: Playful monster illustration (placeholder: generated SVG or Lottie animation)
- Achievement badges: Flat icon style with subtle gradients
- Empty states: Friendly illustrations for "No quests today" scenarios

**User-Generated**:
- Avatar placeholders (geometric shapes with initials)
- Quest evidence photos (user uploads, thumbnail previews)

---

**Design Philosophy**: Playful without being childish, gamified without feeling manipulative, eco-conscious without being preachy. Every interaction should feel rewarding and every screen should clearly communicate progress toward environmental impact.