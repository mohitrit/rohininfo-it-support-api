const { authenticateToken } = require("../../authentication/auth");
const {
  browseUOM,
  insertUOM,
  disableUOM,
  DeleteUOM,
  previewUOM,
} = require("../../controller/settings/uom");

const UOMRoute = require("express").Router();

UOMRoute.post("/settings_uom_browse",authenticateToken, browseUOM);
UOMRoute.post("/settings_uom_insert",authenticateToken, insertUOM);
UOMRoute.post("/settings_uom_disable",authenticateToken, disableUOM);
UOMRoute.post("/settings_uom_delete",authenticateToken, DeleteUOM);
UOMRoute.post("/settings_uom_preview",authenticateToken, previewUOM);

module.exports = { UOMRoute };
