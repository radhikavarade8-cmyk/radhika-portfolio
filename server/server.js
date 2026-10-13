const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "..", "public");
app.use(express.json({ limit: "30kb" }));
app.use(express.static(publicDir));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "radhika-portfolio", timestamp: new Date().toISOString() });
});

app.get("/api/assets/pirohaa", (_req, res) => {
  const dir = path.join(publicDir, "assets", "pirohaa");
  if (!fs.existsSync(dir)) return res.json([]);
  const files = fs.readdirSync(dir).filter(file => /\.(png|jpe?g|webp|gif)$/i.test(file));
  res.json(files);
});

// Minimal contact endpoint: validates input and logs it on the server.
// Before public deployment, connect a mail provider and add rate limiting / spam protection.
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (![name, email, message].every(v => typeof v === "string" && v.trim())) {
    return res.status(400).json({ error: "Please provide your name, email, and message." });
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ error: "One or more fields are too long." });
  }
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailLooksValid) return res.status(400).json({ error: "Please enter a valid email address." });
  console.log("Portfolio contact submission:", {
    name: name.trim(), email: email.trim(), message: message.trim(),
    receivedAt: new Date().toISOString()
  });
  res.status(202).json({ message: "Message received by the demo server. Connect an email provider before launch." });
});

app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));
app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
