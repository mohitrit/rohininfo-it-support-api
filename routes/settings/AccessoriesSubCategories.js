const { authenticateToken } = require("../../authentication/auth");
const { browseAccessoriesSubCategories, insertAccessoriesSubCategories, DeleteAccessoriesSubCategories, previewAccessoriesSubCategories, disableAccessoriesSubCategory } = require("../../controller/settings/accessoriesSubCategories");

  
  const AccessoriesSubCategories = require("express").Router();
  
  AccessoriesSubCategories.post("/settings_accessories_subcategory_browse",authenticateToken, browseAccessoriesSubCategories);
  AccessoriesSubCategories.post("/settings_accessories_subcategory_insert",authenticateToken, insertAccessoriesSubCategories);
  AccessoriesSubCategories.post("/settings_accessories_subcategory_delete",authenticateToken, DeleteAccessoriesSubCategories);
  AccessoriesSubCategories.post("/settings_accessories_subcategory_preview",authenticateToken, previewAccessoriesSubCategories);
  AccessoriesSubCategories.post("/setting_accessories_subcategory_disable",authenticateToken,disableAccessoriesSubCategory);
  
  module.exports = { AccessoriesSubCategories };
  