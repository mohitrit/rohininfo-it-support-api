const { authenticateToken } = require("../../authentication/auth");
const {
  browseItemName,
  insertItemName,
  disableItemName,
  DeleteitemName,
  previewItemName,
} = require("../../controller/settings/itemName");

const ItemNameRoute = require("express").Router();

ItemNameRoute.post("/settings_item_name_browse",authenticateToken, browseItemName);
ItemNameRoute.post("/settings_item_name_insert",authenticateToken, insertItemName);
ItemNameRoute.post("/settings_item_name_disable",authenticateToken, disableItemName);
ItemNameRoute.post("/settings_item_name_delete",authenticateToken, DeleteitemName);
ItemNameRoute.post("/settings_item_name_preview",authenticateToken, previewItemName);

module.exports = { ItemNameRoute };
