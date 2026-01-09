// pages/api/demo/verify.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const {
      fullName = "Demo User",
      country = "US",
      documentType = "Passport",
      documentNumber = "DEMO-123",
    } = req.body || {};

    // Simulación determinista simple (para que parezca "real" y repetible)
    const seed = `${fullName}|${country}|${documentType}|${documentNumber}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;

    const riskScore = hash % 100; // 0-99
    const approved = riskScore < 70; // regla demo
    const verificationId = `KYC-${Date.now()}-${String(hash).slice(0, 6)}`;

    const result = {
      ok: true,
      verificationId,
      status: approved ? "Approved" : "Rejected",
      riskScore,
      country,
      documentType,
      signals: approved
        ? ["document_readable", "no_watchlist_match_demo"]
        : ["risk_threshold_exceeded_demo"],
      note: "Demo mode: simulated verification. Production uses provider integration (OCR/AML/sanctions).",
      createdAt: new Date().toISOString(),
    };

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Demo verification failed" });
  }
}
