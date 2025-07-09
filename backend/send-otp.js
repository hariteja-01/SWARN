// Simple Express backend for sending SMS OTP using Twilio (free trial)
// 1. Get a free Twilio account: https://www.twilio.com/try-twilio
// 2. Get your Account SID, Auth Token, and a trial phone number
// 3. Set them in TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE
// 4. This code stores OTPs in memory (for demo). Use a DB for production.

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';
const TWILIO_PHONE = 'YOUR_TWILIO_PHONE_NUMBER';
const OTP_EXPIRY_MS = 5 * 60 * 1000;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const otps = {};

app.post('/api/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone required' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[phone] = { otp, expires: Date.now() + OTP_EXPIRY_MS };
  try {
    await client.messages.create({
      body: `Your SWARN OTP is: ${otp}`,
      from: TWILIO_PHONE,
      to: phone
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send SMS', error: err.message });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP required' });
  const record = otps[phone];
  if (!record) return res.status(400).json({ success: false, message: 'No OTP sent' });
  if (Date.now() > record.expires) return res.status(400).json({ success: false, message: 'OTP expired' });
  if (record.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });
  delete otps[phone];
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`OTP backend running on port ${PORT}`));
