// pages/api/demo/verify.js

function hashToInt(str) {
  // Small deterministic hash (stable across requests)
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Accept demo payload
  const { fullName, country, documentType, fileName } = req.body || {};

  // Simulated processing delay (for realism)
  await new Promise((r) => setTimeout(r, 900));

  // Validate minimum fields (demo rules)
  const missing = [];
  if (!fullName) missing.push("fullName");
  if (!country) missing.push("country");
  if (!documentType) missing.push("documentType");

  if (missing.length) {
    return res.status(200).json({
      status: "Review",
      riskScore: 65,
      flags: [`Missing required fields: ${missing.join(", ")}`],
      decision: "We need the full name, country, and document type to simulate verification.",
      referenceId: `KYC-DEMO-${Date.now()}`,
      disclaimer: "Simulated verification flow for demo purposes only. No real KYC/AML checks are performed.",
    });
  }

  const input = `${String(fullName).trim()}|${String(country).trim()}|${String(documentType).trim()}|${String(fileName || "")}`;
  const riskScore = hashToInt(input) % 100;

  // Simple demo heuristics (still simulated, but looks credible)
  const flags = [];
  const countryLower = String(country).toLowerCase();
  const docLower = String(documentType).toLowerCase();

  const highRiskCountries = [
    "iran",
    "north korea",
    "syria",
    "russia",
    "myanmar",
    "afghanistan",
  ];

  const weakDoc = !["passport", "national id", "id card", "driver license", "driver's license"].includes(docLower);

  if (highRiskCountries.some((c) => countryLower.includes(c))) {
    flags.push("High-risk jurisdiction flagged (demo rule)");
  }
  if (weakDoc) {
    flags.push("Document type requires manual review (demo rule)");
  }
  if (riskScore >= 85) {
    flags.push("Elevated risk score triggered (demo rule)");
  }

  let status = "Approved";
  let decision =
    "Low risk profile based on simulated jurisdiction and document type checks.";

  if (flags.length === 0 && riskScore < 70) {
    status = "Approved";
    decision = "Approved: simulated checks indicate low risk and complete input set.";
  } else if (flags.length >= 2 || riskScore >= 85) {
    status = "Rejected";
    decision =
      "Rejected: simulated risk signals exceed acceptable thresholds for automated approval.";
  } else {
    status = "Review";
    decision =
      "Review: one or more simulated risk indicators require manual verification.";
  }

  return res.status(200).json({
    status,
    riskScore,
    flags,
    decision,
    referenceId: `KYC-DEMO-${Date.now()}`,
    disclaimer: "Simulated verification flow for demo purposes only. No real KYC/AML checks are performed.",
  });
}
