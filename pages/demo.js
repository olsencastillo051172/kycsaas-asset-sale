// pages/demo.js
import { useState } from "react";

export default function Demo() {
  const [fullName, setFullName] = useState("John Demo");
  const [country, setCountry] = useState("Dominican Republic");
  const [documentType, setDocumentType] = useState("Passport");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  async function runVerification(e) {
    e.preventDefault();
    setErr("");
    setResult(null);
    setLoading(true);

    try {
      const resp = await fetch("/api/demo/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          country,
          documentType,
          fileName: fileName || "uploaded-document.png",
        }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "Request failed");

      setResult(data);
    } catch (e2) {
      setErr(e2.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  const badgeStyle = (status) => {
    const base = { padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 };
    if (status === "Approved")
      return {
        ...base,
        background: "rgba(34,197,94,.15)",
        color: "#22c55e",
        border: "1px solid rgba(34,197,94,.35)",
      };
    if (status === "Review")
      return {
        ...base,
        background: "rgba(245,158,11,.15)",
        color: "#f59e0b",
        border: "1px solid rgba(245,158,11,.35)",
      };
    return {
      ...base,
      background: "rgba(239,68,68,.15)",
      color: "#ef4444",
      border: "1px solid rgba(239,68,68,.35)",
    };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f14", color: "#e5e7eb" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 20px" }}>
        {/* Top CTA strip */}
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Demo</h2>

          <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="https://demo.kycaas.app"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                background: "#0B0F14",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(148,163,184,.18)",
              }}
            >
              Open KYCSaaS Demo (Sandbox)
            </a>

            <a
              href="#verification"
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
          </div>

          <p style={{ marginTop: 12, color: "#94a3b8" }}>
            Live sandbox environment and internal verification demo. Uses test identities only.
          </p>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <div style={{ color: "#fbbf24", fontWeight: 800 }}>KYCSaaS / AML</div>
            <h1 style={{ fontSize: 32, margin: "10px 0 8px" }}>Verification Demo</h1>
            <p style={{ color: "#94a3b8", margin: 0, maxWidth: 720 }}>
              End-to-end demo flow: Upload → Simulated checks → Risk score → Decision. This proves UI → API → rendering.
            </p>
          </div>
          <div
            style={{
              border: "1px solid rgba(148,163,184,.18)",
              borderRadius: 14,
              padding: 14,
              background: "rgba(15,23,42,.35)",
            }}
          >
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Mode</div>
            <div style={{ fontWeight: 800 }}>Demo / Simulated Providers</div>
          </div>
        </div>

        <div style={{ height: 20 }} />

        <div id="verification" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 18 }}>
          {/* Form */}
          <form
            onSubmit={runVerification}
            style={{
              border: "1px solid rgba(148,163,184,.18)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(2,6,23,.45)",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Run a verification</div>

            <label style={labelStyle}>Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., Jane Customer"
              style={inputStyle}
              required
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
              <div>
                <label style={labelStyle}>Country</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Document type</label>
                <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} style={inputStyle}>
                  <option>Passport</option>
                  <option>National ID</option>
                  <option>Driver License</option>
                  <option>Residence Permit</option>
                </select>
              </div>
            </div>

            <label style={{ ...labelStyle, marginTop: 12 }}>Upload document (demo)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              style={{ ...inputStyle, padding: "10px 12px" }}
            />

            <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
              Note: the file is not processed in demo mode. The name triggers simulated risk signals for a credible walkthrough.
            </div>

            {err ? (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(239,68,68,.35)",
                  background: "rgba(239,68,68,.12)",
                  color: "#fecaca",
                }}
              >
                {err}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 14,
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(251,191,36,.35)",
                background: loading
                  ? "rgba(251,191,36,.12)"
                  : "linear-gradient(90deg, rgba(251,191,36,.95), rgba(245,158,11,.95))",
                color: "#0b0f14",
                fontWeight: 900,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Running checks…" : "Run Verification"}
            </button>

            <div style={{ marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
              Demo tip: include <b>demo</b> to trigger <b>Review</b>, or <b>fraud</b>/<b>sanction</b> to trigger <b>Rejected</b>.
            </div>
          </form>

          {/* Result */}
          <div
            style={{
              border: "1px solid rgba(148,163,184,.18)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(2,6,23,.45)",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Result</div>

            {!result ? (
              <div style={{ color: "#94a3b8", lineHeight: 1.6 }}>
                Run a verification to view decision, risk score, flags and a reference ID.
                <div
                  style={{
                    marginTop: 12,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid rgba(148,163,184,.18)",
                    background: "rgba(15,23,42,.35)",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>What this proves</div>
                  <div style={{ fontWeight: 800 }}>UI → API → Result rendering</div>
                  <div style={{ marginTop: 6, fontSize: 12, color: "#64748b" }}>
                    A buyer can replace the simulated rules with real OCR / AML providers without rebuilding the product shell.
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={badgeStyle(result.status)}>{result.status}</div>
                  <div style={{ fontFamily: "ui-monospace, Menlo, Monaco, Consolas", fontSize: 12, color: "#94a3b8" }}>
                    {result.referenceId}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 14,
                    padding: 14,
                    borderRadius: 14,
                    border: "1px solid rgba(148,163,184,.18)",
                    background: "rgba(15,23,42,.35)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>Risk score</div>
                      <div style={{ fontSize: 28, fontWeight: 900 }}>{result.riskScore}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>Country</div>
                      <div style={{ fontWeight: 800 }}>{result.country}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>Document type</div>
                      <div style={{ fontWeight: 800 }}>{result.documentType}</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Flags</div>
                  <ul style={{ margin: "8px 0 0 18px", color: "#cbd5e1" }}>
                    {(result.flags || []).map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>{result.disclaimer}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, color: "#94a3b8", marginTop: 10 };
const inputStyle = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,.18)",
  background: "rgba(15,23,42,.35)",
  color: "#e5e7eb",
  outline: "none",
};




