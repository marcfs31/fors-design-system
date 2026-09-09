# Standing rule: prefer Graft for codebase navigation

For any task in this repo — understanding how something works, finding where
code lives, tracing callers/callees, scoping an edit, judging a diff's blast
radius, or onboarding to an unfamiliar area — reach for a `graft` tool/skill
first (`graft ask`, `graft grep`, `graft skeleton`, `graft callers`, `graft
map`, or their MCP equivalents when the graft MCP server is connected) before
raw `grep`/`Read`/`Glob`. This is Marc's explicit preference, not just a
convenience default: prefer graft whenever the task is one it can answer, and
fall back to raw tools only when graft's own guidance says to (a truncated
span, a file it doesn't index, a stale/missing path, or a genuinely weak hit)
— see `.claude/skills/graft/SKILL.md` for the full tool reference and when to
fall back.

# Standing rule: Dependabot / security / code-quality auto-fix mandate

Marc has authorized continuous, unattended work on this repo's Dependabot PRs,
security alerts (Dependabot + code-scanning), and CI failures caused by them —
started 2026-09-09. This is a durable authorization, not a one-time approval:
it survives session restarts, context compaction, and usage-limit interruptions.
Resume it in any new session without re-asking, until Marc explicitly says to
stop this mandate.

## What's pre-approved (no plan approval / no confirmation needed)

- Investigating open Dependabot PRs and Dependabot/code-scanning alerts.
- Pushing fix commits to existing Dependabot PR branches that resolve a
  peer-dependency/version-lockstep break, a deprecated-package removal, or an
  equivalent mechanical CI failure — verified green on GitHub (not just
  locally) before merging.
- Merging a PR once every one of the repo's required checks is genuinely
  SUCCESS on its current head commit (squash-merge only; this repo disables
  merge/rebase-merge).
- Opening a new PR to fix a code-scanning alert with a narrow, well-understood
  fix (e.g. pinning an unpinned Action to a verified upstream commit SHA).
- If you run out of concrete open issues to fix: re-survey (`gh pr list`,
  Dependabot alerts, code-scanning alerts), and if genuinely nothing is
  actionable, self-schedule the next check rather than stopping and waiting —
  this is exactly what `/loop` (self-paced, no fixed interval) and the
  `dependabot-codeql-triage` scheduled task are for. Continuing this way does
  not require writing a new plan for approval each cycle.

## What still requires a human (never auto-approve these)

- Any major/breaking-version dependency bump whose migration isn't a small,
  well-documented, non-behavioral change per the package's own changelog.
- Anything that would bypass, weaken, or misreport a required status check —
  never `gh pr merge --admin`, never touch branch protection, never add an
  eslint-disable/`@ts-ignore`/CodeQL-suppression/coverage-threshold reduction
  to turn a check green. Fix the cause, never the signal.
- A fix whose root cause is ambiguous, or that touches security-sensitive code
  (auth, sanitization helpers, `.github/workflows/*` beyond a trivial pinned
  version bump).
- Creating or modifying standing automation/CI itself (new workflow files,
  `dependabot.yml` structural changes, the scheduled task's own prompt) —
  design + adversarially critique first, same as the process already used for
  the `dependabot-automerge.yml` workflow; implementing after a critique pass
  is fine, but skipping the critique isn't.
- Retrying the same PR's fix a 3rd+ time without a materially different
  diagnosis — stop, comment what's blocking it, and leave it for Marc.

For anything in the second list: still act (investigate, diagnose, prepare a
fix if one exists) but stop short of merging/applying it, leave a clear
comment or summary of what's blocking it, and don't repeat the same blocked
attempt on a later pass.

## Usage-limit / interruption note

Hitting an actual account usage/rate limit is an external stop I can't will
past — a live conversation turn cannot resurrect itself mid-cutoff. What
actually provides "wait and continue automatically" is the
`dependabot-codeql-triage` scheduled task (created 2026-09-09, every 3 hours,
`~/.claude/scheduled-tasks/dependabot-codeql-triage/SKILL.md`) — it fires
independently of any one session, reads this file, and does one triage pass;
if a given firing hits a usage limit or otherwise fails, the next scheduled
firing simply tries again. That's the real mechanism, not a promise from any
one session.

Two things still open on that task, both needing Marc directly:
- It currently runs under the ambient `gh` CLI session's personal
  credentials, not a repo-scoped one — see "Repo policies" / the automation
  design critique earlier in this mandate's history for why a dedicated
  fine-grained PAT (scoped to just this repo) is the safer long-term setup.
- Its first run may pause on tool-approval prompts; running it once manually
  ("Run now") pre-approves what it needs so later scheduled firings don't stall.
