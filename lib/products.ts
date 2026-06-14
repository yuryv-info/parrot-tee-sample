/**
 * Mock product catalog for Polly's Parrot Tees.
 *
 * This is hard-coded sample data. In a real shop this would come from your
 * commerce backend (Shopify Storefront API, a database, a CMS, etc.). Nothing
 * here is real: prices are play money, the parrots are imaginary.
 */

export type Product = {
  /** URL-safe id used in /products/[slug]. */
  slug: string;
  name: string;
  /** Price in whole euros, kept trivial on purpose. */
  priceEur: number;
  /** One-line shelf blurb. */
  blurb: string;
  sizes: string[];
};

/** The entire (tiny) store inventory. */
export const PRODUCTS: Product[] = [
  {
    slug: "polly-wants-a-cracker",
    name: '"Polly Wants a Cracker" Classic Tee',
    priceEur: 24,
    blurb: "The original. A grey African parrot demanding snacks, in 100% combed cotton.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "talk-birdy-to-me",
    name: '"Talk Birdy to Me" Tee',
    priceEur: 24,
    blurb: "For the smooth-talking macaw in your life. Runs true to wingspan.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "macaw-some",
    name: '"Simply Macaw-some" Tee',
    priceEur: 26,
    blurb: "A scarlet macaw and one extremely confident pun. No regrets.",
    sizes: ["M", "L", "XL"],
  },
  {
    slug: "feather-forecast-hoodie",
    name: '"100% Chance of Feathers" Hoodie',
    priceEur: 48,
    blurb: "Cozy fleece for cold perches. The cockatoo on the back is judging you.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

/** Look up a single product by slug, or undefined if it is not in the catalog. */
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Format a euro amount the boring, predictable way: "EUR 24". */
export function formatPrice(priceEur: number): string {
  return `EUR ${priceEur}`;
}
