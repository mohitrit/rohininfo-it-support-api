const { authenticateToken } = require("../../authentication/auth");
const {
	NotifyDelivery,
	INSERTemailLog,
	INSERTemailLogJS,
	SrfEmailDetails,
	JsEmailDetails,
	JsEmailDetailsAttchment,
} = require("../../controller/transactions/Notification");

const NotifiationRoutes = require("express").Router();
NotifiationRoutes.post("/notify_delivery_date_srf", NotifyDelivery);
NotifiationRoutes.post("/notify_pi_date_order_date_jobsheet", NotifyDelivery);
NotifiationRoutes.post(
	"/insert_email_log_notify_delivery_date_srf",
	authenticateToken,
	INSERTemailLog
);
NotifiationRoutes.post(
	"/insert_email_log_notify_pi_order_date_jobsheet",
	authenticateToken,
	INSERTemailLogJS
);
NotifiationRoutes.post("/transaction_srf_email_details", SrfEmailDetails);
NotifiationRoutes.post("/transaction_jobsheet_email_details", JsEmailDetails);

module.exports = { NotifiationRoutes };
