import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    return res.status(200).json({ success: true, message: "Received - we'll be in touch." });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Unable to send the inquiry right now." });
  }
}
