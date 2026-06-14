# Adapting the flow to a mobile app

If you sell digital goods or physical merch through a mobile app and **you are
the seller of record** (see the article: this is the common case on Google Play,
the uncommon case on the App Store), the same four requirements apply. They map
cleanly onto a settings screen.

## 1. The link on every page -> a Settings entry

You don't need it on literally every screen; the equivalent is a stable,
discoverable entry. Put **"Withdraw from purchase"** in Settings (and near order
history), the same place users look for "cancel" or "manage subscription".

## 2. The confirm step -> a confirmation dialog

Tapping it opens a screen summarizing the order, then a dialog: "Confirm
withdrawal?" with a single confirm action. Don't file on the first tap.

## 3 + 4. The record and the email -> your backend

The app calls your backend, which runs the exact same core:

```ts
const req = parseWithdrawalRequest(body);        // from lib/withdrawal.ts
const record = createWithdrawalRecord(req);
await saveWithdrawal(record);                    // your DB
await sendEmail(renderConfirmationEmail(record)); // your mail provider
```

`lib/withdrawal.ts` is plain TypeScript, so if your backend is Node/Bun/edge you
can import it directly. For a Kotlin/Swift backend, reimplement the same three
functions, they are tiny and the email text is the contract.

## A platform shortcut for subscriptions

For subscription cancellation specifically, the stores give you a deep link to
their native manage-subscription screen (e.g. Google Play's
`https://play.google.com/store/account/subscriptions?...`). You can wire your
button straight to that. But note: a platform cancel screen handles the
*cancellation*, it does not necessarily produce *your* timestamped record and
durable-medium email, so if the duty is yours, still log the event and send the
confirmation.
