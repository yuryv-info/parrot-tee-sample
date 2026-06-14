import Link from "next/link";

/** A pretend cart. Always holds exactly one tee, because state is not the lesson here. */
export default function CartPage() {
  return (
    <>
      <h1>Your cart</h1>
      <ul className="catalog">
        <li>
          <p>&quot;Polly Wants a Cracker&quot; Classic Tee (size L)</p>
          <p>
            <strong>EUR 24</strong>
          </p>
        </li>
      </ul>
      <p>Subtotal: EUR 24. Shipping calculated like everything else here: imaginarily.</p>
      <p>
        <Link href="/checkout">Proceed to checkout</Link>
      </p>
    </>
  );
}
