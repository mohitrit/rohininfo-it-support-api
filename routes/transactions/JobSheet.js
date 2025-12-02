const { authenticateToken } = require("../../authentication/auth");
const {
	JSSrfPick,
	PickSrfDetailsJS,
	JobSheetInsert,
	JSBrowse,
	JSDelete,
	JSpreview,
	JSPrint,
	JSAttachmentInsert,
	DeleteJSImagePreview,
	PreviewJsAttachment,
	JSReviewed,
	JSFinalDeliveryDate,
	JSPreProductionDate,
	UpdateTransactionJobsheet,
} = require("../../controller/transactions/JobSheet");
const { imageUpload } = require("../../File/File");

const JSRoutes = require("express").Router();
JSRoutes.post("/pick_srf_main_in_jobsheet", authenticateToken, JSSrfPick);
JSRoutes.post("/pick_srf_details_in_jobsheet", PickSrfDetailsJS);
JSRoutes.post(
	"/transaction_jobsheet_insert",
	authenticateToken,
	JobSheetInsert
);
JSRoutes.post("/transaction_jobsheet_browse", authenticateToken, JSBrowse);
JSRoutes.post("/transaction_jobsheet_delete", JSDelete);
JSRoutes.post("/transaction_jobsheet_preview", authenticateToken, JSpreview);
JSRoutes.post("/transaction_jobsheet_print", JSPrint);
JSRoutes.post(
	"/transaction_jobsheet_attachment_insert",
	imageUpload("uploads/jsImages", 20).array("file_path"),
	JSAttachmentInsert
);
JSRoutes.post("/transaction_jobsheet_attachment_delete", DeleteJSImagePreview);
JSRoutes.post("/transaction_jobsheet_attachment_preview", PreviewJsAttachment);
JSRoutes.post(
	"/transaction_jobsheet_update_reviewed",
	authenticateToken,
	JSReviewed
);
JSRoutes.post(
	"/transaction_jobsheet_update_final_delivery_date",
	authenticateToken,
	JSFinalDeliveryDate
);
JSRoutes.post(
	"/transaction_jobsheet_update_ppm_date",
	authenticateToken,
	JSPreProductionDate
);
JSRoutes.post("/update_transaction_jobsheet_status", UpdateTransactionJobsheet);
module.exports = { JSRoutes };
