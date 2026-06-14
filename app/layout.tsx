import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polly's Parrot Tees",
  description:
    "A tiny, fictional merch shop that exists to demonstrate the EU 14-day right-of-withdrawal flow. Open-source sample code.",
};

/**
 * Root layout: the same header and footer wrap every page.
 *
 * The footer holds the "Withdraw from contract" link. Putting it here is the
 * whole trick to requirement #1 ("a visible link on every page"): define it
 * once in the layout and every route inherits it for free.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header>
          <strong>Polly&apos;s Parrot Tees</strong>
          <nav>
            <Link href="/">Shop</Link>
            <Link href="/orders">My orders</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>
            {/* Requirement #1: the always-visible withdrawal link. */}
            <Link href="/withdraw" className="withdraw-link">
              Withdraw from contract
            </Link>{" "}
            &middot; <Link href="/legal/right-of-withdrawal">Right of withdrawal</Link>{" "}
            &middot; <Link href="/legal/terms">Terms</Link>{" "}
            &middot; <Link href="/legal/privacy">Privacy</Link>
          </p>
          <p>
            Polly&apos;s Parrot Tees is a fictional shop in an open-source code sample.
            No real parrots, prices, or payments. Not legal advice.
          </p>
        </footer>
      </body>
    </html>
  );
}
