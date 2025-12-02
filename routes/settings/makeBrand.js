const { authenticateToken } = require("../../authentication/auth");
const {
  browseMakeBrand,
  insertMakeBrand,
  disableMakeBrand,
  DeleteMakeBrand,
  previewMakeBrand,
} = require("../../controller/settings/makeBrand");

const MakeBrandRoute = require("express").Router();

MakeBrandRoute.post("/settings_make_brand_browse",authenticateToken, browseMakeBrand);
MakeBrandRoute.post("/settings_make_brand_insert",authenticateToken, insertMakeBrand);
MakeBrandRoute.post("/settings_make_brand_disable",authenticateToken, disableMakeBrand);
MakeBrandRoute.post("/settings_make_brand_delete",authenticateToken, DeleteMakeBrand);
MakeBrandRoute.post("/settings_make_brand_preview",authenticateToken, previewMakeBrand);

module.exports = { MakeBrandRoute };
