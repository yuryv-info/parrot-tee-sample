"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Step 1 of the flow: collect the order id, email, and an optional reason,
 * then send the customer to the confirm step. It deliberately does NOT call the
 * server yet, no record is created until the customer confirms (requirement #2).
 */
export function WithdrawalForm({ defaultOrderId = "" }: { defaultOrderId?: string }) {
  const router = useRouter();
  const [orderId, setOrderId] = useState(defaultOrderId);
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const query = new URLSearchParams({ orderId, email });
    if (reason.trim()) query.set("reason", reason.trim());
    router.push(`/withdraw/confirm?${query.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order number
        <input
          name="orderId"
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="ORD-1024"
        />
      </label>
      <label>
        Your email (we send your confirmation here)
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </label>
      <label>
        Reason (optional, the law does not require one)
        <textarea
          name="reason"
          rows={2}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </label>
      <button type="submit">Continue</button>
    </form>
  );
}
