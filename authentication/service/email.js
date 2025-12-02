const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

class serviceFile {
  constructor() {
    this.name = "brij";
  }
  ReportPendingTask1day = asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool.request().execute("reminder_pending_orders_1day");
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            result.recordset.forEach((val, ind) => {
              sendEmail(val);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  });

  ReportPendingTask5days = asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool.request().execute("reminder_pending_orders_5days");
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            result.recordset.forEach((val, ind) => {
              sendEmail(val);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  });
}
function sendEmail48Hours(mailto, subject, otp, user) {
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
                <td style="width: 50%; text-align: right; padding: 15px">
                  <img
                    src="https://static/media/mg-logo.7ff75194ea87c79ec990.png"
                    alt="cnnectx"
                    style="
                      height: 85px;
                      max-width: 100px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px">
            <p>Subject: Notification – [Customer Name]_[Product Name]</p>
            <p>Dear [CFR Name],</p>
            <p style="margin: 0; line-height: 1.5">
             This is a kind reminder that the Job Sheet Request (JSR) Date against order confirmed is delayed above 48 hours from the date of 
             Order Confirmation Date (OCD) for [Customer Name] – [Product Name] [Qty].
            </p>
            <p>
              Kindly adhere to the timelines.
            </p>
              <p>
                  Thanks           
                  </p>
            <p style=" margin-bottom: 30px; margin-top: 40px;">
              Just reply to this email or contact
              <a
                href="mailto:client.support@brij.com"
                style="
                  text-decoration: none;
                  color: #da222b;
                  font-weight: 500;
                "
                >client.support@brij.com</a
              >
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
            <table style="width: 100%">
              <tr>
                <td style="vertical-align: top">
                  <p style="margin: 0 0 6px; line-height: 1.4">
                    <a style="color: #fff; text-decoration: none" href="tel:"
                      >&#9742; +9560086390</a
                    >
                    <br />
                    <a
                      style="color: #fff; text-decoration: none"
                      href="mailto:"
                      >&#x2709; client.support@brij.com</a
                    >
                  </p>
                </td>
                <td style="text-align: right; vertical-align: top">
                  <p style="color: #fff; margin: 0; line-height: 1.4">
                    <strong>Address:</strong>
                      Brij House’ A-1/2 Wazirpur <br />
                      Industrial Area, Delhi-110052, India
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error");
    }
  });
}
function sendEmail(obj) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CLIENT_APP_ID,
      pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.CLIENT_APP_ID,
    to: obj.email,
    subject: `${obj.customer_name}(${obj.product_name})`,
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
                <td style="width: 50%; text-align: right; padding: 15px">
                  <img
                    src="https://static/media/mg-logo.7ff75194ea87c79ec990.png"
                    alt="cnnectx"
                    style="
                      height: 85px;
                      max-width: 100px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px">
            <p>Subject: Notification – [Customer Name]_[Product Name]</p>
            <p>Dear${obj.contact1},</p>
            <p style="margin: 0; line-height: 1.5">
             This is a kind reminder that the Job Sheet Date against order confirmed is delayed above 24 hours
             from the date of Job Sheet Request (JSR) Date for [Customer Name] – [Product Name] [Qty].
            </p>
            <p>
              Kindly adhere to the timelines.
            </p>
              <p>
                  Thanks           
                  </p>
            
            <p style=" margin-bottom: 30px; margin-top: 40px;">
              Just reply to this email or contact
              <a
                href="mailto:client.support@brij.com"
                style="
                  text-decoration: none;
                  color: #da222b;
                  font-weight: 500;
                "
                >client.support@brij.com</a
              >
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
            <table style="width: 100%">
              <tr>
                <td style="vertical-align: top">
                  <p style="margin: 0 0 6px; line-height: 1.4">
                    <a style="color: #fff; text-decoration: none" href="tel:"
                      >&#9742; +9560086390</a
                    >
                    <br />
                    <a
                      style="color: #fff; text-decoration: none"
                      href="mailto:"
                      >&#x2709; client.support@brij.com</a
                    >
                  </p>
                </td>
                <td style="text-align: right; vertical-align: top">
                  <p style="color: #fff; margin: 0; line-height: 1.4">
                    <strong>Address:</strong>
                      Brij House’ A-1/2 Wazirpur <br />
                      Industrial Area, Delhi-110052, India
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error");
    }
  });
}
function sendEmail(mailto, subject, otp, user) {
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
                <td style="width: 50%; text-align: right; padding: 15px">
                  <img
                    src="https://static/media/mg-logo.7ff75194ea87c79ec990.png"
                    alt="cnnectx"
                    style="
                      height: 85px;
                      max-width: 100px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px">
            <p>Subject: Job Sheet Shared – Request for Acknowledgment on Delivery Date Confirmation</p>
            <p>Dear Team,</p>
            <p style="margin: 0; line-height: 1.5">
             This is to inform you that the following Job Sheet has been prepared and shared with the production team for further processing.
             Kindly review the details mentioned and acknowledge the delivery date confirmation at the earliest.
            </p>
            <table style="margin: 0 auto;">
              <p style="text-align: center; margin-bottom: 20px; margin-top: 30px;">
                <strong>Job Sheet details:</strong>
              </p>
              <tr>
                <td class="label-cell">&#8226; JS Number: [Insert JS Number]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Customer Name: [Insert Customer Name]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Product: [ ]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Qty: [ ]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Delivery Due Date: [Insert Delivery Date]</td>
              </tr>
            </table>
            <p>
              Kindly acknowledge the mentioned delivery date is feasible or highlight any constraints, so necessary actions can be taken in time.
            </p><p>Thanks</p>
            
            <p style=" margin-bottom: 30px; margin-top: 40px;">
              Just reply to this email or contact
              <a
                href="mailto:client.support@brij.com"
                style="
                  text-decoration: none;
                  color: #da222b;
                  font-weight: 500;
                "
                >client.support@brij.com</a
              >
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
            <table style="width: 100%">
              <tr>
                <td style="vertical-align: top">
                  <p style="margin: 0 0 6px; line-height: 1.4">
                    <a style="color: #fff; text-decoration: none" href="tel:"
                      >&#9742; +9560086390</a
                    >
                    <br />
                    <a
                      style="color: #fff; text-decoration: none"
                      href="mailto:"
                      >&#x2709; client.support@brij.com</a
                    >
                  </p>
                </td>
                <td style="text-align: right; vertical-align: top">
                  <p style="color: #fff; margin: 0; line-height: 1.4">
                    <strong>Address:</strong>
                      Brij House’ A-1/2 Wazirpur <br />
                      Industrial Area, Delhi-110052, India
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error");
    }
  });
}
function sendEmail(mailto, subject, otp, user) {
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
                <td style="width: 50%; text-align: right; padding: 15px">
                  <img
                    src="https://.in/static/media/mg-logo.7ff75194ea87c79ec990.png"
                    alt="cnnectx"
                    style="
                      height: 85px;
                      max-width: 100px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px">
            <p>Subject: Delivery Due Reminder – [Customer Name]_[Product Name] | Due in [Date]</p>
            <p>Dear Team,</p>
            <p style="margin: 0; line-height: 1.5">
            This is a kind reminder that the delivery due date for the following order is approaching in [X]day(s) i.e [Date]: 
            </p>
            <table style="margin: 0 ;">
  <p style="text-align: center; margin-bottom: 20px; margin-top: 30px;">
  </p>
  <tr>
    <td class="label-cell">&#8226; Customer Name: [Customer Name]</td>
  </tr>
  <tr>
    <td class="label-cell">&#8226; Product Name: [Product Name]</td>
  </tr>
  <tr>
    <td class="label-cell">&#8226; Qty: [Number]</td>
  </tr>
  <tr>
    <td class="label-cell">&#8226; Job Sheet No. : [Order Number]</td>
  </tr>
</table>

            <p>
             Please ensure timely delivery 
            </p>
              <p>
                  Thanks           
                  </p>
            
            <p style=" margin-bottom: 30px; margin-top: 40px;">
              Just reply to this email or contact
              <a
                href="mailto:client.support@brij.com"
                style="
                  text-decoration: none;
                  color: #da222b;
                  font-weight: 500;
                "
                >client.support@brij.com</a
              >
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
            <table style="width: 100%">
              <tr>
                <td style="vertical-align: top">
                  <p style="margin: 0 0 6px; line-height: 1.4">
                    <a style="color: #fff; text-decoration: none" href="tel:"
                      >&#9742; +9560086390</a
                    >
                    <br />
                    <a
                      style="color: #fff; text-decoration: none"
                      href="mailto:"
                      >&#x2709; client.support@brij.com</a
                    >
                  </p>
                </td>
                <td style="text-align: right; vertical-align: top">
                  <p style="color: #fff; margin: 0; line-height: 1.4">
                    <strong>Address:</strong>
                      Brij House’ A-1/2 Wazirpur <br />
                      Industrial Area, Delhi-110052, India
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error");
    }
  });
}
function sendEmail(mailto, subject, otp, user) {
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
                <td style="width: 50%; text-align: right; padding: 15px">
                  <img
                    src="https://.in/static/media/mg-logo.7ff75194ea87c79ec990.png"
                    alt="cnnectx"
                    style="
                      height: 85px;
                      max-width: 100px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px ">
            <p>Subject: Delivery Due Reminder – [Customer Name]_[Product Name] | Due in [Date]</p>
            <p>Dear Team,</p>
            <p style="margin: 0; line-height: 1.5">
            This is a kind reminder that the delivery due date for the following order is approaching in [X]day(s) i.e [Date]: 
            </p>
            <table style="margin: 0;">
              <p  margin-bottom: 20px; margin-top: 30px;">
              </p>
              <tr>
                <td class="label-cell">&#8226; Customer Name: [Customer Name]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Product Name: [Product Name]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Qty: [Number]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Job Sheet No. : [Order Number]</td>
              </tr>
            </table>

            <p>
             Please ensure timely delivery 
            </p>
              <p>
                  Thanks           
                  </p>
            
            <p style=" margin-bottom: 30px; margin-top: 40px;">
              Just reply to this email or contact
              <a
                href="mailto:client.support@brij.com"
                style="
                  text-decoration: none;
                  color: #da222b;
                  font-weight: 500;
                "
                >client.support@brij.com</a
              >
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
            <table style="width: 100%">
              <tr>
                <td style="vertical-align: top">
                  <p style="margin: 0 0 6px; line-height: 1.4">
                    <a style="color: #fff; text-decoration: none" href="tel:"
                      >&#9742; +9560086390</a
                    >
                    <br />
                    <a
                      style="color: #fff; text-decoration: none"
                      href="mailto:"
                      >&#x2709; client.support@brij.com</a
                    >
                  </p>
                </td>
                <td style="text-align: right; vertical-align: top">
                  <p style="color: #fff; margin: 0; line-height: 1.4">
                    <strong>Address:</strong>
                      Brij House’ A-1/2 Wazirpur <br />
                      Industrial Area, Delhi-110052, India
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error");
    }
  });
}
function sendEmail(mailto, subject, otp, user) {
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
                <td style="width: 50%; text-align: right; padding: 15px">
                  <img
                    src="https://.in/static/media/mg-logo.7ff75194ea87c79ec990.png"
                    alt="cnnectx"
                    style="
                      height: 85px;
                      max-width: 100px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px ">
            <p>Subject:🔴Red Flag – Delay in Order Processing: [Customer Name]_[Job Sheet No.] </p>
            <p>Dear Sir,</p>
            <p style="margin: 0; line-height: 1.5">
            This is to bring to your attention that the delivery due date for the following order has been
            delayed from planned delivery date of [   ] :            
            </p>
            <table style="margin: 0;">
              <p  margin-bottom: 20px; margin-top: 30px;">
             <strong>🔴Red Flag – Delay Alert</strong>
              </p>
              <tr>
                <td class="label-cell">&#8226; Customer Name: [Customer Name]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Product Name: [Product Name]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Qty: [Number]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Original Delivery Due Date: [DD/MM/YYYY]</td>
              </tr>
               <tr>
                <td class="label-cell">&#8226; Reason for Delay: [Mention Brief Reason – e.g., JSR Delay, Material Hold, Design Change, etc.]</td>
              </tr>
            </table>

              <p>
                  Thanks  <br/>
                  Brij & Co
                  
                  </p>
            
            <p style=" margin-bottom: 30px; margin-top: 40px;">
              Just reply to this email or contact
              <a
                href="mailto:client.support@brij.com"
                style="
                  text-decoration: none;
                  color: #da222b;
                  font-weight: 500;
                "
                >client.support@brij.com</a
              >
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
            <table style="width: 100%">
              <tr>
                <td style="vertical-align: top">
                  <p style="margin: 0 0 6px; line-height: 1.4">
                    <a style="color: #fff; text-decoration: none" href="tel:"
                      >&#9742; +9560086390</a
                    >
                    <br />
                    <a
                      style="color: #fff; text-decoration: none"
                      href="mailto:"
                      >&#x2709; client.support@brij.com</a
                    >
                  </p>
                </td>
                <td style="text-align: right; vertical-align: top">
                  <p style="color: #fff; margin: 0; line-height: 1.4">
                    <strong>Address:</strong>
                      Brij House’ A-1/2 Wazirpur <br />
                      Industrial Area, Delhi-110052, India
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error");
    }
  });
}
function sendEmail(mailto, subject, otp, user) {
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
                <td style="width: 50%; text-align: right; padding: 15px">
                  <img
                    src="https://.in/static/media/mg-logo.7ff75194ea87c79ec990.png"
                    alt="brij"
                    style="
                      height: 85px;
                      max-width: 100px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px ">
            <p>Subject: Ready to Dispatch Date Updated – [Customer Name]_[Product Name]</p>
            <p>Dear Team,</p>
            <p style="margin: 0; line-height: 1.5">
            Please note that the "Ready to Dispatch" date for the following order has been updated:
            </p>
            <table style="margin: 0;">
              <p  margin-bottom: 20px; margin-top: 30px;">
              </p>
              <tr>
                <td class="label-cell">&#8226; Customer Name: [Customer Name]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Product Name: [Product Name]</td>
              </tr>
               <tr>
                <td class="label-cell">&#8226;     Order Reference No.: [Order Number / Job Sheet No.]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Updated Ready to Dispatch Date: : [dd/mm/yyyy]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Updated By: [User Name / Department]</td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Remarks (if any): [Optional]</td>
              </tr>
            </table>

            <p>
            Kindly do further processing to dispatch the order
            </p>
              <p>
              Best regards,     
                  </p>
            
            <p style=" margin-bottom: 30px; margin-top: 40px;">
              Just reply to this email or contact
              <a
                href="mailto:client.support@brij.com"
                style="
                  text-decoration: none;
                  color: #da222b;
                  font-weight: 500;
                "
                >client.support@brij.com</a
              >
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
            <table style="width: 100%">
              <tr>
                <td style="vertical-align: top">
                  <p style="margin: 0 0 6px; line-height: 1.4">
                    <a style="color: #fff; text-decoration: none" href="tel:"
                      >&#9742; +9560086390</a
                    >
                    <br />
                    <a
                      style="color: #fff; text-decoration: none"
                      href="mailto:"
                      >&#x2709; client.support@brij.com</a
                    >
                  </p>
                </td>
                <td style="text-align: right; vertical-align: top">
                  <p style="color: #fff; margin: 0; line-height: 1.4">
                    <strong>Address:</strong>
                      Brij House’ A-1/2 Wazirpur <br />
                      Industrial Area, Delhi-110052, India
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error");
    }
  });
}
