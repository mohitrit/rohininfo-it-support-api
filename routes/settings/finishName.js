const { authenticateToken } = require("../../authentication/auth");
const {
  browseFinishName,
  insertFinishName,
  disableFinishName,
  DeleteFinishName,
  previewFinishName,
} = require("../../controller/settings/finishName");

const FinishNameRoute = require("express").Router();

FinishNameRoute.post("/settings_finish_name_browse",authenticateToken, browseFinishName);
FinishNameRoute.post("/settings_finish_name_insert",authenticateToken, insertFinishName);
FinishNameRoute.post("/settings_finish_name_disable",authenticateToken, disableFinishName);
FinishNameRoute.post("/settings_finish_name_delete",authenticateToken, DeleteFinishName);
FinishNameRoute.post("/settings_finish_name_preview",authenticateToken, previewFinishName);

module.exports = { FinishNameRoute };
