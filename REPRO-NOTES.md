# Reproducing the rootDir Issue

## The Problem
When using `buildLibsFromSource: false` with Rollup + TSC compiler, TypeScript paths get remapped to `dist/` folders. The `@rollup/plugin-typescript` receives `rootDir` set to the project root, but then encounters files from remapped paths that are outside this rootDir, causing TypeScript to error.

## Why It's Hard to Reproduce
1. The error depends on TypeScript's strict validation in `@rollup/plugin-typescript`
2. Default configs often use `babel` compiler or have `skipTypeCheck: true`
3. Some project structures don't trigger the validation
4. TS Solution setups automatically set `skipTypeCheck: true`

## Conditions Needed
- `compiler: "tsc"` (not babel or swc)
- `buildLibsFromSource: false` (paths remapped to dist)
- `skipTypeCheck: false` (TypeScript validation enabled)
- Project depends on buildable workspace library
- Non-TS Solution workspace (legacy setup)

## The Fix
In `packages/rollup/src/plugins/with-nx/with-nx.ts:375-379`:

```typescript
const compilerOptions = {
  // Only set rootDir when building from source
  ...(options.buildLibsFromSource !== false ? { rootDir: projectRoot } : {}),
  allowJs: options.allowJs,
  declaration: true,
  paths: compilerOptionPaths,
};
```

This prevents TypeScript from validating rootDir when using remapped dist paths.
