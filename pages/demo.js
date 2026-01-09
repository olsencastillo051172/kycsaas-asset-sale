export default function Demo() {
  return (
    <section>
      <h2>Demo</h2>

      {/* Botón externo: abre el sandbox público */}
      <a
        className="btn primary"
        href="https://demo.kycaas.app"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginRight: 12,
          background: "#0B0F14",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: 12,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Open KYCSaaS Demo (Sandbox)
      </a>

      {/* Botón interno: lleva al flujo /demo/verify */}
      <a
        href="/demo/verify"
        style={{
          display: "inline-block",
          background: "#D6B36A",
          color: "#0B0F14",
          padding: "10px 14px",
          borderRadius: 12,
          fontWeight: 900,
          textDecoration: "none",
        }}
      >
        Live Verification Demo
      </a>

      <p className="demo-note" style={{ marginTop: 16 }}>
        Live sandbox environment and internal verification demo. Uses test identities only.
      </p>
    </section>
  );
} 


