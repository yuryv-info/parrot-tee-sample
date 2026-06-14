import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseWithdrawalRequest,
  createWithdrawalRecord,
  renderConfirmationEmail,
} from "../lib/withdrawal.ts";

test("parseWithdrawalRequest accepts valid input and trims", () => {
  const req = parseWithdrawalRequest({ orderId: "  ORD-1024 ", email: " a@b.co " });
  assert.deepEqual(req, { orderId: "ORD-1024", email: "a@b.co" });
});

test("parseWithdrawalRequest keeps a reason when given", () => {
  const req = parseWithdrawalRequest({ orderId: "ORD-1", email: "a@b.co", reason: " too small " });
  assert.equal(req.reason, "too small");
});

test("parseWithdrawalRequest omits an empty reason", () => {
  const req = parseWithdrawalRequest({ orderId: "ORD-1", email: "a@b.co", reason: "   " });
  assert.equal("reason" in req, false);
});

test("parseWithdrawalRequest throws on missing orderId", () => {
  assert.throws(() => parseWithdrawalRequest({ email: "a@b.co" }), /orderId is required/);
});

test("parseWithdrawalRequest throws on an email without @", () => {
  assert.throws(() => parseWithdrawalRequest({ orderId: "ORD-1", email: "nope" }), /valid email/);
});

test("parseWithdrawalRequest rejects non-object bodies", () => {
  assert.throws(() => parseWithdrawalRequest(null), /JSON object/);
  assert.throws(() => parseWithdrawalRequest("string"), /JSON object/);
});

test("createWithdrawalRecord stamps status, timestamp, and passes fields through", () => {
  const now = new Date("2026-06-14T11:00:00.000Z");
  const record = createWithdrawalRecord({ orderId: "ORD-1024", email: "a@b.co" }, now, "WD-TEST");
  assert.equal(record.id, "WD-TEST");
  assert.equal(record.status, "received");
  assert.equal(record.requestedAt, "2026-06-14T11:00:00.000Z");
  assert.equal(record.orderId, "ORD-1024");
  assert.equal(record.email, "a@b.co");
});

test("renderConfirmationEmail addresses the customer and references order + ref", () => {
  const now = new Date("2026-06-14T11:00:00.000Z");
  const record = createWithdrawalRecord({ orderId: "ORD-1024", email: "a@b.co" }, now, "WD-TEST");
  const email = renderConfirmationEmail(record);
  assert.equal(email.to, "a@b.co");
  assert.match(email.subject, /ORD-1024/);
  assert.match(email.subject, /WD-TEST/);
  assert.match(email.body, /Sun, 14 Jun 2026 11:00:00 GMT/);
});

test("renderConfirmationEmail shows the given reason, or the no-reason line", () => {
  const now = new Date("2026-06-14T11:00:00.000Z");
  const withReason = renderConfirmationEmail(
    createWithdrawalRecord({ orderId: "ORD-1", email: "a@b.co", reason: "too small" }, now, "WD-1"),
  );
  assert.match(withReason.body, /Reason you gave: too small/);

  const noReason = renderConfirmationEmail(
    createWithdrawalRecord({ orderId: "ORD-1", email: "a@b.co" }, now, "WD-2"),
  );
  assert.match(noReason.body, /none required, and none given/);
});
