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

          {/* Cross-promo: this sample is companion code for a newsletter, so the
              credit and brand links ride on every page, unmissably. */}
          <div className="crosspromo">
            <p>
              🦜 Built by <strong>Yury Vashchylau</strong> as the companion code for a{" "}
              <a href="https://yvinsights.com">YV Insights</a> deep dive on the EU
              withdrawal directive.
            </p>
            <p>
              <a href="https://yuryv.info">yuryv.info</a> &middot;{" "}
              <a href="https://yvinsights.com">YV Insights (Substack)</a> &middot;{" "}
              <a href="https://www.linkedin.com/newsletters/yv-insider-by-yuryv-info-7444467518737608704/">
                YV Insider (LinkedIn)
              </a>{" "}
              &middot; <a href="https://yvpodcast.yvinsights.com/">YV Podcast</a>
            </p>
            <p>
              <em>A deep dive into how apps, games, people, and money interact.</em>
            </p>
            <p>
              <a href="https://github.com/yuryv-info/parrot-tee-sample">
                ★ Star / fork the source on GitHub
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
