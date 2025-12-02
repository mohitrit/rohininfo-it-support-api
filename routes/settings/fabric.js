const { authenticateToken } = require("../../authentication/auth");
const {
  browseFabric,
  insertFabric,
  disableFabric,
  DeleteFabric,
  previewFabric,
} = require("../../controller/settings/fabric");

const FabricRoute = require("express").Router();

FabricRoute.post("/settings_fabric_browse",authenticateToken, browseFabric);
FabricRoute.post("/settings_fabric_insert",authenticateToken, insertFabric);
FabricRoute.post("/settings_fabric_disable",authenticateToken, disableFabric);
FabricRoute.post("/settings_fabric_delete",authenticateToken, DeleteFabric);
FabricRoute.post("/settings_fabric_preview",authenticateToken, previewFabric);

module.exports = { FabricRoute };
