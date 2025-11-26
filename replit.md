# Rumbo a Gaucho - Premium Vehicle Dealership Platform

## Overview

A premium automotive e-commerce platform with aggressive neon-orange aesthetic for browsing and exploring a curated catalog of 86+ vehicles. The application provides an immersive, adventure-focused browsing experience with "Domina el camino" branding, VIP discount tiers, pagination (7 vehicles per page), advanced filtering, and Spanish-language interface. Built as a full-stack TypeScript application with React frontend and Express backend.

**Status**: Redesigned to "Rumbo a Gaucho" with neon-orange aesthetic (November 25, 2025)

## Recent Changes

**November 25, 2025 - Complete Brand Redesign to "Rumbo a Gaucho"**
- ✅ Rebranded from "Pa' Que Pinto" to "Rumbo a Gaucho" with new tagline "Domina el camino"
- ✅ Implemented neon-orange color palette throughout the entire application:
  - Primary: #E76F23 (naranja quemado)
  - Secondary: #1A1A1A (carbón)  
  - Backgrounds: #2B2B2B (gris cálido)
  - Accents: #C5A676 (arena metálica)
  - Text: #F5F5F5
  - Applied consistently in both light and dark modes
- ✅ Redesigned Hero section with:
  - Neon glow effects and orange gradients
  - New tagline "Domina el camino" in large typography with text shadows
  - Animated buttons with glow-pulse and hover scale effects
  - Stats section with neon-lit numbers
- ✅ Redesigned vehicle cards with:
  - Orange neon borders (border-gaucho-orange)
  - Hover effects: scale-up, orange glow shadows
  - "Ver Detalles" button that slides in on hover
  - Three-column spec layout with icons (Zap, Fuel, Package)
  - Gradient overlays that intensify on hover
- ✅ Implemented robust pagination system:
  - 7 vehicles per page (VEHICLES_PER_PAGE = 7)
  - Animated page buttons with orange neon effects
  - Previous/Next navigation with ChevronLeft/ChevronRight icons
  - Page indicator showing current page and total pages
  - Auto-reset to page 1 when filters change
  - Safety clamp prevents showing empty pages when results decrease
- ✅ Updated VIP color scheme to warm palette:
  - NONE/Primera Compra: Orange gradient (#E76F23)
  - PLATINO: Metallic/sand tones (#C5A676)
  - ORO: Intense orange (#E76F23 with higher opacity)
  - DIAMANTE: Deep orange (#E76F23 with highest opacity)
- ✅ Added Navbar enhancements:
  - Blur effect on scroll with orange border intensification
  - Animated pulsing dot indicator
  - Orange neon glow on hover
- ✅ Redesigned footer with:
  - Gradient background from charcoal to black
  - Radial orange glow overlay
  - Pulsing status indicators
  - Orange accent lines top and bottom
- ✅ Added custom animations in tailwind.config.ts:
  - fade-in, slide-in-left, slide-in-right, zoom-in
  - glow-pulse (for neon effects)
  - neon-flicker (for brand elements)
- ✅ Updated CSS variables for both dark and light modes with warm orange tones
- ✅ Updated all meta tags and browser title to "Rumbo a Gaucho - Domina el Camino"
- ✅ Removed deprecated `showAll` state - pagination now controls all display logic
- ✅ Fixed pagination edge cases with proper useEffect hooks for filter changes

**November 25, 2025 - Fresh GitHub Import Setup**
- ✅ Installed all npm dependencies (493 packages)
- ✅ Created .gitignore file for Node.js/TypeScript project
- ✅ Configured workflow "Server" running `npm run dev:server` on port 5000 with webview output
- ✅ Verified application loads correctly - homepage displaying perfectly
- ✅ Configured deployment for autoscale with build command `npm run build` and run command `node dist/index.js`
- ✅ Vite already properly configured with host 0.0.0.0, port 5000, and allowedHosts: true for Replit proxy compatibility
- ✅ Server architecture: Single port (5000) serves both frontend and backend API

## User Preferences

Preferred communication style: Simple, everyday language.

## Brand Identity

**Name**: Rumbo a Gaucho
**Tagline**: Domina el camino
**Aesthetic**: Aggressive premium, adventure-focused, neon-orange with warm metallics
**Target Feeling**: Energy, power, road dominance, premium quality

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture

**UI Component Strategy**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design system
- CSS variables for theming with dark mode as default
- Custom color palette: Neon orange (#E76F23), charcoal (#1A1A1A), warm gray (#2B2B2B), metallic sand (#C5A676)

**Design System**
- Typography: Inter (primary) and Rajdhani (technical specs/headers) from Google Fonts
- Dark mode primary with neon orange accent color
- Animations: glow-pulse, fade-in, slide-in, zoom-in, neon-flicker
- Responsive design with mobile-first approach

**State Management**
- React hooks (useState, useMemo, useRef, useEffect) for local component state
- TanStack Query (React Query) for server state management and caching
- No global state management library - deliberately kept simple with component-level state

**Key Features**
- VIP discount system with four tiers (Primera Compra, Platino, Oro, Diamante) applying dynamic discounts
- VIP color theming: All tiers use warm orange/metallic palette
- Pagination: 7 vehicles per page with animated navigation
- Multi-criteria filtering (search, category, price range) with debounced search (300ms)
- Vehicle selection from side panel
- Search indicator showing "Buscando..." when filtering
- Neon hover effects on all interactive elements
- Scroll-based navbar blur effect
- Animated card entrance on page load
- Lazy loading for vehicle images

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Node.js runtime with ES modules (type: "module")
- Development and production modes with environment-based configuration

**Data Storage**
- In-memory storage implementation (MemStorage class) as current data layer
- Designed with IStorage interface for future database integration
- Static vehicle data imported from shared schema (86 vehicles)

**API Design**
- RESTful API structure with `/api` prefix
- Request/response logging middleware
- JSON-based communication
- Error handling middleware

### Data Schema & Models

**Core Entities**
- Users: Basic authentication schema (prepared for future use)
- Vehicles: Comprehensive model with category, price range, specifications

**Vehicle Categories**
- AUTOS (54 vehicles) - Sports cars and luxury sedans
- CAMIONETAS (17 vehicles) - SUVs and pickup trucks
- MOTOS (9 vehicles) - High-end motorcycles
- OTROS (7 vehicles) - Specialized vehicles

**Price Ranges**
- Alto (High tier) - Premium vehicles
- Medio (Mid tier) - Mid-range vehicles
- Bajo (Low tier) - Entry-level vehicles

### External Dependencies

**Database**
- Drizzle ORM configured for PostgreSQL via @neondatabase/serverless
- Database currently not active - using in-memory storage

**UI Component Library**
- Radix UI primitives (20+ components)
- Custom styling via Tailwind and CVA

**Utility Libraries**
- clsx + tailwind-merge (via cn utility)
- date-fns for date manipulation
- lucide-react for icons (Zap, Fuel, Package, Search, ChevronLeft, ChevronRight, etc.)

**Assets Management**
- Stock images stored in `attached_assets/stock_images/`
- Vehicle images stored in `attached_assets/`
- Dynamic image loading via `import.meta.glob`
- Vite alias `@assets` for asset imports

## Replit Environment Setup

**Import Date**: November 25, 2025

### Configuration
1. **Dependencies**: All npm packages installed (493 packages)
2. **Vite Configuration**: Host 0.0.0.0, Port 5000, allowedHosts: true
3. **Workflow**: Single "Server" workflow running `npm run dev:server`
4. **Deployment**: Autoscale with `npm run build` and `node dist/index.js`

### Development Commands
- `npm run dev:server` - Start development server with hot reload
- `npm run build` - Build both client (Vite) and server (esbuild)
- `npm start` - Run production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

### Server Architecture
- **Port 5000**: Serves both frontend (via Vite in dev) and backend API
- **Host**: 0.0.0.0 for frontend access
- **Development**: Vite middleware with HMR
- **Production**: Static files from dist/public

## Customization Guide

### How to Change Dealership Name
Edit `shared/config.ts` to change the dealership name and tagline.

### How to Modify Vehicles
Edit `shared/schema.ts` to add, edit, or remove vehicles.

**Current Vehicle Count:** 86 vehicles total
- AUTOS: 54
- CAMIONETAS: 17
- MOTOS: 9
- OTROS: 7

For detailed instructions, see `COMO_MODIFICAR.md`.

## Image Customization Guide

### 1. Silueta del Carro en el Hero (Fondo del Nombre del Concesionario)
**Documento a editar:** `client/src/components/HeroSection.tsx`
**Línea:** 2
**Busca:** `import carSilhouette from "@assets/generated_images/car_front_silhouette_outline.png";`
**Cambio:** Reemplaza la ruta `car_front_silhouette_outline.png` con el nombre de tu nueva imagen.
**Ejemplo:** `import carSilhouette from "@assets/generated_images/mi_nueva_silueta.png";`

### 2. Íconos de Descuentos VIP
**Documento a editar:** `client/src/components/VIPSelector.tsx`
**Líneas a cambiar:**

- **Línea 5** (Primera Compra): `import crownIcon from "@assets/generated_images/shield_lock_line_icon.png";`
  - Reemplaza `shield_lock_line_icon.png` con tu imagen

- **Línea 6** (Platino): `import platinumIcon from "@assets/generated_images/star_rays_line_icon.png";`
  - Reemplaza `star_rays_line_icon.png` con tu imagen

- **Línea 7** (Oro): `import goldIcon from "@assets/generated_images/tiara_crown_line_icon.png";`
  - Reemplaza `tiara_crown_line_icon.png` con tu imagen

- **Línea 8** (Diamante): `import diamondIcon from "@assets/generated_images/diamond_facet_line_icon.png";`
  - Reemplaza `diamond_facet_line_icon.png` con tu imagen

**Nota:** Los nombres de las variables (crownIcon, platinumIcon, goldIcon, diamondIcon) deben mantener el mismo orden y tipo, solo cambias la ruta del archivo.

### Ubicación de las Imágenes
Todas las imágenes deben estar en: `attached_assets/generated_images/`

Si añades nuevas imágenes, asegúrate de que sean PNG transparentes sin fondo para mantener la consistencia del diseño.
