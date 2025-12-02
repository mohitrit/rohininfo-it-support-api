const { authenticateToken } = require("../../authentication/auth");
const {
  browseBlend,
  insertBlend,
  disableBlend,
  DeleteBlend,
  previewBlend,
} = require("../../controller/settings/blend");

const BlendRoute = require("express").Router();

BlendRoute.post("/settings_blend_browse",authenticateToken, browseBlend);
BlendRoute.post("/settings_blend_insert",authenticateToken, insertBlend);
BlendRoute.post("/settings_blend_disable",authenticateToken, disableBlend);
BlendRoute.post("/settings_blend_delete",authenticateToken, DeleteBlend);
BlendRoute.post("/settings_blend_preview",authenticateToken, previewBlend);

module.exports = { BlendRoute };
