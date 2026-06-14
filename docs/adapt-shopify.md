# Adapting the flow to Shopify (or any themed store)

You do not run this Next.js app on Shopify. You port the same four requirements
into the theme plus one small backend endpoint. The portable core is
`lib/withdrawal.ts`, it has no framework imports.

## 1. The link on every page

Add it to your theme's footer so every template inherits it. In a typical
Liquid theme, edit `sections/footer.liquid`:

```liquid
<a href="/pages/withdraw"><strong>Withdraw from contract</strong></a>
```

Create a `/pages/withdraw` page and a `/pages/right-of-withdrawal` page. For the
rights copy, paste the text from `app/legal/right-of-withdrawal/page.tsx`.

## 2. The confirm step

Make the withdraw page a two-step form: first collect order number + email,
then show a confirmation screen with a single "Confirm withdrawal" button. Do
not file anything until that button is clicked.

## 3 + 4. The record and the email

Shopify themes can't write your database or send transactional mail directly, so
stand up one small endpoint (a Shopify app, a Cloudflare Worker, a serverless
function, anything) that does what `app/api/withdraw/route.ts` does:

```ts
import { parseWithdrawalRequest, createWithdrawalRecord, renderConfirmationEmail } from "./withdrawal";

const req = parseWithdrawalRequest(await request.json());
const record = createWithdrawalRecord(req);
await saveWithdrawal(record);                 // your DB, or a Shopify metafield
await sendEmail(renderConfirmationEmail(record)); // your mail provider
```

Point the confirm button's `fetch` at that endpoint. That's the whole port.

## Already on a marketplace?

If you sell through Etsy, Amazon, or a managed-markets setup, the marketplace
may already be the seller of record and carry this duty for you. Check what
*they* handle before building anything, you might not need this at all.
