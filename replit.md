# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Diet Food 3D (`artifacts/diet-food`)
- **Type**: react-vite, frontend-only (no backend)
- **Preview path**: `/`
- **Title**: NutriEats — 3D Diet Food Website
- **Features**:
  - 25 healthy diet food dishes with full nutritional data (calories, protein, carbs, fat, fiber, sugar)
  - 3D card tilt effect on hover using CSS perspective transforms
  - Parallax hero section with floating food emoji particles and GSAP animations
  - Category filters (Salads, Bowls, Smoothies, Soups, Wraps, Breakfast, Snacks)
  - Weight goal filters (Weight Loss, Weight Gain, Maintain)
  - Search functionality
  - Food detail modal with 3 tabs: Nutrition, Recipe (exact ingredients), Order
  - Animated nutrition progress bars
  - Full ordering system with cart sidebar
  - Toast notifications on add-to-cart
  - Glass morphism navbar
  - "How It Works" and "Benefits" sections
  - Framer Motion animations throughout
- **Dependencies**: three, @react-three/fiber, @react-three/drei, gsap, framer-motion

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
