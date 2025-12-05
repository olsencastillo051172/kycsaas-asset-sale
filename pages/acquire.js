export default function Acquire() {
  return (
    <section>
      <h2>Acquire Deal Summary</h2>
      <div className="deal-card">
        <h3>What’s Included</h3>
        <ul className="plain-list">
          <li>Frontend + backend repo (KYCSaaS core)</li>
          <li>Multi-tenant dashboard & KYC widget</li>
          <li>Landing site for <code>kycsaas.io</code></li>
          <li>One-pager PDF (replace placeholder in <code>/public</code>)</li>
          <li>3 pilot collaborators with real KYC flows and PayPal receipts (available in deal room)</li>
        </ul>
      </div>
      <p className="section-intro">
        Buyer will receive anonymized PayPal receipts and short written testimonials
        from the 3 pilot collaborators as part of the private deal room (not public).
      </p>
    </section>
  );
}
