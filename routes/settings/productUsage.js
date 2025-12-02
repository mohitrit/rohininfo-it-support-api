const { authenticateToken } = require("../../authentication/auth");
const {
  browseProductUsage,
  insertProductUsage,
  disableProductUasage,
  DeleteProductUsage,
  previewProductUsage,
} = require("../../controller/settings/productUsage");

const ProductUsageRoute = require("express").Router();

ProductUsageRoute.post("/settings_product_usage_browse",authenticateToken, browseProductUsage);
ProductUsageRoute.post("/settings_product_usage_insert",authenticateToken, insertProductUsage);
ProductUsageRoute.post("/settings_product_usage_disable",authenticateToken, disableProductUasage);
ProductUsageRoute.post("/settings_product_usage_delete",authenticateToken, DeleteProductUsage);
ProductUsageRoute.post("/settings_product_usage_preview",authenticateToken, previewProductUsage);

module.exports = { ProductUsageRoute };
