// pages/demo/verify.js
import { useState } from "react";
import Head from "next/head";

export default function VerifyDemo() {
  const [fullName, setFullName] = useState("Demo User");
  const [country, setCountry] = useState("US");
  const [documentType, setDocumentType] = useState("Passport");
  const [file, setFile] = useState(null);

  const [running, setRunning] = useState(false);
  const [step, setStep] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const canRun = fullName.trim().length >= 3 && country && documentType;

  async function run() {
    setError("");
    setResult(null);
    if (!canRun) return setError("Completa nombre, país y tipo de documento.");

    setRunning(true);

    const steps = [
      "Recibiendo solicitud…",
      "Validando documento…",
      "Calculando riesgo…",
      "Ejecutando screening AML…",
      "Generando decisión…",
    ];

    try {
      for (const s of steps) {
        setStep(s);
        // pausa corta para “demo feel”
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 350));
      }

      const res = await fetch("/api/demo/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          country,
          documentType,
          fileName: file ? file.name : null,
          fileType: file ? file.type : null,
          fileSize: file ? file.size : null,
        }),
      });

      if (!res.ok) throw new Error("Falló el demo API. Revisa el endpoint.");
      const data = await res.json();
      setResult(data);
      setStep("Listo.");
    } catch (e) {
      setError(e?.message || "Error inesperado.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <>
      <Head>
        <title>KYCSaaS • Demo Verification</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#0B0F14", color: "#fff" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>
                KYCSaaS <span style={{ color: "#D6B36A" }}>Verification Demo</span>
              </h1>
              <div style={{ marginTop: 8, fontSize: 13, opacity: 0.65, maxWidth: 720, lineHeight: 1.45 }}>
                Demo local: no llama proveedores externos. Simula el flujo KYC/AML (orquestación + score + flags + decisión) para evaluación de comprador.
              </div>
            </div>
            <a href="/" style={{ color: "#D6B36A", textDecoration: "none", fontWeight: 800 }}>
              ← Volver
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, background: "rgba(255,255,255,0.04)", padding: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Inputs</div>

              <label style={{ fontSize: 12, opacity: 0.7 }}>Nombre completo</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: "100%", marginTop: 6, marginBottom: 10, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.35)", color: "#fff" }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 12, opacity: 0.7 }}>País</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.35)", color: "#fff" }}
                  >
                    <option value="US">US</option>
                    <option value="GB">GB</option>
                    <option value="ES">ES</option>
                    <option value="MX">MX</option>
                    <option value="CO">CO</option>
                    <option value="DO">DO</option>
                    <option value="BR">BR</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, opacity: 0.7 }}>Tipo de documento</label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    style={{ width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.35)", color: "#fff" }}
                  >
                    <option>Passport</option>
                    <option>National ID</option>
                    <option>Driver License</option>
                    <option>Residence Permit</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 12, opacity: 0.7 }}>Archivo (opcional)</label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  style={{ width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.35)", color: "#fff" }}
                />
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.5 }}>
                  No se hace OCR real; solo se toma metadata para simular.
                </div>
              </div>

              {error ? (
                <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(255,80,80,0.12)", border: "1px solid rgba(255,80,80,0.35)", color: "#ffd1d1", fontSize: 13 }}>
                  {error}
                </div>
              ) : null}

              <button
                onClick={run}
                disabled={!canRun || running}
                style={{
                  width: "100%",
                  marginTop: 12,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: "#D6B36A",
                  color: "#0B0F14",
                  fontWeight: 900,
                  cursor: !canRun || running ? "not-allowed" : "pointer",
                  opacity: !canRun || running ? 0.6 : 1,
                }}
              >
                {running ? "Procesando…" : "Run Verification (Demo)"}
              </button>
            </div>

            <div style={{ border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, background: "rgba(255,255,255,0.04)", padding: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Proceso</div>

              <div style={{ fontSize: 13, opacity: 0.8, minHeight: 22 }}>{step || "Listo para ejecutar."}</div>

              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                <div style={{ fontWeight: 900, fontSize: 13, opacity: 0.85 }}>Resultado</div>

                {!result ? (
                  <div style={{ marginTop: 8, fontSize: 13, opacity: 0.6 }}>Ejecuta el demo para generar un resultado.</div>
                ) : (
                  <div style={{ marginTop: 10, padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.28)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", fontSize: 12 }}>
                        {result.status}
                      </span>
                      <span style={{ fontSize: 12, opacity: 0.7 }}>Risk:</span>
                      <span style={{ fontWeight: 900 }}>{result.riskScore}/100</span>
                    </div>

                    <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
                      Verification ID: <span style={{ fontFamily: "monospace", opacity: 0.95 }}>{result.verificationId}</span>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 12, opacity: 0.7 }}>Flags</div>
                      <div style={{ marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {result.flags?.length ? result.flags.map((f) => (
                          <span key={f} style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", fontSize: 12 }}>
                            {f}
                          </span>
                        )) : <span style={{ fontSize: 12, opacity: 0.6 }}>None</span>}
                      </div>
                    </div>

                    <div style={{ marginTop: 10, fontSize: 12, opacity: 0.5 }}>
                      Completed: {new Date(result.completedAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.5 }}>
                Nota: esto demuestra el “workflow orchestration” listo para integrar proveedor real (OCR, sanctions, etc.).
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
