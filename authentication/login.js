const express = require("express");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const moment = require("moment");
const axios = require("axios");

const auth = express.Router();

require("dotenv").config();

const { config } = require("../config/config");
const { generateAccessToken, authenticateToken } = require("./auth");
const { generateAccessTokenApp } = require("../middleware/appAuthorize");

// auth.post("/usp_RIT_LoginWithOTP", async (req, res) => {
// 	try {
// 		const { user_id, mobile, otp } = req.body;

// 		await sql
// 			.connect(config)
// 			.then((pool) => {
//                 console.log("REQUEST DATA:", req.body);
//  				return pool
// 					.request()
// 					.input("Mobile", mobile)
// 					.input("OTP", otp)
// 					.input("UserID", 20)
// 					.execute("usp_RIT_LoginWithOTP");
// 			})
// 			.then((result) => {
// 				console.log("OTP SENT TO DATABASE:", otp);
// 				console.log('LOGIN 🏬🏬 ', result);
// 				if (result.recordset.length > 0) {
// 					const token = generateAccessToken({
// 						user: result.recordset[0],
// 					});					
// 					res.status(200).json({
// 						status: 200,
// 						valid: true,
// 						token: token,
// 					});
// 				} else {
// 					res.status(200).json({
// 						status: 400,
// 						message: "This Mobile No. Does Not Exist",
// 					});
// 				}
// 			})
// 			.catch((err) => {
// 				console.log("err",err);
// 				res.status(500).json({
// 					status: 500,
// 					message: err,
// 				});
// 			});
// 	} catch (err) {
// 		res.status(500).json({
// 			status: 500,
// 			message: err,
// 		});
// 	}
// });

auth.post("/usp_RIT_Login", async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({
                status: 400,
                valid: false,
                message: "Mobile number is required",
            });
        }

        await sql
            .connect(config)
            .then((pool) => {
                console.log("REQUESTING OTP FOR:", mobile);
                return pool
                    .request()
                    .input("Mobile", sql.NVarChar(15), mobile) 
                    .execute("usp_RIT_Login");
            })
            .then((result) => {
                if (result.recordset.length > 0) {
                    const userData = result.recordset[0];
                    
                    console.log("OTP GENERATED ✅:", userData.OTP);

                    res.status(200).json({
                        status: 200,
                        valid: true,
                        message: "OTP generated successfully",
                        data: {
                            user_id: userData.UserID,
                            name: userData.Name,
                            mobile: userData.Mobile,
                            otp: userData.OTP 
                        },
                    });
                } else {
                    res.status(200).json({
                        status: 400,
                        valid: false,
                        message: "Mobile number not found or inactive",
                    });
                }
            })
            .catch((err) => {
                console.log("SQL ERROR ❌:", err.message);
                res.status(200).json({
                    status: 400,
                    valid: false,
                    message: err.message || "Invalid mobile number.",
                });
            });
    } catch (err) {
        console.error("SERVER ERROR:", err);
        res.status(500).json({
            status: 500,
            valid: false,
            message: "Internal Server Error",
        });
    }
});
auth.post("/checkotp", async (req, res) => {
	try {
		const { otp, user_name } = req.body;

		if (!user_name) {
			res.status(400).json({
				status: 400,
				message: "Mobile number is required",
			});
		}
		if (!otp) {
			res.status(400).json({
				status: 400,
				message: "OTP is required",
			});
		}
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("mobile_email", user_name)
					.input("otp", otp)
					.execute("check_otp");
			})
			.then((result) => {
				if (result.recordset.length > 0) {
					const token = generateAccessToken({
						user: result.recordset[0],
					});
					res.status(200).json({
						status: 200,
						token: token,
						valid: true,
					});
				} else {
					res.status(200).json({
						status: 400,
						message: "Invalid OTP",
					});
				}
			})
			.catch((err) => {
				res.status(500).json({
					status: 500,
					message: err,
				});
			});
	} catch (err) {
		res.status(500).json({
			status: 500,
			message: err,
		});
	}
});

function sendEmail(otp, subject, mailto) {
	var msg = `Your Brij ERP login verification OTP code is ${otp} (valid for 10 minutes) Please do not share OTP with anyone.(Generated at ${moment().format(
		"lll"
	)}`;
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.CLIENT_APP_ID,
			pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
		},
	});
	var mailOptions = {
		from: process.env.CLIENT_APP_ID,
		to: mailto,
		subject: subject,
		html: msg,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("error");
		}
	});
}
const sendWhatsapp = async (otp, mobile, full_name) => {
	var msg = ` Your Brij ERP login verification OTP code is ${otp} (valid for 10 minutes) Please do not share OTP with anyone.(Generated at ${moment().format(
		"lll"
	)}`;
	token = process.env.TOKEN || 2334;
	try {
		await axios
			.get(
				// `https://smppking.com/api/send?number=91${mobile}&type=text&message=${msg}&instance_id=64CCC06A56D7C&access_token=64ccb08dbbdb7`
				`https://commonapi.quickgst.in/whatsapp/otp?user_name=${full_name}&company_name=brijCom&mobile_no=91${mobile}&otp=${otp}`
			)
			.then((response) => {
				return response;
			})
			.catch((err) => {});
	} catch (err) {}
};

module.exports = {
	auth,
};

//App login of Brij

auth.post("/App_login", async (req, res) => {
	try {
		const { user_name } = req.body;
		// if (!user_name) {
		//   res.status(400).json({
		//     status: 400,
		//     message: "Mobile number is required",
		//   });
		// }

		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("mobile_email", user_name)
					.execute("app_check_login");
			})
			.then((result) => {
				if (result.recordset.length > 0) {
					sendEmail(
						result.recordset[0].otp,
						"Brij App Login Otp",
						result.recordset[0].email
					);
					sendWhatsapp(
						result.recordset[0].otp,
						result.recordset[0].mobile,
						result.recordset[0].full_name
					);
					res.status(200).json({
						status: 200,
						valid: true,
					});
				} else {
					res.status(200).json({
						status: 400,
						message: "This mobile no. or email is not exist",
					});
				}
			})
			.catch((err) => {
				res.status(500).json({
					status: 500,
					message: err,
				});
			});
	} catch (err) {
		res.status(500).json({
			status: 500,
			message: err,
		});
	}
});

// auth.post("/checkotp_app", async (req, res) => {
// 	try {
// 		const { otp, user_name } = req.body;

// 		if (!user_name) {
// 			res.status(400).json({
// 				status: 400,
// 				message: "Mobile number is required",
// 			});
// 		}
// 		if (!otp) {
// 			res.status(400).json({
// 				status: 400,
// 				message: "OTP is required",
// 			});
// 		}
// 		await sql
// 			.connect(config)
// 			.then((pool) => {
// 				return pool
// 					.request()
// 					.input("mobile_email", user_name)
// 					.input("otp", otp)
// 					.execute("app_check_otp");
// 			})
// 			.then((result) => {
// 				if (result.recordset.length > 0) {
// 					const token = generateAccessTokenApp({
// 						user: result.recordset[0],
// 					});
// 					res.status(200).json({
// 						status: 200,
// 						token: token,
// 						valid: true,
// 					});
// 				} else {
// 					res.status(200).json({
// 						status: 400,
// 						message: "Invalid OTP",
// 					});
// 				}
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					status: 500,
// 					message: err,
// 				});
// 			});
// 	} catch (err) {
// 		res.status(500).json({
// 			status: 500,
// 			message: err,
// 		});
// 	}
// });

auth.post("/checkotp_app", async (req, res) => {
	try {
		const { user_id, mobile, otp } = req.body;

		await sql
			.connect(config)
			.then((pool) => {
                console.log("REQUEST DATA:", req.body);
 				return pool
					.request()
					.input("Mobile", mobile)
					.input("OTP", otp)
					.input("UserID", 20)
					.execute("checkotp_app");
			})
			.then((result) => {
				console.log("OTP SENT TO DATABASE:", otp);
				console.log('LOGIN 🏬🏬 ', result);
				if (result.recordset.length > 0) {
					const token = generateAccessToken({
						user: result.recordset[0],
					});					
					res.status(200).json({
						status: 200,
						valid: true,
						token: token,
					});
				} else {
					res.status(200).json({
						status: 400,
						message: "This Mobile No. Does Not Exist",
					});
				}
			})
			.catch((err) => {
				console.log("err",err);
				res.status(500).json({
					status: 500,
					message: err,
				});
			});
	} catch (err) {
		res.status(500).json({
			status: 500,
			message: err,
		});
	}
});