import Link from "next/link";

/**
 * Mock checkout. The form does not submit anywhere; "Place order" just sends
 * you to your orders. A real checkout is its own large topic (payments, tax,
 * the EU import fee the article mentions) and is out of scope for this sample.
 */
export default function CheckoutPage() {
  return (
    <>
      <h1>Checkout</h1>
      <p className="notice">
        This is where, in a real EU-facing shop, you would surface the buyer&apos;s
        14-day withdrawal right <em>before</em> they pay, plus any &quot;EU import
        fee&quot; line. See <Link href="/legal/right-of-withdrawal">right of withdrawal</Link>.
      </p>

      <form action="/orders">
        <label>
          Name
          <input name="name" defaultValue="Captain Featherbottom" />
        </label>
        <label>
          Email
          <input name="email" type="email" defaultValue="captain@example.com" />
        </label>
        <label>
          Shipping address
          <textarea name="address" rows={3} defaultValue={"1 Perch Lane\nApt. Squawk\n00-001 Birdsville"} />
        </label>
        <p>Total: EUR 24 (+ EUR 0 imaginary shipping)</p>
        <button type="submit">Place order</button>
      </form>
    </>
  );
}
