const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const nodemailer = require("nodemailer");
const moment = require("moment");

const html_to_pdf = require("html-pdf-node");

const fs = require("fs");
const path = require("path");

// notify srf for 48 hours
exports.NotifyDelivery = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return (
					pool
						.request()
						// .input("mtran_id", req.body.mtran_id)
						.execute("notify_delivery_date_srf")
				);
			})
			.then((result) => {
				res.send({
					status: 200,
					valid: true,
					data: result.recordset,
				});
			})
			.catch((err) => {
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: error,
		});
	}
});

// notify js for 48 hours
exports.NotifyDeliveryJS = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return (
					pool
						.request()
						// .input("mtran_id", req.body.mtran_id)
						.execute("notify_pi_date_order_date_jobsheet")
				);
			})
			.then((result) => {
				res.send({
					status: 200,
					valid: true,
					data: result.recordset,
				});
			})
			.catch((err) => {
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: error,
		});
	}
});

// insert email log in srf
exports.INSERTemailLog = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.input("srf_no", req.body.srf_no)
					.input("customer_id", req.body.customer_id)
					.input("srf_date", req.body.srf_date)
					.input("delivery_date", req.body.delivery_date)
					.input("to_email", req.body.to_email)
					.input("cc_email", req.body.cc_email)
					.input("user_id", req.user.user_id)
					.input("notify_type", req.body.notify_type)
					.execute("insert_email_log_notify_delivery_date_srf");
			})
			.then((result) => {
				sendNotifySRFEmail(
					req.body,
					req.body.customer_name,
					req.user,
					req.body.srf_data
				);
				res.send({
					status: 200,
					valid: true,
					data: result.recordset,
				});
			})
			.catch((err) => {
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: error,
		});
	}
});

// function sendNotifySRFEmail(data, subject, sender) {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.CLIENT_APP_ID,
//       pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
//     },
//   });
//   var mailOptions = {
//     from: process.env.CLIENT_APP_ID,
//     to: data.to_email,
//     cc: data.cc_email,
//     subject: `Request for Acknowledgment on Delivery Date Confirmation-[${subject}]-SRF No.(${data.srf_no})`,
//     html: `<div style="font-family: sans-serif">
//       <table
//         style="
//           max-width: 700px;
//           margin: 20px auto 10px;
//           border: solid 1px #ddd;
//           background-color: #fff;
//           border-top: solid 5px #da222b;
//           box-shadow: 0 -7px 0 #000;
//           font-size: 14px;
//           min-width: 600px;
//         "
//       >
//         <tbody>
//           <tr>
//             <td>
//               <table style="width: 100%">
//                 <tr style="vertical-align: top">
//                   <td style="width: 50%; padding: 15px 15px 0">
//                     <p style="margin: 0">
//                       <img
//                         src="https://adminapi.brij.in/uploads/brij.png"
//                         alt="Brij"
//                         style="height: 65px"
//                       />
//                     </p>
//                   </td>
//                   <td style="width: 50%; text-align: right; padding: 15px">
//                     <img
//                       src="https://myerp.brij.in/assets/Brij_logo-DBus5JMP.png"
//                       alt="Brij"
//                       style="
//                         height: 65px;
//                         max-width: 120px;
//                         object-fit: contain;
//                       "
//                     />
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>
//           <tr>
//             <td style="padding: 0 15px">
//               <p>Dear Team,</p>
//               <p style="margin: 0; line-height: 1.5">
//                 This is to inform you that the following SRF has been prepared
//                 and shared with the production team for further processing.
//                 Kindly review the details mentioned and acknowledge the delivery
//                 date confirmation at the earliest.
//               </p>
//               <table style="width: 100%">
//                 <p
//                   style="
//                     text-align: center;
//                     margin-bottom: 20px;
//                     margin-top: 30px;
//                   "
//                 >
//                   <strong>SRF details:</strong>
//                 </p>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; SRF Number: <strong>${data.srf_no}</strong>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; Customer Name:
//                     <strong>${data.customer_name}</strong>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; Product: <strong>${data.product_usage}</strong>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; Qty: <strong>${data.total_qty}</strong>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; Delivery Due Date:
//                     <strong
//                       >${moment(data.delivery_date).format(
//       "DD/MM/YYYY"
//     )}</strong
//                     >
//                   </td>
//                 </tr>
//               </table>
//               <p>
//                 Kindly acknowledge the mentioned delivery date is feasible or
//                 highlight any constraints, so necessary actions can be taken in
//                 time.
//               </p>
//               <p>Thanks</p>
//             </td>
//           </tr>
//           <tr>
//             <td
//               style="
//                 background-color: #000;
//                 color: #fff;
//                 padding: 10px;
//                 margin-top: 20px;
//                 font-size: 11px;
//               "
//             >
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log("error");
//     }
//   });
// }
async function sendNotifySRFEmail(data, subject, sender, content) {
	const attachmentContent = content;
	const pdfBuffer = await generateSrfPDF(attachmentContent);
	// fs.writeFileSync(pdfPath, pdfBuffer);
	let attachmentBuffer;
	if (Buffer.isBuffer(pdfBuffer)) {
		attachmentBuffer = pdfBuffer;
	} else if (pdfBuffer instanceof Uint8Array) {
		attachmentBuffer = Buffer.from(pdfBuffer);
	} else {
		throw new Error("Invalid PDF buffer format");
	}
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.CLIENT_APP_ID,
			pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.CLIENT_APP_ID,
		to: data.to_email,
		cc: data.cc_email,
		subject: `Request for Acknowledgment on Delivery Date Confirmation-[${subject}]-SRF No.(${data.srf_no})`,
		html: `<div style="font-family: sans-serif">
      <table
        style="
          max-width: 700px;
          margin: 20px auto 10px;
          border: solid 1px #ddd;
          background-color: #fff;
          border-top: solid 5px #da222b;
          box-shadow: 0 -7px 0 #000;
          font-size: 14px;
          min-width: 600px;
        "
      >
        <tbody>
          <tr>
            <td>
              <table style="width: 100%">
                <tr style="vertical-align: top">
                  <td style="width: 50%; padding: 15px 15px 0">
                    <p style="margin: 0">
                      <img
                        src="https://adminapi.brij.in/uploads/brij.png"
                        alt="Brij"
                        style="height: 65px"
                      />
                    </p>
                  </td>
                  <td style="width: 50%; text-align: right; padding: 15px">
                    <img
                      src="https://myerp.brij.in/assets/Brij_logo-DBus5JMP.png"
                      alt="Brij"
                      style="height: 65px; max-width: 120px; object-fit: contain;"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 15px">
              <p>Dear Team,</p>
              <p style="margin: 0; line-height: 1.5">
                This is to inform you that the following SRF has been prepared
                and shared with the production team for further processing.
                Kindly review the details mentioned and acknowledge the delivery
                date confirmation at the earliest.
              </p>

              <table style="width: 100%;">
                <p style="text-align: center; margin-bottom: 20px; margin-top: 30px;">
                  <strong>SRF details:</strong>
                </p>
                <tr>
                  <td class="label-cell">&#8226; SRF Number: <strong>${
										data.srf_no
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Customer Name: <strong>${
										data.customer_name
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Product: <strong>${
										data.product_usage
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Qty: <strong>${
										data.total_qty
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Delivery Due Date: 
                    <strong>${moment(data.delivery_date).format(
											"DD/MM/YYYY"
										)}</strong>
                  </td>
                </tr>
              </table>

              <p>
                Kindly 
                <a 
                  href="mailto:${data.to_email}?cc=${encodeURIComponent(
			data.cc_email
		)}&subject=${encodeURIComponent(
			`Acknowledgment for SRF ${data.srf_no}`
		)}&body=${encodeURIComponent(
			`I acknowledge the delivery date for SRF ${data.srf_no}.`
		)}"
                  style="color: #da222b; text-decoration: underline;"
                  target="_blank"
                >
                  acknowledge
                </a>
                the mentioned delivery date is feasible or highlight any constraints, so necessary actions can be taken in time.
              </p>

              <p>Thanks</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
		attachments: [
			{
				filename: "SRF.pdf",
				content: attachmentBuffer,
				contentType: "application/pdf",
				encoding: "binary",
			},
		],
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.error("Email sending error:", error);
		} else {
			console.log("Email sent:", info.response);
		}
	});
}

//insert js log in js
exports.INSERTemailLogJS = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.input("jobsheet_no", req.body.jobsheet_no)
					.input("customer_id", req.body.customer_id)
					.input("jobsheet_date", req.body.jobsheet_date)
					.input("order_date", req.body.order_date)
					.input("to_email", req.body.to_email)
					.input("cc_email", req.body.cc_email)
					.input("user_id", req.user.user_id)
					.input("notify_type", req.body.notify_type)
					.execute("insert_email_log_notify_pi_order_date_jobsheet");
			})
			.then((result) => {
				sendNotifyJobsheetEmail(
					req.body,
					req.body.customer_name,
					req.user,
					req.body.jobsheet_data
				);
				res.send({
					status: 200,
					valid: true,
					data: result.recordset,
				});
			})
			.catch((err) => {
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: error,
		});
	}
});

// function sendNotifyJobsheetEmail(data, subject, sender) {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.CLIENT_APP_ID,
//       pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
//     },
//   });
//   var mailOptions = {
//     from: process.env.CLIENT_APP_ID,
//     to: data.to_email,
//     cc: data.cc_email,
//     subject: `Request for Acknowledgment on Delivery Date Confirmation-[${subject}]Jobsheet No.(${data.jobsheet_no})`,
//     html: ` <div style="font-family: sans-serif">
//       <table
//         style="
//           max-width: 700px;
//           margin: 20px auto 10px;
//           border: solid 1px #ddd;
//           background-color: #fff;
//           border-top: solid 5px #da222b;
//           box-shadow: 0 -7px 0 #000;
//           font-size: 14px;
//           min-width: 600px;
//         "
//       >
//         <tbody>
//           <tr>
//             <td>
//               <table style="width: 100%">
//                 <tr style="vertical-align: top">
//                   <td style="width: 50%; padding: 15px 15px 0">
//                     <p style="margin: 0">
//                       <img
//                         src="https://adminapi.brij.in/uploads/brij.png"
//                         alt="Brij"
//                         style="height: 65px"
//                       />
//                     </p>
//                   </td>
//                   <td style="width: 50%; text-align: right; padding: 15px">
//                     <img
//                       src="https://myerp.brij.in/assets/Brij_logo-DBus5JMP.png"
//                       alt="Brij"
//                       style="
//                         height: 65px;
//                         max-width: 120px;
//                         object-fit: contain;
//                       "
//                     />
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>
//           <tr>
//             <td style="padding: 0 15px">
//               <p>Dear Team,</p>
//               <p style="margin: 0; line-height: 1.5">
//                 This is to inform you that the following Job Sheet has been
//                 prepared and shared with the production team for further
//                 processing. Kindly review the details mentioned and acknowledge
//                 the delivery date confirmation at the earliest.
//               </p>
//               <table style="width: 100%;">
//                 <p
//                   style="
//                     text-align: center;
//                     margin-bottom: 20px;
//                     margin-top: 30px;
//                   "
//                 >
//                   <strong>Job Sheet details:</strong>
//                 </p>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; JS Number: <strong>${data.jobsheet_no}</strong>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; Customer Name:
//                     <strong>${data.customer_name}</strong>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; Product: <strong>${data.product_usage}</strong>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">&#8226; Qty: <strong>${data.total_qty
//       }</strong></td>
//                 </tr>
//                 <tr>
//                   <td class="label-cell">
//                     &#8226; Delivery Due Date:
//                     <strong>${moment(data.final_delivery_date).format(
//         "DD/MM/YYYY"
//       )}</strong>
//                   </td>
//                 </tr>
//               </table>
//               <p>
//                 Kindly acknowledge the mentioned delivery date is feasible or
//                 highlight any constraints, so necessary actions can be taken in
//                 time.
//               </p>
//               <p>Thanks</p>
//             </td>
//           </tr>
//           <tr>
//             <td
//               style="
//                 background-color: #000;
//                 color: #fff;
//                 padding: 10px;
//                 margin-top: 20px;
//                 font-size: 11px;
//               "
//             >
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log("error");
//     }
//   });
// }

// Function to convert HTML to PDF
async function generateJobsheetPDF(htmlContent) {
	try {
		const options = {
			format: "A4",
			orientation: "landscape", // Equivalent to landscape: true
			printBackground: true,
			landscape: true,
			margin: {
				top: "0.5cm",
				right: "0.5cm",
				bottom: "0.5cm",
				left: "0.5cm",
			},
			timeout: 30000,
			landscape: true,
		};

		const file = { content: htmlContent };

		// Generate PDF buffer
		const pdfBuffer = await html_to_pdf.generatePdf(file, options);

		return pdfBuffer;
	} catch (error) {
		console.error("Error generating PDF:", error);
		throw error;
	}
}

async function generateSrfPDF(htmlContent) {
	try {
		const options = {
			format: "A4",
			orientation: "landscape", // Equivalent to landscape: true
			printBackground: true,
			landscape: true,
			margin: {
				top: "0.5cm",
				right: "0.5cm",
				bottom: "0.5cm",
				left: "0.5cm",
			},
			timeout: 30000,
		};

		const file = { content: htmlContent };

		// Generate PDF buffer
		const pdfBuffer = await html_to_pdf.generatePdf(file, options);

		return pdfBuffer;
	} catch (error) {
		console.error("Error generating PDF:", error);
		throw error;
	}
}

async function sendEmailWithAttachment(pdfPath, toEmail) {
	// Configure transporter (use your SMTP details)
	const transporter = nodemailer.createTransport({
		service: "gmail",
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.CLIENT_APP_ID,
			pass:  rocess.env.GMAIL_CLIENT_APP_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.CLIENT_APP_ID,
		to: toEmail,
		subject: "HTML Content as PDF",
		text: "Please find the attached PDF.",
		attachments: [
			{
				filename: "document.pdf",
				path: pdfPath,
			},
		],
	};

	await transporter.sendMail(mailOptions);
}

async function sendNotifyJobsheetEmail(data, subject, sender, content) {
	const attachmentContent = content;
	const pdfBuffer = await generateJobsheetPDF(attachmentContent);
	// fs.writeFileSync(pdfPath, pdfBuffer);
	let attachmentBuffer;
	if (Buffer.isBuffer(pdfBuffer)) {
		attachmentBuffer = pdfBuffer;
	} else if (pdfBuffer instanceof Uint8Array) {
		attachmentBuffer = Buffer.from(pdfBuffer);
	} else {
		throw new Error("Invalid PDF buffer format");
	}
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.CLIENT_APP_ID,
			pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.CLIENT_APP_ID,
		to: data.to_email,
		cc: data.cc_email,
		subject: `Request for Acknowledgment on Delivery Date Confirmation-[${subject}] - Jobsheet No.(${data.jobsheet_no})`,
		html: ` 
    <div style="font-family: sans-serif">
      <table
        style="
          max-width: 700px;
          margin: 20px auto 10px;
          border: solid 1px #ddd;
          background-color: #fff;
          border-top: solid 5px #da222b;
          box-shadow: 0 -7px 0 #000;
          font-size: 14px;
          min-width: 600px;
		   border-bottom: solid 10px #000;
        "
      >
        <tbody>
          <tr>
            <td>
              <table style="width: 100%">
                <tr style="vertical-align: top">
                  <td style="width: 50%; padding: 15px 15px 0">
                    <p style="margin: 0">
                      <img
                        src="https://adminapi.brij.in/uploads/brij.png"
                        alt="Brij"
                        style="height: 65px"
                      />
                    </p>
                  </td>
                  <td style="width: 50%; text-align: right; padding: 15px">
                    <img
                      src="https://myerp.brij.in/assets/Brij_logo-DBus5JMP.png"
                      alt="Brij"
                      style="height: 65px; max-width: 120px; object-fit: contain;"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 15px">
              <p>Dear Team,</p>
              <p style="margin: 0; line-height: 1.5">
                This is to inform you that the following Job Sheet has been
                prepared and shared with the production team for further
                processing. Kindly review the details mentioned and acknowledge
                the delivery date confirmation at the earliest.
              </p>
              <table style="width: 100%;">
                <p style="text-align: center; margin-bottom: 20px; margin-top: 30px;">
                  <strong>Job Sheet details:</strong>
                </p>
                <tr>
                  <td class="label-cell">&#8226; JS Number: <strong>${
										data.jobsheet_no
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Customer Name: <strong>${
										data.customer_name
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Product: <strong>${
										data.product_usage
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Qty: <strong>${
										data.total_qty
									}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">&#8226; Delivery Due Date: 
                    <strong>${moment(data.final_delivery_date).format(
											"DD/MM/YYYY"
										)}</strong>
                  </td>
                </tr>
              </table>

             <p>
                Kindly 
                <a 
                  href="mailto:${data.to_email}?cc=${encodeURIComponent(
			data.cc_email
		)}&subject=${encodeURIComponent(
			`Acknowledgment for Jobsheet ${data.jobsheet_no}`
		)}&body=${encodeURIComponent(
			`I acknowledge the delivery date for Jobsheet ${data.jobsheet_no}.`
		)}"
                  style="color: #da222b; text-decoration: underline;"
                  target="_blank"
                >
                  acknowledge
                </a>
                the mentioned delivery date is feasible or highlight any constraints, so necessary actions can be taken in time.
              </p>
              <p>Thanks</p>
            </td>
          </tr>        
        </tbody>
      </table>
    </div>`,
		attachments: [
			{
				filename: "Jobsheet.pdf",
				content: attachmentBuffer,
				contentType: "application/pdf",
				encoding: "binary",
			},
		],
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("Email sending error:", error);
		} else {
			console.log("Email sent:", info.response);
			fs.unlinkSync(pdfPath);
		}
	});

	// Optionally delete PDF after sending
	// fs.unlinkSync(pdfPath);
}

exports.SrfEmailDetails = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.execute("transaction_srf_email_details");
			})
			.then((result) => {
				res.send({
					status: 200,
					valid: true,
					data: result.recordset,
				});
			})
			.catch((err) => {
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: error,
		});
	}
});
//details api for js
exports.JsEmailDetails = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.execute("transaction_jobsheet_email_details");
			})
			.then((result) => {
				res.send({
					status: 200,
					valid: true,
					data: result.recordset,
				});
			})
			.catch((err) => {
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: error,
		});
	}
});
