// pages/api/demo/verify.js
import crypto from "crypto";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function hashToInt(input) {
  const h = crypto.createHash("sha256").update(input).digest("hex");
  return parseInt(h.slice(0, 8), 16);
}

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { fullName, country, documentType, fileName, fileType, fileSize } = req.body || {};

  if (!fullName || String(fullName).trim().length < 3 || !country || !documentType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const seedStr = JSON.stringify({
    fullName: String(fullName).trim(),
    country: String(country).trim().toUpperCase(),
    documentType: String(documentType).trim(),
    fileName: fileName || "",
    fileType: fileType || "",
    fileSize: fileSize || 0,
  });

  const seed = hashToInt(seedStr);

  const riskScore = clamp(seed % 101, 0, 100);

  const flags = [];
  if (riskScore >= 70) flags.push("HIGH_RISK_SCORE");
  if (riskScore >= 55 && riskScore < 70) flags.push("MANUAL_REVIEW_RECOMMENDED");
  if (riskScore % 9 === 0) flags.push("DOCUMENT_QUALITY_LOW");
  if (riskScore % 13 === 0) flags.push("NAME_MATCH_PARTIAL");

  let status = "APPROVED";
  if (riskScore >= 80) status = "REJECTED";
  else if (riskScore >= 60) status = "FLAGGED";

  const verificationId = `KYC-${crypto.createHash("md5").update(seedStr).digest("hex").slice(0, 10).toUpperCase()}`;

  return res.status(200).json({
    verificationId,
    status,
    riskScore,
    flags,
    completedAt: new Date().toISOString(),
  });
}
