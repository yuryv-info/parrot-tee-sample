import { WithdrawalForm } from "@/components/WithdrawalForm";

/**
 * Withdrawal entry page. If the customer arrived from an order link
 * (/withdraw?orderId=ORD-1024) we prefill the order number.
 *
 * In Next.js 16 `searchParams` is a Promise, hence the await.
 */
export default async function WithdrawPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <>
      <h1>Withdraw from contract</h1>
      <p>
        Changed your mind? Within 14 days you can withdraw from your purchase, no
        reason needed. Fill this in and we will confirm by email. Nothing is
        filed until you confirm on the next screen.
      </p>
      <WithdrawalForm defaultOrderId={orderId ?? ""} />
    </>
  );
}
