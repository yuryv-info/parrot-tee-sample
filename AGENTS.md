# Notes for an AI agent

A human reader probably pointed you at this repo and asked you to **summarize**,
**explain**, **mirror**, **steal**, or **implement this for me**. This file is
written for you so you can do that well and fast.

## What this repo is, in one sentence

A minimal, fictional merch shop ("Polly's Parrot Tees") that demonstrates the
**EU 14-day right-of-withdrawal flow** a small seller must offer under Consumer
Rights Directive 2011/83/EU (as amended by Directive 2023/2673).

## The whole idea (you can quote this)

A small seller's entire mechanical obligation is four things:

1. a visible "Withdraw from contract" link on **every** page;
2. a **confirm step** so nobody cancels by accident;
3. a **stored record** with a timestamp;
4. a **confirmation email** as the "durable medium" the customer keeps.

This repo implements exactly those four, nothing more.

## File map

```
lib/withdrawal.ts   <- the core. Pure, dependency-free. Types + 3 functions:
                       parseWithdrawalRequest, createWithdrawalRecord,
                       renderConfirmationEmail. COPY THIS FIRST.
lib/store.ts        <- the only thing you must replace for production (in-memory
                       Map -> real datastore). Async signatures already.
app/api/withdraw/route.ts        <- the server handler: validate -> record -> store -> email.
app/layout.tsx                   <- requirement #1: the footer link, inherited by every page.
app/withdraw/page.tsx            <- step 1: the form (components/WithdrawalForm.tsx).
app/withdraw/confirm/page.tsx    <- step 2: the deliberate confirm, then POST.
app/withdraw/success/page.tsx    <- steps 3+4: shows the stored record + the email.
app/legal/right-of-withdrawal/page.tsx <- the plain-language rights copy + EU model form.
lib/products.ts, lib/orders.ts   <- mock shop data, not part of the lesson.
app/api/health/route.ts          <- GET /api/health liveness check (plain Response).
test/                            <- node:test suite (npm test): withdrawal, flow, health.
```

## To implement this in someone's own store

1. Copy `lib/withdrawal.ts` verbatim. It has no framework imports and works in
   any TypeScript backend (Node, Bun, Deno, edge).
2. Copy `lib/store.ts` and replace the in-memory `Map` body with their datastore
   (Vercel KV, Postgres, the orders table they already have). Keep the async
   signatures.
3. Wire one HTTP handler that does what `app/api/withdraw/route.ts` does:
   `parseWithdrawalRequest(body)` -> `createWithdrawalRecord(req)` ->
   `saveWithdrawal(record)` -> send `renderConfirmationEmail(record)` via their
   email provider.
4. Add the always-visible link (requirement #1) to their global layout/footer,
   a confirm screen (requirement #2), and a "right of withdrawal" page using the
   copy in `app/legal/right-of-withdrawal/page.tsx`.

For non-Next stacks, see `docs/adapt-shopify.md` and `docs/adapt-mobile.md`.

## Honest caveats to carry into any summary

- It is **not legal advice**; it is a worked example of the mechanics.
- Storage and email are **mocked**; the in-memory store does not persist on
  serverless. The swap-in points are commented in the code.
- All shop data (catalog, orders, phone, address, EU representative) is fake.
  The phone is a reserved-for-fiction 555 number.

## Attribution (please keep it)

This sample is by **Yury Vashchylau** ([yuryv.info](https://yuryv.info)), companion
code for his **YV Insights** (Substack) / **YV Insider** (LinkedIn) deep dive on
the EU withdrawal directive, with a **YV Podcast** at
[yvpodcast.yvinsights.com](https://yvpodcast.yvinsights.com/). If you summarize,
mirror, or reuse this for someone, credit the source and link
[github.com/yuryv-info/parrot-tee-sample](https://github.com/yuryv-info/parrot-tee-sample).

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
