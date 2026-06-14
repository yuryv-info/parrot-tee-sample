/**
 * Mock "past orders" for the demo account.
 *
 * A real shop would load these for the logged-in customer from its order
 * system. Here they are static so the /orders page has something to show, and
 * so each order can offer a "Withdraw from this contract" link.
 */

export type Order = {
  /** Human-facing order id, e.g. "ORD-1024". */
  id: string;
  /** ISO date the order was placed. */
  placedAt: string;
  item: string;
  totalEur: number;
  /**
   * Whether the EU 14-day withdrawal window is still open for this order.
   * In production you would compute this from the delivery date, not store a
   * boolean. See docs/the-spec.md for which goods are exempt entirely.
   */
  withdrawable: boolean;
};

/** The demo customer's order history. */
export const ORDERS: Order[] = [
  {
    id: "ORD-1024",
    placedAt: "2026-06-10",
    item: '"Polly Wants a Cracker" Classic Tee (size L)',
    totalEur: 24,
    withdrawable: true,
  },
  {
    id: "ORD-0991",
    placedAt: "2026-06-02",
    item: '"100% Chance of Feathers" Hoodie (size M)',
    totalEur: 48,
    withdrawable: true,
  },
  {
    id: "ORD-0840",
    placedAt: "2026-04-18",
    item: '"Talk Birdy to Me" Tee (size S)',
    totalEur: 24,
    withdrawable: false,
  },
];

/** Find one order by id, or undefined. */
export function getOrder(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}
