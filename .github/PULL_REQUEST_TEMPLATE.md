<!-- Keep this short. The detail lives in the changeset and the diff. -->

## What changed

<!-- One or two sentences. -->

## Checklist

- [ ] `npx changeset` added if this affects the published package (new component, prop, visual/behaviour change, bug fix) — see the `release` skill / CONTRIBUTING
- [ ] Accessibility: name/role/value, keyboard, visible focus, ≥24px targets, `aria-describedby` for hints — see CONTRIBUTING
- [ ] Responsive at 320 / 768 / 1280, no horizontal page scroll
- [ ] `npm run typecheck && npm run lint && npm run format:check && npm run test:coverage && npm run build && npm run smoke && npm run test:package` all pass
- [ ] `npm run build-storybook && npm run test:storybook` passes (real-browser render + axe)
- [ ] Story added/updated; DOM snapshot reviewed if it changed (`npx vitest run -u`)
