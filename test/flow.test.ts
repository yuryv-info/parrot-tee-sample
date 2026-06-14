import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseWithdrawalRequest,
  createWithdrawalRecord,
  renderConfirmationEmail,
} from "../lib/withdrawal.ts";
import { saveWithdrawal, getWithdrawal } from "../lib/store.ts";

// Exercises the exact sequence app/api/withdraw/route.ts runs, end to end,
// without importing next/server.
test("the withdrawal flow stores a round-trippable record and a matching email", async () => {
  const body = { orderId: "ORD-1024", email: "captain@example.com", reason: "changed my mind" };

  const req = parseWithdrawalRequest(body);
  const record = createWithdrawalRecord(req);
  await saveWithdrawal(record);

  const stored = await getWithdrawal(record.id);
  assert.deepEqual(stored, record);

  const email = renderConfirmationEmail(record);
  assert.equal(email.to, "captain@example.com");
  assert.match(email.subject, /ORD-1024/);
  assert.match(email.body, new RegExp(record.id));
});

test("getWithdrawal returns null for an unknown id", async () => {
  assert.equal(await getWithdrawal("WD-DOES-NOT-EXIST"), null);
});
