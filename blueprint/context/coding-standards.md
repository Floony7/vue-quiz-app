# Coding Standards

## Stack and Runtime

- Vue 3 client-rendered SPA with TypeScript, Vite, Vue Router, and Pinia.
- Use npm and preserve package-lock.json. Node requirement: ^22.18.0 || >=24.12.0.
- Use the exact commands in AGENTS.md; do not add dependencies for hypothetical needs.

## TypeScript and Vue

- Preserve the Vue TypeScript configuration and noUncheckedIndexedAccess.
- Avoid any; use proper types or unknown and narrow external data.
- Use type inference where clear and explicit types for public data boundaries.
- Use Composition API and <script setup lang="ts"> in single-file components.
- Keep components focused. Extract composables only for actual shared logic.
- Use local reactive state for local UI; Pinia is available for shared state.
- Preserve accessible labels, keyboard interaction, and semantic HTML.

## File Organization

- Entry point: src/main.ts; root component: src/App.vue.
- Route definitions: src/router/index.ts; route views: src/views/.
- Reusable components: src/components/; stores: src/stores/.
- API calls: src/api/; shared data types: src/types/; utilities: src/utils/.
- Global styles and assets: src/assets/; static public files: public/.
- Use @/ for imports from src/ where appropriate.

## Naming and Formatting

- Components and views: PascalCase .vue files.
- Functions and local variables: camelCase; types and interfaces: PascalCase.
- Follow surrounding formatting; avoid unrelated reformatting.
- No formatter or linter is configured.

## Styling

- Use existing plain CSS, scoped component styles, and global CSS in src/assets/.
- Reuse existing CSS custom properties; no utility CSS framework is installed.
- Keep layouts responsive and controls usable on small screens.

> TODO: Product visual direction is not defined yet.

## Data Access and Error Handling

- Existing trivia API code lives in src/api/trivia.ts, with types in src/types/trivia.ts.
- Keep remote calls and response transformation out of presentation templates.
- Validate user input and external responses at actual boundaries as features are built.
- Handle network and API errors with useful UI feedback when the request is connected to the UI.
- No backend, database, or authentication system is configured.

> TODO: Define persistence and deployment requirements in the project plan.

## Testing

Vitest, jsdom, and Vue Test Utils are already configured. A scaffold component test exists in src/components/__tests__/. The Test command in AGENTS.md enables the logic-test gate. No browser test harness is configured.

When `AGENTS.md` declares a `Verify` command, treat it as the umbrella automated
gate. It combines only the checks this project actually has, in this order when
available: typecheck, tests, then build. The command does not enable an absent
test runner or replace focused evidence. It gives local work and optional CI one
exact command to run. `/ci` owns Verify and CI setup. `/tests` adds the real test
command to Verify when it already exists, but never creates CI only because
testing was configured.

**The opt-in switch is one signal: a `test` command in the Commands section of
`AGENTS.md`.** Declare one and **tests become a gate for logic-bearing steps**,
not an optional extra; leave it out and the loop verifies logic with the evidence
it already uses (run it, a screenshot, the build). Adding the runner is itself a
deliberate step, never a silent mid-step install. This is the single definition
of the switch; the skills and `ai-interaction.md` only point back here.

- **What to test (the scope rule):** pure logic where a wrong answer is possible -
  parsers, formatters, validators, id/slug builders, server actions. These have
  assertable inputs and outputs and real edge cases (empty, missing, malformed).
- **What not to test:** UI components and integration-level surfaces (render or
  export routes, anything driving a real browser or external service). Verify those
  with a screenshot and the build, not brittle unit tests.
- **The gate (when a runner is configured):** a build step that adds in-scope logic
  must ship a passing test in the same reviewable diff. The project's test command
  must be green before the step is approved, before any checkpoint commit, and
  before `/complete` merges. UI and integration-only steps are exempt and ride on
  screenshot plus build evidence.
- **When it's named:** the `/feature` spec's Testing section predicts the coverage,
  `/implement` writes the test with the step, and if a step surfaces logic the spec
  didn't foresee, add a focused test then.
- An empty suite should fail, not pass, so "no tests ran" never looks like "passed".
- Keep tests close to source in __tests__/ directories using .spec.ts, matching the scaffold.
- Run them via the project's test command (see Commands in `AGENTS.md`), not a
  hardcoded tool name.

Stack binding: Vitest with jsdom and Vue Test Utils. Use vi.mock() only for external dependencies and vi.useFakeTimers() for time-dependent logic when needed.

## Browser Verification

For UI and integration behavior, prefer real browser evidence over reading the
code and assuming it works.

- Browser automation is separately opt-in through `/tests browser`. That setup
  reuses a compatible runner or prefers Playwright for supported projects, then
  documents the exact command as `Browser tests` in `AGENTS.md`.
- When `Browser tests` is declared, add focused coverage for stable behavioral
  done-whens when it is proportionate, and run the documented command during
  `/check`. Do not assume it proves visual fidelity, real authenticated-profile
  behavior, browser chrome, or another claim the test does not observe.
- If no Browser tests command is declared, do not add a runner silently in the
  middle of an unrelated feature. Use the available dev server, browser
  screenshots, build output, API output, or manual evidence instead.
- Browser tests are not part of the default Verify command or CI unless the user
  separately chooses that slower gate.
- Browser evidence is especially important for flows that click, type, submit,
  navigate, download files, render complex layouts, or depend on client-side
  state.

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible

## Comments

Write code that explains itself; comment only what the code cannot say.
Over-commenting is a common AI tell, so resist it.

- Comment the **why**, not the **what**. Delete any comment that restates the code.
- No banner/header blocks, section dividers, or step-by-step narration of obvious
  code. A file does not need a comment announcing each region.
- A comment earns its place only when it captures something the code can't: a
  non-obvious decision, a gotcha or workaround, why a value is what it is, or a
  link to a spec or issue.
- Prefer self-documenting names and small functions over explanatory comments.
- Keep doc comments minimal: a one-line purpose on an exported type or function is
  plenty; don't write JSDoc that just repeats the signature.
- When in doubt, leave the comment out.

## Writing

- No em dashes (U+2014) in generated content: docs, comments, commit messages,
  READMEs, specs. They read as AI-generated.
- Use a hyphen for `term - description` separators; rephrase prose with commas,
  parentheses, or a colon. Avoid en dashes and the ellipsis character too.
