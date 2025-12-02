const { authenticateToken } = require("../../authentication/auth");
const { BomSrfPick, listBomCharges, PickSrfDetailsBom, insertBom, previewBom, browseBom, DeleteBom, listKnittedWovenFabric, printBom, BomPrint, BomAttachmentInsert, attachmentBomPreview, DeleteAttchmentBom } = require("../../controller/transactions/Bom");
const { imageUpload } = require("../../File/File");


const BOMRoutes = require("express").Router();
BOMRoutes.post("/transaction_bom_insert", authenticateToken, insertBom);
BOMRoutes.post("/pick_srf_main_in_bom", authenticateToken, BomSrfPick);
BOMRoutes.post("/list_bom_charges", listBomCharges);
BOMRoutes.post("/transaction_bom_preview", previewBom);
BOMRoutes.post("/transaction_bom_browse", authenticateToken, browseBom);
BOMRoutes.post("/transaction_bom_delete", authenticateToken, DeleteBom);
BOMRoutes.post("/pick_srf_details_in_bom", PickSrfDetailsBom);
BOMRoutes.post("/list_fabric_in_bom", listKnittedWovenFabric);
BOMRoutes.post("/transaction_bom_print", BomPrint);
BOMRoutes.post("/transaction_bom_attachment_insert",
    imageUpload("uploads/bomImages", 20).array("file_path"),
    BomAttachmentInsert
);
BOMRoutes.post("/transaction_bom_attachment_preview", attachmentBomPreview);
BOMRoutes.post("/transaction_bom_attachment_delete", DeleteAttchmentBom);


module.exports = { BOMRoutes };
