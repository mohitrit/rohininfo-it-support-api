const { authenticateToken } = require("../../authentication/auth");
const { insertDyeingHouse, browseDyeing, DeleteDyeing, disableDyeing, previewDyeing } = require("../../controller/settings/dyeing");

const DyeingRoute = require("express").Router();

DyeingRoute.post("/settings_dyeing_house_insert",authenticateToken, insertDyeingHouse)
DyeingRoute.post("/settings_dyeing_house_browse",authenticateToken, browseDyeing)
DyeingRoute.post("/settings_dyeing_house_delete",authenticateToken, DeleteDyeing)
DyeingRoute.post("/settings_dyeing_house_disable",authenticateToken, disableDyeing)
DyeingRoute.post("/settings_dyeing_house_preview",authenticateToken, previewDyeing)
module.exports = { DyeingRoute };