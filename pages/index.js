import React from "react";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      {/* TOP BAR */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <a
          href="/demo"
          style={{
            display: "inline-block",
            padding: "14px 22px",
            borderRadius: 10,
            background: "#16a34a", // strong fintech green
            color: "#ffffff",
            fontWeight: 800,
            textDecoration: "none",
            letterSpacing: 0.3,
            boxShadow: "0 8px 18px rgba(22,163,74,0.25)",
          }}
        >
          Live Demo
        </a>
      </div>

      <h1 style={{ margin: 0, fontSize: 34 }}>KYCSaaS – Dark Fintech UI</h1>
      <p style={{ marginTop: 8, color: "#374151", fontSize: 16 }}>
        Production-ready KYC/AML SaaS Asset
      </p>

      <ul style={{ marginTop: 16, lineHeight: 1.7 }}>
        <li>Landing premium</li>
        <li>Framer Motion animations</li>
        <li>Metrics snapshot (placeholder)</li>
        <li>Pricing tiers</li>
        <li>Acquire deal summary</li>
      </ul>

      <p style={{ marginTop: 18, color: "#6b7280", maxWidth: 820 }}>
        Tip: Click <strong>Live Demo</strong> to run a simulated KYC verification flow (name + country + document type)
        with an explainable decision output for sales validation.
      </p>
    </main>
  );
}
