const { authenticateToken } = require("../../authentication/auth");
const {
  browseKnittedType,
  insertKnittedType,
  disableKnittedType,
  DeleteKnittedType,
  previewKnittedType,
} = require("../../controller/settings/knittedType");

const KnittedTypeRoute = require("express").Router();

KnittedTypeRoute.post("/settings_knitted_type_browse",authenticateToken, browseKnittedType);
KnittedTypeRoute.post("/settings_knitted_type_insert",authenticateToken, insertKnittedType);
KnittedTypeRoute.post("/settings_knitted_type_disable",authenticateToken, disableKnittedType);
KnittedTypeRoute.post("/settings_knitted_type_delete",authenticateToken, DeleteKnittedType);
KnittedTypeRoute.post("/settings_knitted_type_preview",authenticateToken, previewKnittedType);

module.exports = { KnittedTypeRoute };
