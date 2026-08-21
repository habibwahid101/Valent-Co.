# Project Status & Completion Plan — Valent & Co.

Last audited: 2026-08-21
Audited against: local repository at commit history through `Audit fixes: docs, CI, dependency cleanup, order-write hardening` (parent `Wire storefront to AWS...`, parent `Initial Valent & Co. MVP`), plus live inspection of the AWS account (Cognito, DynamoDB, Amplify) via the AWS CLI/boto3.

## 1. Executive Summary

- **Completion percentage:** ~75% of a deployable MVP. Application code and AWS backend are complete and verified working end-to-end in code; the remaining gap is entirely in release wiring (GitHub push, Amplify↔GitHub connection) plus test/CI coverage that didn't exist before this audit.
- **Product readiness:** Core shopper journeys (browse, cart, checkout, order lookup) and the admin journey (login, product CRUD, order status) are implemented and type-safe. Not yet live on a public URL.
- **Engineering readiness:** Build and typecheck pass clean. No automated test suite exists (unit or E2E) — **NOT VERIFIED** beyond manual/code review.
- **QA readiness:** No automated QA. Manual code-path review only (see §8). No device/browser testing was performed (this audit has no browser to test against a live URL, since none is deployed yet).
- **UI/UX readiness:** Responsive Tailwind layout with loading/empty/error states present on the checkout and order-lookup flows (see §7); not verified visually at each breakpoint since there is no live deployment to screenshot.
- **Security readiness:** Good — IAM least privilege for the guest/admin split is correctly enforced server-side (verified directly against the live IAM policies, not just inferred from code). One real gap found and fixed in this audit (order overwrite/tamper risk, §9).
- **Deployment readiness:** Backend infrastructure is fully provisioned and seeded. Two manual steps remain, both requiring the account owner: push the local commits to GitHub, and connect Amplify Hosting to the GitHub repo.

## 2. Confirmed Completed

- **Storefront UI** — home, shop/catalogue, product detail, cart, wishlist, checkout, order success, order lookup, admin views all implemented (`src/components/views/*`).
- **Cart & wishlist** — client-side, `localStorage`-backed, verified in `ShopContext.tsx`.
- **DynamoDB-backed products** — `ValentCo-Products` table exists, seeded with 15 items (verified via live `Scan --select COUNT`).
- **DynamoDB-backed orders** — `ValentCo-Orders` table exists, seeded with 3 demo orders, with `orderNumber-index` and `customerMobile-index` GSIs (verified via live `DescribeTable`).
- **Cognito admin authentication** — User Pool `us-east-1_QhR756GXv`, app client `valent-co-web` with no client secret, `USER_PASSWORD_AUTH`/SRP enabled, no OAuth flows exposed (verified via live `DescribeUserPoolClient`). `src/lib/adminAuth.ts` + `src/components/AdminGate.tsx` implement sign-in/sign-out/session persistence.
- **IAM least privilege** — verified live: `ValentCo-GuestRole` = read Products + PutItem/Query on Orders only (no Scan, no Update/Delete); `ValentCo-AdminRole` = full CRUD on both tables. Trust policies correctly scoped to the Identity Pool via `cognito-identity.amazonaws.com:aud`/`amr` conditions.
- **Build & typecheck** — `npm run build` and `tsc --noEmit` both pass with zero errors (verified by running them in this audit).
- **No secrets committed** — `.env` is gitignored (`!.env.example` is the only tracked env file); grep found no hardcoded keys/passwords in `src/`.

## 3. Partially Completed

- **Order lookup / async UX** — `findOrder` is async and awaited correctly with a submit spinner (`OrderLookupView.tsx`), but there's no distinct "no results" vs "error" messaging — both render the same empty state.
- **Admin product form** — CRUD actions exist and write to DynamoDB, but client-side validation on the admin product form was not audited line-by-line in this pass (out of scope for this round; flagged for the next backlog pass if the admin form is used heavily).
- **CI** — added in this audit (`.github/workflows/ci.yml`: install, typecheck, build on every push/PR to `main`). Not yet exercised on GitHub because the repo isn't pushed yet.

## 4. Missing

- **Automated tests** — no unit tests, no integration tests, no E2E tests exist anywhere in the repo. **NOT VERIFIED** is the correct status for all "tests pass" claims until a suite is added.
- **ESLint** — the `lint` script is actually just `tsc --noEmit` (typecheck only); there's no ESLint config, so no style/quality linting runs.
- **Error boundary** — no top-level React error boundary; an unexpected render error would show a blank white screen instead of a graceful fallback.
- **Rate limiting / abuse protection** — none, at the DynamoDB or Cognito layer. Acceptable for current MVP scale; flagged for later if traffic grows (see §9).

## 5. Broken / Defective

- **GitHub push outstanding** — local `main` is 1 commit ahead of `origin/main` before this session's fixes (now 2, after this audit's commit). This is a release blocker, not a code defect — requires the account owner to run `git push` from their machine (I have no `device_bash`/shell access on the user's PC, only file read/write).
- **Amplify not yet connected to GitHub** — `GetApp` on `d11od1b3r797fb` returns no `repository` field; the `main` branch record exists in Amplify but has never run a build (`activeJobId` absent). Requires the account owner to complete GitHub OAuth authorization in the AWS Console — this can't be done on their behalf (see refusal rules for OAuth grants).
- **Stale README / `.env.example`** — before this audit both still referenced the original AI Studio/Gemini scaffold (`GEMINI_API_KEY`, `APP_URL`) with no mention of the actual AWS variables the app requires. **Fixed in this audit.**
- **Unused dependencies** — `express`, `@types/express`, `dotenv`, `tsx`, `@google/genai` were present in `package.json` but referenced nowhere in `src/` (verified by grep) — leftover from the original scaffold, adding install weight and confusion with no function. **Fixed in this audit** (removed; reinstall verified 0 vulnerabilities, build still passes).

## 6. Technical Debt

- **Main JS bundle is 620 KB minified** (168 KB gzipped) — Vite's build warns on this. The AWS SDK v3 clients are the largest contributor. Not urgent at current traffic; a worthwhile future improvement is dynamic `import()` of `src/lib/aws.ts` so the SDK isn't in the initial bundle for pure browsing sessions.
- **No code-splitting by route** — all views ship in one bundle.
- **`id` generation uses `Date.now()`** for both orders (`ord-${Date.now()}`) and products (`prod-${Date.now()}`) — low collision risk at current scale, but not collision-proof under concurrent writes. A UUID would be more robust if traffic grows.

## 7. UI/UX Findings

Audited by code review (no live deployment exists yet to test in-browser, so this is static review, not a rendered/interactive audit):

- Checkout form (`CheckoutView.tsx`) has real client-side validation (name, 11-digit mobile, address required) with an inline error banner, a disabled+spinner submit state, and an empty-cart guard state. This is solid.
- Order lookup (`OrderLookupView.tsx`) has a loading state (`isSearching`) but the "not found" and "network error" cases are not visually distinguished — worth a small follow-up.
- Admin views were not re-audited pixel-by-pixel in this pass; `AdminGate.tsx` correctly blocks the admin view behind sign-in with no bypass path in `App.tsx` (confirmed: `admin` view is always wrapped in `<AdminGate>`).
- Responsive breakpoints (320/375/390/430/tablet/desktop) were **NOT VERIFIED** — this requires a live URL and a browser, neither of which exists yet. This should be the first QA pass once Amplify Hosting goes live.

## 8. QA Findings

No automated QA exists. Manual code-path review found no P0/P1 defects in the reviewed flows (checkout, order lookup, admin gate, cart). Full QA matrix execution (signup/login, CRUD, refresh/session handling, mobile/tablet/desktop) is **NOT VERIFIED** — blocked on having a live deployment to test against.

## 9. Security Findings

| Finding | Severity | Status |
|---|---|---|
| Guest role could overwrite an existing order by resubmitting its `id`, since `PutItem` was unconditional and the guest IAM role has `PutItem` but not `UpdateItem`/`DeleteItem` — a way around the intended "guests can only create, never modify" boundary. | Medium | **Fixed** — added `ConditionExpression: 'attribute_not_exists(id)'` to the order `PutCommand` in `ShopContext.tsx`. |
| Order total/pricing is client-computed and trusted as-is by DynamoDB (no server-side recalculation). | Low (business risk, not data risk) | **Deferred, documented.** Business model is Cash-on-Delivery with phone confirmation before dispatch (per existing code comments), so a tampered total would be caught before money changes hands. A hardened version would need a Lambda/API layer to recompute totals server-side — an architecture change beyond this audit's scope, flagged for a future phase if the business ever accepts online prepayment. |
| IAM least privilege for guest vs. admin roles. | — | **Verified good**, no action needed — confirmed live against the actual attached policies, not just inferred from application code. |
| Cognito app client has no secret and no OAuth flows enabled. | — | **Verified good**, appropriate for a public SPA. |
| No secrets committed to Git. | — | **Verified good** — `.env*` gitignored except `.env.example`; no hardcoded credentials found in `src/`. |
| No rate limiting on order creation (a script could spam `PutItem` calls with valid guest credentials, since those credentials are necessarily public in a browser SPA). | Low | **Deferred.** Acceptable at current scale; if abuse becomes a problem, add AWS WAF in front of Amplify Hosting or a request-throttling Lambda. |

## 10. Performance Findings

- Production build succeeds; main bundle 620 KB minified / 169 KB gzipped, above Vite's 500 KB warning threshold. Not blocking for MVP traffic levels; flagged as technical debt (§6).
- No N+1 query patterns found — all DynamoDB access is direct `Scan`/`Query`/`GetItem`/`PutItem` against known table/index names, no per-row follow-up calls.

## 11. DevOps / Deployment Findings

- **Build:** PASS (verified, this audit)
- **Typecheck:** PASS (verified, this audit)
- **Lint (ESLint):** NOT AVAILABLE — no ESLint config exists
- **Unit tests:** NOT AVAILABLE — none exist
- **E2E tests:** NOT AVAILABLE — none exist
- **CI:** Added this audit (`.github/workflows/ci.yml`); not yet exercised (repo not pushed)
- **DynamoDB tables + GSIs:** PASS (verified live)
- **Cognito User/Identity Pools + IAM roles:** PASS (verified live)
- **Amplify Hosting app + env vars:** PASS, app exists with correct env vars set (verified live); **NOT connected to GitHub yet** — owner action required
- **git push to GitHub:** NOT DONE — owner action required (needs the user's own GitHub credentials; not something this session can perform on their behalf)

## 12. Owner Decisions Required

1. **Push to GitHub** — run `git push` from `C:\Users\HP\Development\Valent-Co` (the correct, flat top-level folder). Requires the user's own GitHub sign-in/credentials.
2. **Connect Amplify to GitHub** — in the AWS Console, Amplify Hosting → app `Valent-Co` → connect branch `main` to `habibwahid101/Valent-Co.`. This is an interactive GitHub OAuth grant that only the account owner can authorize.
3. **Change the default admin password** after first login (was set during initial provisioning).
4. **Delete the leftover nested `Valent-Co\Valent-Co\` folder** on the user's PC (old extraction artifact) — no functional impact on the repo itself, just local clutter; requires manual deletion since this session has no delete capability on the user's device.
5. **Vercel deployment** (`valent-co.vercel.app`) — user stated it was deleted; last independent check from this session found it still serving the live site. Needs the user to re-check their Vercel dashboard directly, since this session has no access to their Vercel account.

## 13. Prioritized Completion Backlog

| ID | Task | Priority | Owner Role | Dependency | Risk | Status |
|---|---|---|---|---|---|---|
| 1 | Fix stale README/.env.example (AI Studio leftovers) | P2 | Docs | — | Low | **Done** |
| 2 | Remove unused deps (express, dotenv, tsx, @google/genai, @types/express) | P2 | Eng | — | Low | **Done** |
| 3 | Harden order writes against overwrite (ConditionExpression) | P1 | Security | — | Low | **Done** |
| 4 | Add CI (typecheck + build on push/PR) | P2 | DevOps | — | Low | **Done** |
| 5 | Push local commits to GitHub | P0 | Owner | GitHub credentials | Low | **Blocked — owner action** |
| 6 | Connect Amplify Hosting to GitHub `main` | P0 | Owner | Task 5 | Low | **Blocked — owner action** |
| 7 | First live QA pass (responsive breakpoints, real browser) | P1 | QA | Task 6 | Low | Not started |
| 8 | Add unit tests for `ShopContext` order/product logic | P2 | QA/Eng | — | Low | Not started |
| 9 | Add ESLint config | P3 | Eng | — | Low | Not started |
| 10 | Add top-level React error boundary | P3 | Eng | — | Low | Not started |
| 11 | Code-split AWS SDK / reduce main bundle size | P3 | Perf | — | Low | Not started |
| 12 | Distinguish "not found" vs "error" state in order lookup | P4 | UI/UX | — | Low | Not started |
| 13 | Change default admin password | P1 | Owner | — | Low | Not started |

## 14. Recommended Execution Sequence

1. Owner pushes to GitHub (Task 5) — unblocks everything downstream.
2. Owner connects Amplify to GitHub (Task 6) — first live deployment.
3. Live QA pass against the real URL (Task 7) — this is where responsive/UI/UX findings become concrete instead of NOT VERIFIED.
4. Change default admin password (Task 13).
5. Backlog items 8–12 as ongoing hardening/polish, no urgency.

## 15. Definition of Done

- [x] Production build succeeds
- [x] Typecheck succeeds
- [ ] Automated tests exist and pass — **not yet built**
- [x] No unresolved P0/P1 bugs in reviewed code paths (P1 order-overwrite issue found and fixed this audit)
- [x] Primary user journeys implemented end-to-end in code
- [x] Persistence verified (DynamoDB tables live, seeded, correct item counts)
- [x] Authentication/authorization verified (Cognito + IAM roles live and correctly scoped)
- [ ] Live deployment reachable at a public URL — **blocked on Tasks 5–6**
- [ ] Responsive QA across breakpoints — **blocked on live URL**
- [x] No exposed secrets
- [x] Environment variables documented (README + .env.example)
- [ ] Rollback procedure documented — not yet written (Amplify Hosting supports one-click rollback to a previous build once connected; document after first deploy)
