# AGENTS.md

## Build / typecheck / lint
- `npm install`
- `npm run typecheck` - verifica tipos
- `npm run lint` - corre eslint en app/ y lib/
- `npm run build` - produce build de producción
- `npm run dev` - dev server con Turbopack

## Arquitectura de proyecto
- Server-Driven UI: los Server Components consumen Server Actions que usan Mongoose.
- `'use client'` vive SOLO en componentes hoja interactivos (forms, botones con estado).
- Server Actions con `revalidatePath` / `revalidateTag` para caché granular.
- Patrón Repository/Service en `features/<feature>/server/`.
- Shadcn UI sobre Radix + Tailwind, tema UEFA UCL (ver `styles/theme.css`).

## Paths
Alias `@/*` apunta a la raíz del repo (ver tsconfig.json).

## Comités
No commitear sin `npm run typecheck && npm run lint` verdes.
