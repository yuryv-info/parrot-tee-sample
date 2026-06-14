import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/lib/products";

/** Storefront home: the catalog of (imaginary) parrot tees. */
export default function HomePage() {
  return (
    <>
      <h1>Polly&apos;s Parrot Tees</h1>
      <p>
        Premium tees for people who love a bird that talks back. Every design is
        100% cotton and 0% real, because this entire shop is a code sample that
        shows how to add an EU withdrawal flow to a small store.
      </p>
      <p className="notice">
        New: we now ship to the EU <em>and</em> tell you about your 14-day right
        to change your mind. Wild concept, we know. See{" "}
        <Link href="/legal/right-of-withdrawal">your right of withdrawal</Link>.
      </p>

      <h2>The flock</h2>
      <ul className="catalog">
        {PRODUCTS.map((product) => (
          <li key={product.slug}>
            <h3>
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            <p>{product.blurb}</p>
            <p>
              <strong>{formatPrice(product.priceEur)}</strong>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
