import Link from "next/link";

/**
 * The "one paragraph of plain copy" the article says fixes most of the risk:
 * tell customers their right exists, in plain language, and give them the
 * model withdrawal form. This page is that copy plus the EU model form.
 *
 * Wording adapted from the model instructions in Annex I of Directive
 * 2011/83/EU. It is a sample, not legal advice; have yours reviewed.
 */
export default function RightOfWithdrawalPage() {
  return (
    <>
      <h1>Your right of withdrawal</h1>

      <p>
        If you are a consumer in the EU, you have the right to withdraw from this
        contract within <strong>14 days</strong> without giving any reason.
      </p>
      <p>
        The withdrawal period expires 14 days from the day you (or someone you
        named) take physical possession of the goods. To exercise it, tell us
        your decision by a clear statement, for example the form below, an email,
        or our{" "}
        <Link href="/withdraw" className="withdraw-link">
          Withdraw from contract
        </Link>{" "}
        page. To meet the deadline it is enough to send your message before the
        period ends.
      </p>
      <p>
        If you withdraw, we refund all payments received from you, including
        standard delivery, within 14 days of being informed, using the same
        payment method you used, at no fee to you.
      </p>

      <h2>Model withdrawal form</h2>
      <p>(Complete and return this form only if you wish to withdraw.)</p>
      <pre className="email">
        {`To: Polly's Parrot Tees, 1 Perch Lane, Suite 555, Birdsville
I hereby give notice that I withdraw from my contract of sale for
the following goods:

  Order number: ____________________
  Ordered on / received on: ________
  Your name: _______________________
  Your address: ____________________
  Date: ____________________________
  Signature (only if on paper): ____`}
      </pre>

      <h2>Exceptions</h2>
      <p>
        Some goods are exempt (custom-made items, sealed hygiene goods once
        opened, perishables, and a few more). A standard printed parrot tee is
        not one of them, so the right applies here.
      </p>
    </>
  );
}
