import React, { useState, useEffect } from "react";
import countryList from "./countryList.json";
import GoldCoinBackground from "./GoldCoinBackground";
import { supabase } from "../../supabaseClient";
import emailjs from "emailjs-com";
// Place your EmailJS credentials here
const EMAILJS_SERVICE_ID = "service_hohw2g7";
const EMAILJS_TEMPLATE_ID = "template_t6i5nuf";
const EMAILJS_PUBLIC_KEY = "wB3rRkJxjGVTCCFl2";


// ...existing code...


const securityQuestions = [
  "What is your mother’s maiden name?",
  "What was the name of your first pet?",
  "What was your first school?",
  "What is your favorite book?",
  "What is your favorite food?"
];


const Register = () => {
  // OTP state with expiration (must be inside the component)
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailOtpInput, setEmailOtpInput] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpTimestamp, setEmailOtpTimestamp] = useState(null); // ms since epoch
  const [emailOtpExpired, setEmailOtpExpired] = useState(false);

  // Send Email OTP
  const [otpMessage, setOtpMessage] = useState("");
  const [otpMessageType, setOtpMessageType] = useState(""); // "success" or "error"
  const handleSendEmailOtp = async () => {
    setEmailOtpVerified(false);
    setOtpMessage("");
    setOtpMessageType("");
    if (!form.email || errors.email) {
      setErrors(e => ({ ...e, email: "Enter a valid email before sending OTP." }));
      setOtpMessage("Enter a valid email before sending OTP.");
      setOtpMessageType("error");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setEmailOtp(otp);
    setEmailOtpTimestamp(Date.now());
    setEmailOtpExpired(false);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: form.firstName + (form.lastName ? ' ' + form.lastName : ''),
          otp,
          email: form.email // must match your template's {{email}}
        },
        EMAILJS_PUBLIC_KEY
      );
      setEmailOtpSent(true);
      setOtpMessage("OTP sent to your email successfully.");
      setOtpMessageType("success");
    } catch (err) {
      setOtpMessage("Failed to send OTP. Please try again.");
      setOtpMessageType("error");
      console.error("EmailJS error:", err);
    }
  };

  // Verify Email OTP (frontend only)
  const handleVerifyEmailOtp = () => {
    if (emailOtpInput === emailOtp && !emailOtpExpired) {
      setEmailOtpVerified(true);
    } else {
      setEmailOtpVerified(false);
    }
  };

  // OTP expiration effect (5 minutes = 300000 ms)
  useEffect(() => {
    let emailTimer;
    if (emailOtpSent && emailOtpTimestamp && !emailOtpExpired) {
      emailTimer = setTimeout(() => setEmailOtpExpired(true), 300000);
    }
    return () => {
      if (emailTimer) clearTimeout(emailTimer);
    };
  }, [emailOtpSent, emailOtpTimestamp, emailOtpExpired]);

  // --- FORM STATE ---
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States",
    username: "",
    password: "",
    confirm: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    securityQ: securityQuestions[0],
    securityA: "",
    terms: false,
    newsletter: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [apiError, setApiError] = useState("");

  // --- HELPERS ---
  useEffect(() => {
    // Generate simple captcha
    setCaptcha(Math.random().toString(36).substring(2, 8));
  }, []);

  // Password strength
  useEffect(() => {
    const val = form.password;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    // Only show strength if at least 6 chars entered
    if (val.length < 6) setPasswordStrength("");
    else setPasswordStrength(["Weak", "Weak", "Medium", "Strong", "Very Strong", "Excellent"][score]);
  }, [form.password]);

  // --- VALIDATION ---
  const validate = () => {
    const errs = {};
    if (!form.firstName.match(/^[A-Za-z]{2,50}$/)) errs.firstName = "First name must be 2-50 alphabetic characters.";
    if (!form.lastName.match(/^[A-Za-z]{2,50}$/)) errs.lastName = "Last name must be 2-50 alphabetic characters.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email address.";
    if (!form.phone.match(/^\+\d{1,3}\d{7,14}$/)) errs.phone = "Enter a valid international phone (e.g. +12345678901).";
    if (!form.country) errs.country = "Country is required.";
    if (!form.username.match(/^[A-Za-z0-9_]{6,20}$/)) errs.username = "Username must be 6-20 characters, letters, numbers, underscores.";
    if (!form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)) errs.password = "Password must be 8+ chars, upper, lower, number, special.";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match.";
    if (!form.dob) errs.dob = "Date of birth required.";
    else {
      const dob = new Date(form.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (age < 18) errs.dob = "You must be at least 18 years old.";
    }
    if (!form.address1) errs.address1 = "Address required.";
    if (form.address1.length > 100) errs.address1 = "Max 100 characters.";
    if (form.address2 && form.address2.length > 100) errs.address2 = "Max 100 characters.";
    if (!form.city.match(/^[A-Za-z ]{1,50}$/)) errs.city = "City required, max 50 alphabetic chars.";
    if (!form.state.match(/^[A-Za-z ]{1,50}$/)) errs.state = "State/Province required, max 50 alphabetic chars.";
    if (!form.zip) errs.zip = "Postal/ZIP required.";
    if (!form.securityA) errs.securityA = "Security answer required.";
    if (!form.terms) errs.terms = "You must agree to the terms.";
    if (!captchaInput || captchaInput !== captcha) errs.captcha = "Captcha incorrect.";
    // OTP expiration check
    if (!emailOtpVerified) {
      errs.emailOtp = emailOtpExpired ? "Email OTP expired. Please resend and verify." : "Email OTP not verified.";
    }
    return errs;
  };

  // --- HANDLERS ---
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors(e => ({ ...e, [name]: undefined }));
  };
  // Removed unused countryQuery, handleCountryInput, handleCountrySelect
  const handleSubmit = async () => {
    setApiError("");
    setSuccess("");
    setLoading(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setLoading(false);
      return;
    }
    // Register with Supabase only if OTPs are correct
    const { email, password, username } = form;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          country: form.country,
          dob: form.dob,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          state: form.state,
          zip: form.zip,
          securityQ: form.securityQ,
          securityA: form.securityA,
          newsletter: form.newsletter
        }
      }
    });
    if (error) {
      setApiError(error.message || "Registration failed. Try again.");
      setLoading(false);
      return;
    }
    setSuccess("Registration successful! Please check your email to verify your account.");
    setLoading(false);
  };

  // --- UI ---
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <GoldCoinBackground />
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center mb-8 mt-8">
          <span className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg tracking-widest mb-2 animate-bounce">SWARN</span>
          <span className="text-lg text-gray-300 font-medium animate-fadeIn">Create your secure account</span>
        </div>
        <form className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-3xl animate-fadeInUp" autoComplete="off" onSubmit={e => {e.preventDefault();handleSubmit();}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700">First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <div className="flex gap-2">
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
                <button type="button" className="px-2 py-1 rounded bg-yellow-200 text-yellow-800 font-semibold text-xs hover:bg-yellow-300" onClick={handleSendEmailOtp} disabled={emailOtpSent}>Send OTP</button>
              </div>
              {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              {otpMessage && (
                <div className={`text-xs mt-1 flex items-center gap-2 ${otpMessageType === "success" ? "text-green-600" : "text-red-500"}`}>
                  {otpMessage}
                  {emailOtpSent && !emailOtpExpired && emailOtpVerified && (
                    <span className="ml-2 text-green-600 font-bold">Verified</span>
                  )}
                </div>
              )}
              {emailOtpExpired && <div className="text-red-500 text-xs mt-1">OTP expired. <button type="button" className="underline text-blue-600" onClick={() => { setEmailOtpSent(false); setEmailOtp(""); setEmailOtpInput(""); setEmailOtpExpired(false); setEmailOtpVerified(false); setOtpMessage(""); setOtpMessageType(""); }}>Resend OTP</button></div>}
              <div className="flex gap-2 mt-2">
                <input name="emailOtpInput" value={emailOtpInput} onChange={e => { setEmailOtpInput(e.target.value); setEmailOtpVerified(false); }} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" placeholder="Enter email OTP" />
                {emailOtpSent && !emailOtpExpired && !emailOtpVerified && (
                  <button type="button" className="px-2 py-1 rounded bg-blue-200 text-blue-800 font-semibold text-xs hover:bg-blue-300" onClick={handleVerifyEmailOtp} disabled={!emailOtpInput}>Verify OTP</button>
                )}
              </div>
              {errors.emailOtp && <div className="text-red-500 text-xs mt-1">{errors.emailOtp}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+12345678901" className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400 bg-white"
              >
                <option value="">Select country...</option>
                {countryList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.country && <div className="text-red-500 text-xs mt-1">{errors.country}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Username</label>
              <input name="username" value={form.username} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.username && <div className="text-red-500 text-xs mt-1">{errors.username}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400 pr-10" autoComplete="new-password" />
                <button type="button" className="absolute right-2 top-2 text-xs text-gray-500" onClick={() => setShowPassword(v => !v)}>{showPassword ? "Hide" : "Show"}</button>
              </div>
              {passwordStrength && (
                <div className="text-xs mt-1">Strength: <span className={passwordStrength === "Strong" || passwordStrength === "Very Strong" || passwordStrength === "Excellent" ? "text-green-600" : passwordStrength === "Medium" ? "text-yellow-600" : "text-red-600"}>{passwordStrength}</span></div>
              )}
              {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
              <div className="text-xs text-gray-500 mt-1">Min 8 chars, upper, lower, number, special char</div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <input name="confirm" type={showConfirm ? "text" : "password"} value={form.confirm} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400 pr-10" />
                <button type="button" className="absolute right-2 top-2 text-xs text-gray-500" onClick={() => setShowConfirm(v => !v)}>{showConfirm ? "Hide" : "Show"}</button>
              </div>
              {errors.confirm && <div className="text-red-500 text-xs mt-1">{errors.confirm}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Date of Birth</label>
              <input name="dob" type="date" value={form.dob} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.dob && <div className="text-red-500 text-xs mt-1">{errors.dob}</div>}
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700">Address Line 1</label>
              <input name="address1" value={form.address1} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.address1 && <div className="text-red-500 text-xs mt-1">{errors.address1}</div>}
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700">Address Line 2 <span className="text-xs text-gray-400">(optional)</span></label>
              <input name="address2" value={form.address2} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.address2 && <div className="text-red-500 text-xs mt-1">{errors.address2}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">State/Province</label>
              <input name="state" value={form.state} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.state && <div className="text-red-500 text-xs mt-1">{errors.state}</div>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Postal/ZIP Code</label>
              <input name="zip" value={form.zip} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" />
              {errors.zip && <div className="text-red-500 text-xs mt-1">{errors.zip}</div>}
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700">Security Question</label>
              <select name="securityQ" value={form.securityQ} onChange={handleChange} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400">
                {securityQuestions.map(q => <option key={q}>{q}</option>)}
              </select>
              <input name="securityA" value={form.securityA} onChange={handleChange} placeholder="Your answer" className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400 mt-2" />
              {errors.securityA && <div className="text-red-500 text-xs mt-1">{errors.securityA}</div>}
            </div>
            <div className="md:col-span-2 flex flex-col gap-2 mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
                <span>I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a></span>
              </label>
              {errors.terms && <div className="text-red-500 text-xs mt-1">{errors.terms}</div>}
            </div>
            <div className="md:col-span-2 mt-2">
              <label className="block font-semibold text-gray-700">Captcha</label>
              <div className="flex items-center gap-2">
                <span className="bg-gray-200 px-3 py-1 rounded font-mono tracking-widest text-lg select-none">{captcha}</span>
                <button
                  type="button"
                  aria-label="Refresh captcha"
                  className="ml-1 p-1 rounded hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onClick={() => {
                    setCaptcha(Math.random().toString(36).substring(2, 8));
                    setCaptchaInput("");
                  }}
                  tabIndex={0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M19.418 15A7.974 7.974 0 0012 8c-1.657 0-3.182.506-4.418 1.372M4.582 9A7.974 7.974 0 0112 16c1.657 0 3.182-.506 4.418-1.372" />
                  </svg>
                </button>
                <input name="captchaInput" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400" placeholder="Enter captcha" />
              </div>
              {errors.captcha && <div className="text-red-500 text-xs mt-1">{errors.captcha}</div>}
            </div>
          </div>
          {apiError && <div className="text-red-600 text-center mt-4">{apiError}</div>}
          {success && <div className="text-green-600 text-center mt-4 font-semibold text-lg">{success}</div>}
          <button
            className={`mt-8 w-full py-3 rounded bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-gray-900 font-bold text-lg shadow-xl hover:scale-105 hover:from-yellow-300 hover:to-yellow-400 transition-all flex items-center justify-center ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? <span className="loader mr-2" /> : null}
            Register
          </button>
          <div className="text-center text-gray-500 mt-6">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Back to Login</a>
          </div>
        </form>
        <footer className="mt-8 text-center text-xs text-gray-400">
          <a href="/privacy" className="hover:underline">Privacy Policy</a> | <a href="/terms" className="hover:underline">Terms of Service</a>
        </footer>
      </div>
    </div>
  );
};



export default Register;
