// pages/api/demo/verify.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Optional: parse payload (kept permissive for demo)
  const { fullName, country, documentType } = req.body || {};

  // Simulated processing delay
  await new Promise((r) => setTimeout(r, 1200));

  // Simple deterministic-ish logic for credibility (still simulated)
  const flags = [];
  let riskScore = Math.floor(Math.random() * 100);

  if (!fullName || !country || !documentType) {
    flags.push("Missing required fields (simulated)");
    riskScore = Math.max(riskScore, 70);
  }

  const highRiskCountries = ["Iran", "North Korea", "Syria", "Russia"];
  if (country && highRiskCountries.includes(country)) {
    flags.push("High-risk jurisdiction (simulated)");
    riskScore = Math.max(riskScore, 85);
  }

  const decision =
    riskScore >= 85 ? "Rejected" : riskScore >= 60 ? "Review" : "Approved";

  const reason =
    decision === "Approved"
      ? "Low risk profile based on simulated checks."
      : decision === "Review"
      ? "Additional review required due to elevated simulated risk signals."
      : "High risk profile based on simulated jurisdiction/document signals.";

  return res.status(200).json({
    status: decision,
    decision,
    riskScore,
    flags,
    reason,
    disclaimer:
      "This is a simulated KYC verification flow for demonstration purposes only. No real KYC/AML checks are performed.",
  });
}
