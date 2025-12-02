const { authenticateToken } = require("../../authentication/auth");
const { insertItemCategory, browseItemCategory, previewItemCategory, deleteItemCategory, disableItemCategory } = require("../../controller/settings/itemCategory");


const ItemCategory = require("express").Router();

ItemCategory.post("/settings_accessories_category_insert",authenticateToken, insertItemCategory)
ItemCategory.post("/settings_accessories_category_browse",authenticateToken,browseItemCategory)
ItemCategory.post("/settings_accessories_category_preview",authenticateToken,previewItemCategory)
ItemCategory.post("/settings_accessories_category_delete",authenticateToken,deleteItemCategory)
ItemCategory.post("/setting_accessories_category_disable",authenticateToken,disableItemCategory)

module.exports = { ItemCategory };