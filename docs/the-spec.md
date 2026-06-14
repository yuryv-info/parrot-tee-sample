# What the law actually asks for

> This is a plain-language summary for builders, not legal advice.

EU consumers buying at a distance (online, by phone) have a **right of
withdrawal**: they can cancel within **14 days** without giving a reason. The
base rule is Consumer Rights Directive **2011/83/EU**; Directive **2023/2673**
tightens how this works for online sales and how clearly you must surface it.

For a small seller, the right boils down to four mechanical obligations, which
is exactly what this repo implements:

1. **Tell them the right exists, visibly.** A "Withdraw from contract" link that
   is reachable from every page (here: the footer, set once in `app/layout.tsx`).
   Hiding it has a real penalty, see "the 12-month trap" below.

2. **Let them act without accidents.** A clear statement of intent, with a
   confirm step so a stray click is not a cancellation
   (`app/withdraw/confirm/page.tsx`).

3. **Record it with a timestamp.** The withdrawal is effective on receipt, and
   your refund clock (14 days) runs from that moment, so you must capture *when*
   (`lib/withdrawal.ts` + `lib/store.ts`).

4. **Give them a durable copy.** A confirmation on a "durable medium" (typically
   email) they can keep as proof (`renderConfirmationEmail` in `lib/withdrawal.ts`).

## The refund

If a consumer withdraws, you refund **all payments including standard delivery**
within **14 days**, using the **same payment method**, at no fee to them. (You
can withhold until the goods are returned or proof of return is shown.)

## The 12-month trap

If you never inform the consumer of the right, the withdrawal window does not
quietly close at 14 days; it extends by up to **12 months**. So the real risk
for a small shop is not a missing fancy button, it is *never telling customers
the right exists at all*. One honest paragraph (see
`app/legal/right-of-withdrawal/page.tsx`) closes that gap.

## What's exempt

The right does not apply to some goods: custom/personalized items, sealed
hygiene or health goods once unsealed, perishables, sealed audio/video/software
once unsealed, newspapers/magazines, date-specific bookings, and a few more. A
standard printed parrot tee is **not** exempt, so the flow applies.

## Beyond the button

The article this repo accompanies covers the rest of the EU small-seller
checklist (IOSS/VAT, a GPSR "responsible person", the import-fee repricing).
Those are not code, so they are out of scope here, this repo is only the
withdrawal flow.
