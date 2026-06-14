# The withdrawal flow, step by step

The whole flow is four screens and one server handler.

```
[any page]                         requirement #1
  footer: "Withdraw from contract"  -> app/layout.tsx
        |
        v
/withdraw                          step 1: collect order id + email + reason
  components/WithdrawalForm.tsx        (no server call yet)
        |  router.push with query params
        v
/withdraw/confirm                  requirement #2: deliberate confirm
  app/withdraw/confirm/page.tsx        on "Confirm" -> POST /api/withdraw
        |
        v
POST /api/withdraw                 the server handler
  app/api/withdraw/route.ts
    parseWithdrawalRequest(body)   validate untrusted input (boundary)
    createWithdrawalRecord(req)    requirement #3: record + timestamp
    saveWithdrawal(record)         store it (mock; lib/store.ts)
    renderConfirmationEmail(record) requirement #4: durable medium
        |  returns { record, email }
        v
/withdraw/success                  show the stored record + the email
  app/withdraw/success/page.tsx
```

## Why no record is created before confirm

Requirement #2 exists so an accidental click cannot cancel a contract. So step 1
(`/withdraw`) only gathers input and forwards it as query params; **nothing is
filed** until the explicit "Confirm withdrawal" click on `/withdraw/confirm`.
That click is the single POST that creates the record.

## How the success page gets the data (demo shortcut)

This sample has no persistent server store, so the confirm step stashes the
server's response in `sessionStorage` and the success page reads it back. In a
real shop you would instead redirect to `/withdraw/success/<id>` and look the
record up from your datastore by id, the record is already stored server-side by
`saveWithdrawal`.

## Test the handler directly

```
curl -s -X POST http://localhost:3000/api/withdraw \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORD-1024","email":"you@example.com","reason":"changed my mind"}'
```

You get back the timestamped `record` and the `email` (subject + body).
