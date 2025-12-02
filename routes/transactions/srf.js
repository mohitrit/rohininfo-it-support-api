const {
  srfInsert,
  browseSRF,
  DeleteSRF,
  previewSRF,
  styleCode,
  SrfAttachmentInsert,
  SrfPrint,
  listWovenFabric,
  listKnitWovenFabric,
  listFabricTrim,
  attachmentSrf,
  DeleteSRFimagePreview,
  SrfFinalDeliveryDate,
  UpdateTransactionSRF,
} = require("../../controller/transactions/srf");
const { authenticateToken } = require("../../authentication/auth");
const { imageUpload } = require("../../File/File");

const SRFRoutes = require("express").Router();

SRFRoutes.post("/insert_srf", authenticateToken, srfInsert);
SRFRoutes.post("/transaction_srf_browse", authenticateToken, browseSRF);
SRFRoutes.post("/transaction_srf_delete", authenticateToken, DeleteSRF);
SRFRoutes.post("/transaction_srf_preview", authenticateToken, previewSRF);
SRFRoutes.post("/style_code", authenticateToken, styleCode);
SRFRoutes.post("/transaction_srf_print", authenticateToken, SrfPrint);
SRFRoutes.post("/list_woven_fabric", authenticateToken, listWovenFabric);
SRFRoutes.post("/transaction_srf_attachment_preview", attachmentSrf);
SRFRoutes.post("/list_fabric_in_srf", listKnitWovenFabric);
SRFRoutes.post('/list_fabric_trim', listFabricTrim);
SRFRoutes.post("/transaction_srf_attachment_delete", DeleteSRFimagePreview);
SRFRoutes.post(
  "/transaction_srf_attachment_insert",
  imageUpload("uploads/srfImages", 20).array("file_path"),
  SrfAttachmentInsert
);
SRFRoutes.post("/transaction_srf_update_final_delivery_date", authenticateToken, SrfFinalDeliveryDate);
SRFRoutes.post("/update_transaction_srf_status", UpdateTransactionSRF);


module.exports = { SRFRoutes };
