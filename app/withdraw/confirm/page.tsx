"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

/**
 * Step 2: the deliberate confirm step (requirement #2). It shows the customer
 * exactly what they are about to withdraw from, then, only on the explicit
 * "Confirm" click, POSTs to /api/withdraw to create the timestamped record.
 *
 * On success it stashes the returned record + email in sessionStorage and moves
 * to the success page. sessionStorage is used because this sample has no
 * persistent server store; a real shop would redirect to /withdraw/success/[id]
 * and look the record up server-side.
 */
function ConfirmInner() {
  const router = useRouter();
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "";
  const email = params.get("email") ?? "";
  const reason = params.get("reason") ?? "";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, email, reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      sessionStorage.setItem("lastWithdrawal", JSON.stringify(data));
      router.push("/withdraw/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  if (!orderId || !email) {
    return (
      <>
        <h1>Confirm withdrawal</h1>
        <p>Missing order number or email. Please start again.</p>
        <p>
          <Link href="/withdraw">Back to the withdrawal form</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Confirm withdrawal</h1>
      <p>Please confirm you want to withdraw from this contract:</p>
      <ul>
        <li>Order: {orderId}</li>
        <li>Confirmation email to: {email}</li>
        <li>Reason: {reason || "none given"}</li>
      </ul>
      <p className="notice">
        This is final once you confirm. We will record it with a timestamp and
        email you a copy as your durable record.
      </p>
      {error && <p style={{ color: "#b00020" }}>{error}</p>}
      <p>
        <button onClick={confirm} disabled={submitting}>
          {submitting ? "Filing..." : "Confirm withdrawal"}
        </button>{" "}
        <Link href="/withdraw">Cancel</Link>
      </p>
    </>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConfirmInner />
    </Suspense>
  );
}
