const { authenticateToken } = require("../../authentication/auth");
const { RGPPick, RGPItemsPick, insertRRGP, browseRRGP, DeleteRRGP, previewRRGP, RRGPPrint } = require("../../controller/transactions/RRGP");


const RRGPRoutes = require("express").Router();
RRGPRoutes.post("/pick_rgp_in_rrgp",authenticateToken, RGPPick);
RRGPRoutes.post("/pick_rgp_item_in_rrgp", RGPItemsPick);
RRGPRoutes.post("/transaction_rrgp_insert",authenticateToken, insertRRGP);
RRGPRoutes.post("/transaction_rrgp_browse", authenticateToken, browseRRGP);
RRGPRoutes.post("/transaction_rrgp_delete", authenticateToken, DeleteRRGP);
RRGPRoutes.post("/transaction_rrgp_preview", authenticateToken, previewRRGP);
RRGPRoutes.post("/transaction_rrgp_print", authenticateToken, RRGPPrint);
//
module.exports = { RRGPRoutes };