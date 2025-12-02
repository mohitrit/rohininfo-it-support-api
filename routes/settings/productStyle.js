const { authenticateToken } = require("../../authentication/auth");
const { browseProductStyle, insertProductStyle, DeleteProductStyle, previewProductStyle, uploadSizeChartProfile } = require("../../controller/settings/productStyle");
const { imageUpload } = require("../../File/File");

const ProductStyleRoute = require("express").Router();

ProductStyleRoute.post("/settings_product_style_browse", authenticateToken, browseProductStyle);
ProductStyleRoute.post("/settings_product_style_insert", authenticateToken, insertProductStyle);
ProductStyleRoute.post("/settings_product_style_delete", authenticateToken, DeleteProductStyle);
ProductStyleRoute.post("/settings_product_style_preview", authenticateToken, previewProductStyle);
ProductStyleRoute.post("/setting_size_chart_pic", imageUpload("uploads/sizeChart", 20).single("file_path"),
  uploadSizeChartProfile)
module.exports = { ProductStyleRoute };
