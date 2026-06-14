/**
 * The actual point of this whole repo.
 *
 * EU consumers have a 14-day right to withdraw from a distance contract
 * (Consumer Rights Directive 2011/83/EU, as amended by Directive 2023/2673).
 * A small seller's entire obligation, mechanically, is four things:
 *
 *   1. a visible "Withdraw from contract" link on every page
 *   2. a confirm step so nobody cancels by accident
 *   3. a stored record with a timestamp
 *   4. a confirmation email as the "durable medium"
 *
 * This file owns steps 3 and 4: it turns a withdrawal request into a stored,
 * timestamped record and into the confirmation email text. It has zero
 * dependencies and no framework imports, so you can copy it into any
 * TypeScript backend as-is.
 *
 * This is NOT legal advice. It is a worked example of the mechanics.
 */

/** The fields a customer submits when they exercise the right. */
export type WithdrawalRequest = {
  /** Which order they are withdrawing from, e.g. "ORD-1024". */
  orderId: string;
  /** Where the durable-medium confirmation gets sent. */
  email: string;
  /** Optional. The law does NOT require a reason; we accept one if offered. */
  reason?: string;
};

/** A persisted withdrawal, i.e. what your database row looks like. */
export type WithdrawalRecord = WithdrawalRequest & {
  /** Server-generated id for the withdrawal itself (not the order). */
  id: string;
  /** ISO 8601 timestamp. This is the legally interesting part: when they asked. */
  requestedAt: string;
  /**
   * Status is "received" the moment we record it. The withdrawal is effective
   * on receipt; any refund deadline (14 days) runs from this timestamp.
   */
  status: "received";
};

/** A plain-text email, ready to hand to any mail provider. */
export type ConfirmationEmail = {
  to: string;
  subject: string;
  body: string;
};

/**
 * Validate a raw, untrusted request body from the network.
 *
 * Returns a clean WithdrawalRequest, or throws with a human-readable message.
 * This is the system boundary: trust nothing above this line.
 */
export function parseWithdrawalRequest(input: unknown): WithdrawalRequest {
  if (typeof input !== "object" || input === null) {
    throw new Error("Request body must be a JSON object.");
  }
  const body = input as Record<string, unknown>;
  const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";

  if (!orderId) throw new Error("orderId is required.");
  // Deliberately loose: a real shop reuses its existing email validation.
  if (!email || !email.includes("@")) throw new Error("A valid email is required.");

  return reason ? { orderId, email, reason } : { orderId, email };
}

/**
 * Turn a validated request into a stored record.
 *
 * `now` and `id` are injected so this stays a pure function and is trivial to
 * test; callers pass `new Date()` and a real id generator in production.
 */
export function createWithdrawalRecord(
  request: WithdrawalRequest,
  now: Date = new Date(),
  id: string = generateId(),
): WithdrawalRecord {
  return {
    ...request,
    id,
    requestedAt: now.toISOString(),
    status: "received",
  };
}

/**
 * Render the confirmation email. This is the "durable medium" the directive
 * requires: a copy the customer can keep, proving they withdrew and when.
 *
 * Plain text on purpose. Swap in your own template / HTML if you like.
 */
export function renderConfirmationEmail(record: WithdrawalRecord): ConfirmationEmail {
  const when = new Date(record.requestedAt).toUTCString();
  const lines = [
    `Hi,`,
    ``,
    `We have received your withdrawal from the contract for order ${record.orderId}.`,
    ``,
    `Reference: ${record.id}`,
    `Received: ${when}`,
    record.reason ? `Reason you gave: ${record.reason}` : `Reason: none required, and none given.`,
    ``,
    `Under EU consumer law you may return the goods within 14 days. We will`,
    `refund the price (including standard delivery) within 14 days of receiving`,
    `your withdrawal, using the same payment method you used to order.`,
    ``,
    `Keep this email as your record.`,
    ``,
    `-- Polly's Parrot Tees (a fictional shop in a code sample)`,
  ];
  return {
    to: record.email,
    subject: `Your withdrawal from order ${record.orderId} (ref ${record.id})`,
    body: lines.join("\n"),
  };
}

/** Tiny, dependency-free id generator: "WD-" + base36 time + random. */
function generateId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WD-${stamp}-${rand}`;
}
