/**
 * POST /api/withdraw — the entire server side of the withdrawal flow.
 *
 * It does four things, in order:
 *   1. parse + validate the untrusted request body (system boundary)
 *   2. build a timestamped record
 *   3. store it (mock store; see lib/store.ts for the swap-in)
 *   4. send / render the durable-medium confirmation email
 *
 * It returns the record and the email so the client can show the customer
 * exactly what was filed and what they will receive. In production you would
 * actually hand the email to a provider (Resend, Postmark, SES) at step 4 and
 * probably not return the full body to the browser.
 */

import { NextResponse } from "next/server";
import {
  createWithdrawalRecord,
  parseWithdrawalRequest,
  renderConfirmationEmail,
} from "@/lib/withdrawal";
import { saveWithdrawal } from "@/lib/store";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON." }, { status: 400 });
  }

  let withdrawalRequest;
  try {
    withdrawalRequest = parseWithdrawalRequest(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // 2 + 3: record it with a timestamp and store it.
  const record = createWithdrawalRecord(withdrawalRequest);
  await saveWithdrawal(record);

  // 4: the durable medium. PRODUCTION: actually send this.
  //   await resend.emails.send({ ...email, from: "shop@yourdomain" });
  const email = renderConfirmationEmail(record);

  return NextResponse.json({ record, email }, { status: 201 });
}
