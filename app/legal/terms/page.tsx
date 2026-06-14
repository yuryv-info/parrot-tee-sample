import Link from "next/link";

/** Stub terms page. Short on purpose. */
export default function TermsPage() {
  return (
    <>
      <h1>Terms of sale</h1>
      <p>
        These are sample terms for a shop that sells nothing. By reading them you
        agree that no parrots were harmed and no money changed hands.
      </p>
      <p>
        Your statutory rights, including the{" "}
        <Link href="/legal/right-of-withdrawal">14-day right of withdrawal</Link>,
        are not affected by anything on this page, which is the point.
      </p>
    </>
  );
}
