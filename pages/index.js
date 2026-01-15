import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runDemo = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/demo/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demo: true }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main>
      {/* TOP BAR */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <button
          onClick={runDemo}
          disabled={loading}
          style={{
            background: "#16a34a",
            color: "#0b1220",
            fontWeight: 900,
            padding: "14px 22px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          {loading ? "Running Demo..." : "Live Demo"}
        </button>
      </div>

      {/* EXISTING CONTENT */}
      <h1>KYCSaaS – Dark Fintech UI</h1>
      <p>Production-ready KYC/AML SaaS Asset</p>
      <ul>
        <li>Landing premium</li>
        <li>Framer Motion animations</li>
        <li>Metrics snapshot (placeholder)</li>
        <li>Pricing tiers</li>
        <li>Acquire deal summary</li>
      </ul>

      {/* DEMO RESULT */}
      {result && (
        <div style={{ marginTop: 24 }}>
          <strong>Status:</strong> {result.status}<br />
          <strong>Risk Score:</strong> {result.riskScore}<br />
          <small>{result.disclaimer}</small>
        </div>
      )}
    </main>
  );
}
