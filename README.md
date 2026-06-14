# Polly's Parrot Tees 🦜

A tiny, fictional merch shop whose only real job is to show how a small seller
adds the **EU 14-day right-of-withdrawal flow** ("the withdrawal button") to
their own store. Fork it, read it, copy the four files that matter, ship a real
version in an afternoon.

It is the companion code for a YV Insider / YV Insights article on EU Directive
2023/2673.

- Substack: <!--SUBSTACK_URL-->_(link added once published)_<!--/SUBSTACK_URL-->
- LinkedIn: <!--LINKEDIN_URL-->_(link added once published)_<!--/LINKEDIN_URL-->

> Not legal advice. This is a worked example of the *mechanics*. Get your actual
> wording reviewed by someone qualified.

---

## Made by Yury Vashchylau 🦜

A free open-source sample from **[yuryv.info](https://yuryv.info)** — a deep dive
into how apps, games, people, and money interact. If this was useful, the deep
dives are where the real value is:

[![Repo](https://img.shields.io/badge/Source-yuryv--info%2Fparrot--tee--sample-181717?style=for-the-badge&logo=github)](https://github.com/yuryv-info/parrot-tee-sample)
[![YV Insights](https://img.shields.io/badge/YV_Insights-Substack-FF6719?style=for-the-badge&logo=substack&logoColor=white)](https://yvinsights.com)
[![YV Insider](https://img.shields.io/badge/YV_Insider-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/newsletters/yv-insider-by-yuryv-info-7444467518737608704/)
[![YV Podcast](https://img.shields.io/badge/YV_Podcast-Listen-8A2BE2?style=for-the-badge&logo=podcast&logoColor=white)](https://yvpodcast.yvinsights.com/)

- 🌐 **Hub:** [yuryv.info](https://yuryv.info)
- 📨 **YV Insights** (deep dives on Substack): [yvinsights.com](https://yvinsights.com)
- 💼 **YV Insider** (the same deep dives + LinkedIn-only bonus pieces): [LinkedIn newsletter](https://www.linkedin.com/newsletters/yv-insider-by-yuryv-info-7444467518737608704/)
- 🎙️ **YV Podcast** (the Rabbit Hole, out loud): [yvpodcast.yvinsights.com](https://yvpodcast.yvinsights.com/)
- 👨‍💻 **More from Yury:** [github.com/digitalby](https://github.com/digitalby)

---

## The entire spec

The directive's practical demand on a small shop is four things, and that is all
this repo implements:

1. A visible **"Withdraw from contract"** link on every page.
2. A **confirm step** so nobody cancels by accident.
3. A **stored record** with a timestamp.
4. A **confirmation email** as the "durable medium" (a copy the customer keeps).

That's it. No six-figure compliance platform, no "withdrawal button as a
service" rent.

## Where each piece lives

| Requirement | File |
|---|---|
| 1. Link on every page | [`app/layout.tsx`](app/layout.tsx) (footer) |
| 2. Confirm step | [`app/withdraw/confirm/page.tsx`](app/withdraw/confirm/page.tsx) |
| 3. Stored, timestamped record | [`lib/withdrawal.ts`](lib/withdrawal.ts) + [`lib/store.ts`](lib/store.ts) |
| 4. Durable-medium email | [`lib/withdrawal.ts`](lib/withdrawal.ts) (`renderConfirmationEmail`) |
| The server handler | [`app/api/withdraw/route.ts`](app/api/withdraw/route.ts) |
| Plain-language rights copy | [`app/legal/right-of-withdrawal/page.tsx`](app/legal/right-of-withdrawal/page.tsx) |
| Healthcheck | [`app/api/health/route.ts`](app/api/health/route.ts) |
| Tests | [`test/`](test/) (run `npm test`) |

The two files you actually copy into your own backend are **`lib/withdrawal.ts`**
(pure, no dependencies) and **`lib/store.ts`** (the one bit you replace with a
real datastore). Everything else is just a believable shop wrapped around them.

## Run it locally

```
npm install
npm run dev
```

Open <http://localhost:3000>, then walk: a product → checkout → **My orders** →
**Withdraw from this contract** → confirm → success. The success page shows the
stored record (with timestamp) and the exact confirmation email.

Build check and tests:

```
npm run build
npm test
```

`npm test` runs the Node built-in test runner (no extra dependencies) over the
withdrawal core, the end-to-end flow, and the `/api/health` healthcheck.

## Deploy your own copy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yuryv-info/parrot-tee-sample)

No environment variables, no secrets, no database needed to boot. (The mock
store is in-memory; see "Make it real" below before you take orders.)

## Make it real

This is a demo, so a few things are intentionally faked. Each has a comment in
the code at the swap-in point:

- **Storage** (`lib/store.ts`): swap the in-memory `Map` for Vercel KV, Postgres,
  or your existing orders DB. On serverless, memory does not persist, so this
  swap is mandatory before production.
- **Email** (`app/api/withdraw/route.ts`): actually send `renderConfirmationEmail`
  via Resend / Postmark / SES instead of returning it to the browser.
- **Catalog, orders, contact details**: replace the mock data in `lib/` and the
  fake 555 number / address / EU representative on the Contact page with yours.

## Adapting it to a shop you didn't build

You don't need Next.js. The flow is portable.

- **Shopify / themed store** → [`docs/adapt-shopify.md`](docs/adapt-shopify.md)
- **Mobile app settings screen** → [`docs/adapt-mobile.md`](docs/adapt-mobile.md)
- **The flow, step by step** → [`docs/withdrawal-flow.md`](docs/withdrawal-flow.md)
- **What the law actually asks for** → [`docs/the-spec.md`](docs/the-spec.md)

## For AI agents

A reader pointed you here? See [`AGENTS.md`](AGENTS.md) for a map written for you,
including how to lift the withdrawal flow into a different stack.

## License

MIT, © 2026 Yury Vashchylau. Steal it. That is the point.

Built it because untangling EU rules for small sellers is weirdly fun. More of
that at **[yuryv.info](https://yuryv.info)** · **[YV Insights](https://yvinsights.com)** ·
**[YV Insider](https://www.linkedin.com/newsletters/yv-insider-by-yuryv-info-7444467518737608704/)** ·
**[YV Podcast](https://yvpodcast.yvinsights.com/)**.
