# Valent & Co. — Luxury Fragrance Storefront

A React + TypeScript storefront for Valent & Co., a Bangladesh-focused luxury
fragrance brand. Product catalogue and orders are backed by AWS DynamoDB;
admin login is backed by AWS Cognito. Cart and wishlist are kept client-side
(per-visitor, in `localStorage`).

## Stack

- React 19 + TypeScript, built with Vite 6
- Tailwind CSS v4
- AWS DynamoDB (products + orders), via the AWS SDK v3 (`@aws-sdk/lib-dynamodb`)
- AWS Cognito User Pool (admin auth) + Identity Pool (temporary, scoped IAM credentials)
- AWS Amplify Hosting (build + deploy)

## Prerequisites

- Node.js 18+
- An AWS account with the resources described in [Infrastructure](#infrastructure) below

## Run locally

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in the values for your AWS
   environment (see [Environment variables](#environment-variables)).
3. Start the dev server:
   ```
   npm run dev
   ```

Without a valid `.env`, the app still runs using bundled demo product data
(read-only) — useful for UI-only work, but cart checkout, admin login, and
order lookup all require a real AWS backend.

## Environment variables

All variables are consumed at build time via `import.meta.env` (Vite), so
they must be set both locally (`.env`) and in the hosting environment
(Amplify Hosting → App settings → Environment variables).

| Variable | Description |
|---|---|
| `VITE_AWS_REGION` | AWS region the backend resources live in (e.g. `us-east-1`) |
| `VITE_IDENTITY_POOL_ID` | Cognito Identity Pool ID — issues scoped guest/admin IAM credentials |
| `VITE_COGNITO_USER_POOL_ID` | Cognito User Pool ID — admin accounts |
| `VITE_COGNITO_CLIENT_ID` | Cognito User Pool **app client** ID (no client secret) |
| `VITE_DDB_PRODUCTS_TABLE` | DynamoDB table name for products |
| `VITE_DDB_ORDERS_TABLE` | DynamoDB table name for orders |

See `.env.example` for a template.

## Infrastructure

Provisioned in AWS (region `us-east-1`):

- **DynamoDB** — `ValentCo-Products`, `ValentCo-Orders` (with `orderNumber-index`
  and `customerMobile-index` GSIs on Orders)
- **Cognito User Pool** — admin accounts, app client `valent-co-web` (no secret,
  `USER_PASSWORD_AUTH` + SRP enabled, no OAuth flows)
- **Cognito Identity Pool** — issues two IAM roles via unauthenticated/authenticated
  federation: `ValentCo-GuestRole` (read products; create + look up own orders only)
  and `ValentCo-AdminRole` (full read/write on both tables, only assumable with a
  valid admin ID token)
- **Amplify Hosting** — app `Valent-Co` (`d11od1b3r797fb`), builds from the `main`
  branch once connected to this GitHub repository

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build (`dist/`)
- `npm run preview` — preview a production build locally
- `npm run lint` — TypeScript typecheck (`tsc --noEmit`); there is no separate
  ESLint config in this project yet

## Admin access

The admin panel (`/` → Admin) is gated behind Cognito sign-in
(`src/components/AdminGate.tsx`). Create admin users in the Cognito User Pool
console. **Change the default admin password after first login.**

## Project status

See [`docs/PROJECT_STATUS_AND_COMPLETION_PLAN.md`](docs/PROJECT_STATUS_AND_COMPLETION_PLAN.md)
for the current audit, known gaps, and the completion backlog.
