import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, formatPrice } from "@/lib/products";

/**
 * Product detail. "Add to cart" is a plain link to /cart; there is no real
 * cart state because the cart is not the point of this sample.
 *
 * In Next.js 16 route `params` arrive as a Promise, hence the await.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <p>
        <Link href="/">&larr; Back to the flock</Link>
      </p>
      <h1>{product.name}</h1>
      <p>{product.blurb}</p>
      <p>
        <strong>{formatPrice(product.priceEur)}</strong>
      </p>

      <p>
        Sizes: {product.sizes.join(", ")}. Fits true to wingspan. Machine wash
        cold, hang to dry, do not let your actual parrot near it.
      </p>

      <p>
        <Link href="/cart">Add to cart</Link>
      </p>
    </>
  );
}
