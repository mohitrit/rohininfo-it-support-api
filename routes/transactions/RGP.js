const { authenticateToken } = require("../../authentication/auth");
const { insertRGP, RgpQRPick, browseRGP, listContactPerson, DeleteRGP, previewRGP, RGPPrint } = require("../../controller/transactions/RGP");

//


const RGPRoutes = require("express").Router();
RGPRoutes.post("/transaction_rgp_insert",authenticateToken, insertRGP);
RGPRoutes.post("/pick_qr_in_rgp", authenticateToken, RgpQRPick);
RGPRoutes.post("/transaction_rgp_browse",authenticateToken, browseRGP);
RGPRoutes.post("/list_contact_person",authenticateToken, listContactPerson);
RGPRoutes.post("/transaction_rgp_delete",authenticateToken, DeleteRGP);
RGPRoutes.post("/transaction_rgp_preview",authenticateToken, previewRGP);
RGPRoutes.post("/transaction_rgp_print",authenticateToken, RGPPrint);

//
module.exports = { RGPRoutes };