---
trigger: always_on
---

# Project Rules & Guidelines

## 1. General Project Overview
- **Name**: Moto Log App
- **Description**: A general marketplace for diverse products, similar to Mercado Livre. The 'Moto Log' name is for branding and does not imply a focus on motorcycles.
- **Architecture**: Monorepo-style structure within a Next.js 14 application using the App Router.
- **Language**: TypeScript (Strict mode).

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (v4)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (Server State) + React Context (Global Client State)
- **Validation**: Zod
- **File Storage**: Cloudinary

### File Structure Conventions
- `src/app`: Routes (Pages and API).
- `src/components`: React components.
  - `ui/`: Reusable primitive components (shadcn).
  - `[feature]/`: Feature-specific components (optional organization).
- `src/lib`: Core utilities, configurations, and external service clients (Prisma, Auth, Cloudinary).
- `src/hooks`: Custom React hooks (Client-side logic).
- `src/utils`: Helper functions (Pure functions).
- `prisma/`: Database schema and migrations.

---

## 2. Backend Rules (Server-Side)

### API Routes (`src/app/api`)
- **Location**: All API routes must be defined in `src/app/api`.
- **Response Format**: Always use `NextResponse`. Return JSON objects.
- **Error Handling**:
  - Wrap logic in `try/catch` blocks.
  - Return standardized error responses: `{ error: string, details?: any }`.
  - Use appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- **Validation**:
  - **MUST** use `zod` schemas to validate `request.body` or query parameters.
  - Define schemas in the same file or a dedicated `schemas.ts` if reusable.

### Database Interaction (Prisma)
- **Client**: Import the singleton instance from `@/lib/prisma`.
- **Async/Await**: All database operations must be asynchronous.
- **Relationships**: Use Prisma's fluent API for fetching related data (`include` or `select`).
- **Safety**: Avoid raw SQL queries unless absolutely necessary.

### Authentication & Authorization
- **Session Access**: Use `getServerSession(authOptions)` from `next-auth/next` in API routes and Server Components.
- **Protection**: Explicitly check `if (!session)` for protected routes and return 401 immediately.
- **Role-Based Access**: Check `session.user.role` (e.g., `LOJISTA`, `CLIENT`) for permission-gated actions.

---

## 3. Frontend Rules (Client-Side)

### Components
- **Type**: Use Functional Components with TypeScript.
- **Props**: Define interfaces for props, typically named `[ComponentName]Props`.
- **Server vs. Client**:
  - Default to **Server Components** for data fetching and layout.
  - Use `"use client"` directive only when necessary (state, effects, event listeners).
- **Shadcn UI**: Use components from `@/components/ui` for consistency. Do not reinvent basic UI elements.
- **Existing Components**: ALWAYS check for existing components before creating new ones.
  - Use `CategoryItem` (`@/components/category-item`) for category links.
  - Use Typography components (`@/components/typography/*`) for text hierarchy.
  - Use `SeeAllButton` (`@/components/see-all-button`) for "View All" links.

### Styling (Tailwind CSS)
- **Utility First**: Use Tailwind utility classes for layout, spacing, and typography.
- **Conditional Classes**: Use the `cn()` utility (from `clsx` + `tailwind-merge`) for dynamic class names.
  - *Example*: `className={cn("bg-white", isActive && "bg-blue-500")}`
- **Responsiveness**: Use standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`).

### Data Fetching & State
- **Server Components**: Fetch data directly using Prisma or fetch API where possible.
- **Client Components**:
  - Use **TanStack Query** (`useQuery`, `useMutation`) for async server state.
  - Avoid `useEffect` for data fetching.
  - Use `React Context` for truly global UI state (e.g., Cart, Theme).

### Forms
- **Library**: Use `react-hook-form` combined with `zod` resolvers.
- **Components**: Use shadcn `Form` components (`Form`, `FormField`, `FormItem`, etc.) for accessible and styled inputs.

---

## 4. Development Workflow
- **Linting**: Ensure no ESLint warnings before committing.
- **Types**: No `any` types. Define proper interfaces/types for all data structures.
- **Naming**:
  - Files: `kebab-case.ts` / `kebab-case.tsx`
  - Components: `PascalCase`
  - Functions/Variables: `camelCase`
