# LITEFLIX

API: https://github.com/Radinax/liteflix-api

Web application where users can get the popular movies and upload their own.

# Install

```bash
bun install
```

# To run

```bash
bun run dev
```

# To test

```bash
bun run test
```

# Stack

- [Vite](https://github.com/vitejs/vite): Build tooling for client side rendering apps
- [Tailwind](https://github.com/tailwindlabs/tailwindcss): Most popular utility-first CSS framework for rapidly building custom user interfaces
- [React Query](https://tanstack.com/query/latest): Server state management
- [Ky](https://www.npmjs.com/package/ky): HTTP Client
- [Bun](https://bun.sh/): Bundler, test runner, and Node.js-compatible package manager. NPM, PNPM, YARN are alternatives
- [Zod](https://github.com/colinhacks/zod): For typescript schema validations

# File Structure

Considering the scope of the application, a simple structure is the way to go here, for a larger app we could use a feature based structure instead, but for the purposes of this project, this is the way to go.

```
api
  - All async operations to connect with the server
assets
  - Custom images and icons
components
  - All components
hooks
  - All hooks
lib
  - All configurations like query client and http client
types
  - All general types
App.tsx
```

Made by **Eng. Adrian Beria**
