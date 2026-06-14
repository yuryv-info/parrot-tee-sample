/**
 * Contact page. Every detail here is fake on purpose: a 555 phone number
 * (reserved for fiction in North America), a nonsense address, and a fictional
 * GPSR "responsible person" to mirror the real EU requirement the article
 * describes (you appoint one shared EU representative whose name and address
 * legally stand behind the product).
 */
export default function ContactPage() {
  return (
    <>
      <h1>Contact us</h1>
      <p>
        Polly&apos;s Parrot Tees (fictional)
        <br />
        1 Perch Lane, Suite 555
        <br />
        Birdsville, NW 00000
        <br />
        Nowhere in particular
      </p>
      <p>
        Phone: +1-555-0142 (a parrot may answer; the parrot cannot help you)
        <br />
        Email: squawk@example.com
      </p>

      <h2>EU responsible person (GPSR)</h2>
      <p>
        Per the General Product Safety Regulation, an EU-facing seller appoints
        an EU-based representative. Ours, also fictional:
      </p>
      <p>
        Featherstone Compliance Nest BV
        <br />
        Vogelstraat 1, 1011 AB Amsterdam, Netherlands
        <br />
        eu-rep@example.eu
      </p>
      <p className="notice">
        In a real shop these would be your actual details and your actual
        appointed representative. See the article for how little that costs.
      </p>
    </>
  );
}
