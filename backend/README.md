# SWARN OTP Backend

This backend provides real SMS OTP for your registration form using Twilio (free trial available).

## How to use

1. **Get a free Twilio account:**
   - Go to https://www.twilio.com/try-twilio and sign up.
   - Verify your email and phone, get your Account SID, Auth Token, and a trial phone number.
   - You can send SMS to verified numbers for free.

2. **Set your credentials:**
   - In `send-otp.js`, replace these lines with your real values:
     ```js
     const TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID';
     const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';
     const TWILIO_PHONE = 'YOUR_TWILIO_PHONE_NUMBER';
     ```

3. **Install dependencies:**
   - In the `backend` folder, run:
     ```sh
     npm install express body-parser twilio cors
     ```

4. **Run the backend:**
   - In the `backend` folder, run:
     ```sh
     node send-otp.js
     ```
   - The server will run on port 5000 by default.

5. **Connect your frontend:**
   - Change your frontend fetch URLs from `/api/send-otp` to `http://localhost:5000/api/send-otp` and `/api/verify-otp` to `http://localhost:5000/api/verify-otp`.
   - Make sure CORS is enabled (already set in the code).

## Notes
- This backend stores OTPs in memory (for demo/testing). For production, use a database.
- Twilio free trial only allows sending SMS to verified numbers. For full use, upgrade your Twilio account.
- Never expose your Twilio credentials in public repos.

## Free alternatives
- Twilio is the most reliable free option for SMS OTP (with trial limitations).
- Other options: [Vonage](https://www.vonage.com/communications-apis/sms/), [MessageBird](https://www.messagebird.com/en/sms/), but most require a card for free trial.

---

If you need help with setup, let me know!
