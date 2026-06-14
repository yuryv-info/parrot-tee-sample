import Link from "next/link";
import { ORDERS } from "@/lib/orders";

/**
 * The demo customer's orders. Each still-withdrawable order carries its own
 * "Withdraw from this contract" link, pre-filling the order id. This is the
 * realistic place a withdrawal starts, in addition to the always-on footer link.
 */
export default function OrdersPage() {
  return (
    <>
      <h1>My orders</h1>
      <ul className="catalog">
        {ORDERS.map((order) => (
          <li key={order.id}>
            <p>
              <strong>{order.id}</strong> &middot; placed {order.placedAt}
            </p>
            <p>{order.item}</p>
            <p>Total: EUR {order.totalEur}</p>
            {order.withdrawable ? (
              <p>
                <Link href={`/withdraw?orderId=${order.id}`}>
                  Withdraw from this contract
                </Link>
              </p>
            ) : (
              <p>
                <em>14-day withdrawal window has closed for this order.</em>
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
