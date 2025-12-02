const { authenticateToken } = require("../../authentication/auth");
const {
  browseMill,
  insertMill,
  disableMILL,
  DeleteMILL,
  previewMill,
} = require("../../controller/settings/mill");

const MillRoute = require("express").Router();

MillRoute.post("/settings_mill_browse",authenticateToken, browseMill);
MillRoute.post("/settings_mill_insert",authenticateToken, insertMill);
MillRoute.post("/settings_mill_disable",authenticateToken, disableMILL);
MillRoute.post("/settings_mill_delete",authenticateToken, DeleteMILL);
MillRoute.post("/settings_mill_preview",authenticateToken, previewMill);

module.exports = { MillRoute };
