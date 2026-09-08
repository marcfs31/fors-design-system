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
past — but it's not a reason to abandon the mandate. Whatever picks this back
up (a new interactive session, or the `dependabot-codeql-triage` scheduled
task once its scoped credential is set up) should read this file and resume
without re-litigating the plan.
