// pages/api/demo/verify.js

export const config = {
  api: { bodyParser: { sizeLimit: "6mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Simulate real processing latency (demo only)
  await new Promise((r) => setTimeout(r, 1200));

  // Demo signals: name triggers different outcomes to prove end-to-end flow
  const { fullName = "", documentType = "ID", country = "N/A" } = req.body || {};
  const signal = String(fullName).toLowerCase();

  let status = "Approved";
  let riskScore = Math.floor(Math.random() * 35) + 10; // 10–44

  const flags = ["OCR simulated", "AML simulated", "Risk scoring simulated"];

  if (signal.includes("test") || signal.includes("demo")) {
    riskScore = Math.floor(Math.random() * 25) + 55; // 55–79
    status = "Review";
    flags.push("Name pattern flagged (demo rule)");
  }

  if (signal.includes("fraud") || signal.includes("sanction")) {
    riskScore = Math.floor(Math.random() * 15) + 85; // 85–99
    status = "Rejected";
    flags.push("High-risk keyword flagged (demo rule)");
  }

  return res.status(200).json({
    status,
    riskScore,
    country,
    documentType,
    flags,
    referenceId: `KYC-DEMO-${Date.now()}`,
    disclaimer:
      "This is a simulated verification flow for demonstration only. No real KYC/AML checks are performed.",
  });
}

