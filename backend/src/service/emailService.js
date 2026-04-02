const nodemailer = require("nodemailer");

function toBool(value, defaultValue = false) {
   if (value === undefined || value === null) {
      return defaultValue;
   }

   const normalized = String(value).trim().toLowerCase();
   return normalized === "1" || normalized === "true" || normalized === "yes";
}

function isEmailEnabled() {
   return toBool(process.env.EMAIL_ENABLED, false);
}

function createTransport() {
   const host = process.env.SMTP_HOST;
   const port = Number(process.env.SMTP_PORT || 587);
   const secure = toBool(process.env.SMTP_SECURE, port === 465);
   const user = process.env.SMTP_USER;
   const pass = process.env.SMTP_PASS;

   if (!host || !user || !pass) {
      return null;
   }

   return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
   });
}

function getFromAddress() {
   const fromName = process.env.SMTP_FROM_NAME || "XastGE Resource Center";
   const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
   return `"${fromName}" <${fromEmail}>`;
}

async function sendMail({ to, subject, text, html }) {
   if (!isEmailEnabled()) {
      return { sent: false, skipped: true, reason: "EMAIL_ENABLED is false" };
   }

   const transport = createTransport();
   if (!transport) {
      return { sent: false, skipped: true, reason: "SMTP config is incomplete" };
   }

   await transport.sendMail({
      from: getFromAddress(),
      to,
      subject,
      text,
      html,
   });

   return { sent: true, skipped: false };
}

async function sendVerificationEmail(email, url) {
   const subject = "Confirm your email";
   const text = [
      "Welcome to XastGE Resource Center",
      "",
      "Please confirm your email by opening this link:",
      url,
   ].join("\n");

   const html = [
      "<p>Welcome to <strong>XastGE Resource Center</strong></p>",
      "<p>Please confirm your email by opening this link:</p>",
      `<p><a href=\"${url}\">${url}</a></p>`,
   ].join("");

   return sendMail({ to: email, subject, text, html });
}

async function sendAssetReportEmail({ asset, reporter, reason, message }) {
   const adminEmail = process.env.REPORT_ADMIN_EMAIL || process.env.SMTP_USER;
   if (!adminEmail) {
      return { sent: false, skipped: true, reason: "REPORT_ADMIN_EMAIL is not set" };
   }

   const subject = `[Asset Report] ${asset.assetType || "Unknown"} - ${String(asset._id)}`;
   const text = [
      "A new asset report was submitted",
      "",
      `Asset ID: ${asset._id}`,
      `Owner ID: ${asset.ownerId}`,
      `Asset type: ${asset.assetType || "Unknown"}`,
      `Asset URL: ${asset.fileUrl || "n/a"}`,
      `Reporter ID: ${reporter._id}`,
      `Reporter username: ${reporter.username}`,
      `Reporter email: ${reporter.email}`,
      `Reason: ${reason}`,
      `Message: ${message || "(empty)"}`,
   ].join("\n");

   const html = [
      "<p>A new asset report was submitted</p>",
      "<ul>",
      `<li><strong>Asset ID:</strong> ${asset._id}</li>`,
      `<li><strong>Owner ID:</strong> ${asset.ownerId}</li>`,
      `<li><strong>Asset type:</strong> ${asset.assetType || "Unknown"}</li>`,
      `<li><strong>Asset URL:</strong> ${asset.fileUrl || "n/a"}</li>`,
      `<li><strong>Reporter ID:</strong> ${reporter._id}</li>`,
      `<li><strong>Reporter username:</strong> ${reporter.username}</li>`,
      `<li><strong>Reporter email:</strong> ${reporter.email}</li>`,
      `<li><strong>Reason:</strong> ${reason}</li>`,
      `<li><strong>Message:</strong> ${message || "(empty)"}</li>`,
      "</ul>",
   ].join("");

   return sendMail({ to: adminEmail, subject, text, html });
}

module.exports = {
   isEmailEnabled,
   sendMail,
   sendVerificationEmail,
   sendAssetReportEmail,
};