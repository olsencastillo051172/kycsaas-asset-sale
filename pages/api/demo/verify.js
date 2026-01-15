export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await new Promise(r => setTimeout(r, 1200));

  res.status(200).json({
    status: "Approved",
    decision: "Low risk profile based on simulated jurisdiction and document type.",
    riskScore: Math.floor(Math.random() * 100),
    flags: ["OCR simulated", "AML simulated"],
    disclaimer: "Simulated KYC verification for demo purposes only."
  });
}
