const { authenticateToken } = require("../../authentication/auth");
const {
  browseColor,
  insertColor,
  disableColor,
  DeleteColor,
  previewColor,
} = require("../../controller/settings/color");

const ColorRoute = require("express").Router();

ColorRoute.post("/settings_color_browse",authenticateToken, browseColor);
ColorRoute.post("/settings_color_insert",authenticateToken, insertColor);
ColorRoute.post("/settings_color_disable",authenticateToken, disableColor);
ColorRoute.post("/settings_color_delete",authenticateToken, DeleteColor);
ColorRoute.post("/settings_color_preview",authenticateToken, previewColor);

module.exports = { ColorRoute };
