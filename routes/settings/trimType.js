const { authenticateToken } = require("../../authentication/auth");
const {
  browseTrimType,
  inserTrimType,
  disableTrimType,
  DeleteTrimType,
  previewTrimType,
} = require("../../controller/settings/trimType");

const TrimTypeRoute = require("express").Router();

TrimTypeRoute.post("/settings_trim_type_browse",authenticateToken, browseTrimType);
TrimTypeRoute.post("/settings_trim_type_insert",authenticateToken, inserTrimType);
TrimTypeRoute.post("/settings_trim_type_disable",authenticateToken, disableTrimType);
TrimTypeRoute.post("/settings_trim_type_delete",authenticateToken, DeleteTrimType);
TrimTypeRoute.post("/settings_trim_type_preview",authenticateToken, previewTrimType);

module.exports = { TrimTypeRoute };
