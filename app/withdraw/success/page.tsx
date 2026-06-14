"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ConfirmationEmail, WithdrawalRecord } from "@/lib/withdrawal";

type StoredResult = { record: WithdrawalRecord; email: ConfirmationEmail };

/**
 * Step 3 + 4: show the stored record (with its timestamp) and the durable-
 * medium email. The data was put in sessionStorage by the confirm step. In a
 * real shop you would fetch it from your datastore by id instead.
 */
export default function SuccessPage() {
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastWithdrawal");
    if (raw) setResult(JSON.parse(raw) as StoredResult);
    setLoaded(true);
  }, []);

  if (loaded && !result) {
    return (
      <>
        <h1>No withdrawal to show</h1>
        <p>
          We could not find a recent withdrawal in this browser session. Start
          from the <Link href="/withdraw">withdrawal form</Link>.
        </p>
      </>
    );
  }

  if (!result) return <p>Loading...</p>;

  const { record, email } = result;

  return (
    <>
      <h1>Withdrawal received</h1>
      <p>
        Done. Your withdrawal from order <strong>{record.orderId}</strong> is on
        record. Reference <strong>{record.id}</strong>.
      </p>

      <h2>The stored record (timestamped)</h2>
      <pre className="email">{JSON.stringify(record, null, 2)}</pre>

      <h2>Your confirmation email (the durable medium)</h2>
      <p>
        In production this is actually sent to {email.to}. Here it is rendered so
        you can see exactly what the customer keeps:
      </p>
      <p>
        <strong>Subject:</strong> {email.subject}
      </p>
      <pre className="email">{email.body}</pre>

      <p>
        <Link href="/">Back to the shop</Link>
      </p>
    </>
  );
}
