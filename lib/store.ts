/**
 * The mock "database" for withdrawal records.
 *
 * ----------------------------------------------------------------------------
 * THIS IS THE ONE PIECE YOU MUST REPLACE FOR PRODUCTION.
 * ----------------------------------------------------------------------------
 *
 * It is an in-memory Map. That is fine for a demo and for local dev, but on a
 * serverless host (Vercel, Lambda, Cloudflare) memory is per-instance and
 * resets, so records do NOT survive between requests in production. The point
 * here is only to show WHERE the "stored record with a timestamp" lives in the
 * flow, not to be a real datastore.
 *
 * To make it real, replace the body of `saveWithdrawal` / `getWithdrawal` with
 * one of:
 *   - Vercel KV / Upstash Redis:  await kv.set(`wd:${record.id}`, record)
 *   - Postgres (Neon/Supabase):   INSERT INTO withdrawals ...
 *   - your existing orders DB:     add a `withdrawals` table next to `orders`
 *
 * The function signatures are intentionally async so swapping in a real,
 * awaited datastore needs no changes at the call sites.
 */

import type { WithdrawalRecord } from "./withdrawal";

const records = new Map<string, WithdrawalRecord>();

/** Persist a withdrawal record. Swap the Map for your real datastore. */
export async function saveWithdrawal(record: WithdrawalRecord): Promise<void> {
  records.set(record.id, record);
  // A real shop would also log this for its audit trail.
  console.log(`[withdrawal] stored ${record.id} for order ${record.orderId} at ${record.requestedAt}`);
}

/** Read one withdrawal record back by id, or null if unknown. */
export async function getWithdrawal(id: string): Promise<WithdrawalRecord | null> {
  return records.get(id) ?? null;
}
