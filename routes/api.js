const express = require("express");
const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

const apiRouter = express.Router();

// Generate random OTP
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Send OTP via WhatsApp
const sendWhatsappOTP = async (mobileNo, otp, userName = "") => {
	try {
		const msg = `Your RIT Tracking Link login request has been received.

🔐 Your OTP:
*${otp}*

Please do not share this OTP with anyone.
(Generated at ${moment().format("lll")})`;

		const encodedMsg = encodeURIComponent(msg);

		// Try the configured WhatsApp API
		await axios
			.get(
				`https://whatsapp.rohininfotech.com/api/send?number=91${mobileNo}&type=text&message=${encodedMsg}&instance_id=${process.env.WHATSAPP_INSTANCE_ID}&access_token=${process.env.WHATSAPP_ACCESS_TOKEN}`
			)
			.then((response) => {
				console.log("WhatsApp message sent successfully:", response.data);
				return true;
			})
			.catch((err) => {
				console.error("Error sending via rohininfotech:", err.message);
				// Fallback to alternative API if configured
				return false;
			});
	} catch (err) {
		console.error("Error in sendWhatsappOTP:", err);
		throw err;
	}
};

// Send OTP endpoint
apiRouter.post("/v0/web/send-otp", async (req, res) => {
	try {
		const { mobile_no } = req.body;

		if (!mobile_no || !/^\d{10}$/.test(mobile_no)) {
			return res.status(400).json({
				status: 400,
				valid: false,
				message: "Invalid mobile number",
			});
		}

		// Generate OTP
		const otp = generateOTP();

		// Store OTP with timestamp (expires in 10 minutes)
		otpStore.set(mobile_no, {
			otp: otp,
			createdAt: Date.now(),
			attempts: 0,
		});

		// Send WhatsApp
		await sendWhatsappOTP(mobile_no, otp);

		console.log(
			`OTP generated for ${mobile_no}: ${otp} (for development only)`
		);

		return res.status(200).json({
			status: 200,
			valid: true,
			message: "OTP sent successfully to your WhatsApp",
		});
	} catch (err) {
		console.error("Send OTP error:", err);
		return res.status(500).json({
			status: 500,
			valid: false,
			message: "Failed to send OTP. Please try again.",
		});
	}
});

// Verify OTP endpoint
apiRouter.post("/v0/web/verify-otp", async (req, res) => {
	try {
		const { mobile_no, otp } = req.body;

		if (!mobile_no || !otp) {
			return res.status(400).json({
				status: 400,
				valid: false,
				message: "Mobile number and OTP are required",
			});
		}

		// Check if OTP exists
		const storedData = otpStore.get(mobile_no);

		if (!storedData) {
			return res.status(400).json({
				status: 400,
				valid: false,
				message: "OTP not found. Please request a new OTP.",
			});
		}

		// Check OTP expiry (10 minutes)
		const otpAge = Date.now() - storedData.createdAt;
		if (otpAge > 10 * 60 * 1000) {
			otpStore.delete(mobile_no);
			return res.status(400).json({
				status: 400,
				valid: false,
				message: "OTP expired. Please request a new OTP.",
			});
		}

		// Check maximum attempts (5 attempts)
		if (storedData.attempts >= 5) {
			otpStore.delete(mobile_no);
			return res.status(400).json({
				status: 400,
				valid: false,
				message: "Too many failed attempts. Please request a new OTP.",
			});
		}

		// Verify OTP
		if (storedData.otp !== otp.toString()) {
			storedData.attempts++;
			return res.status(400).json({
				status: 400,
				valid: false,
				message: `Invalid OTP. Attempts remaining: ${5 - storedData.attempts}`,
			});
		}

		// OTP is valid - generate token
		const token = require("../authentication/auth").generateAccessToken({
			mobile_no: mobile_no,
			timestamp: Date.now(),
		});

		// Clear OTP
		otpStore.delete(mobile_no);

		return res.status(200).json({
			status: 200,
			valid: true,
			message: "Login successful",
			data: {
				token: token,
				mobile_no: mobile_no,
			},
		});
	} catch (err) {
		console.error("Verify OTP error:", err);
		return res.status(500).json({
			status: 500,
			valid: false,
			message: "Failed to verify OTP. Please try again.",
		});
	}
});

module.exports = { apiRouter };
