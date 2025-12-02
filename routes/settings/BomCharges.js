const { authenticateToken } = require("../../authentication/auth");
const { insertBOM, previewBOM, browseBOM, DeleteBOM, disableBOM } = require("../../controller/settings/BomCharges");



const BOMRoute = require("express").Router();

BOMRoute.post("/settings_bom_charges_insert",authenticateToken, insertBOM);
BOMRoute.post("/settings_bom_charges_preview",authenticateToken, previewBOM);
BOMRoute.post("/settings_bom_charges_browse",authenticateToken, browseBOM);
BOMRoute.post("/settings_bom_charges_delete", authenticateToken, DeleteBOM);
BOMRoute.post("/settings_bom_charges_disable",authenticateToken, disableBOM);

module.exports = { BOMRoute };

