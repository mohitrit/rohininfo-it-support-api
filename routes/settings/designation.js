const { authenticateToken } = require("../../authentication/auth");
const { insertDesignation, browseDesignation, disableDesignation, DeleteDesignation, previewDesignation } = require("../../controller/settings/designation");



const DesignationRoute = require("express").Router();

DesignationRoute.post("/settings_designation_insert",authenticateToken, insertDesignation)
DesignationRoute.post("/settings_designation_browse",authenticateToken, browseDesignation)
DesignationRoute.post("/settings_designation_disable",authenticateToken, disableDesignation)
DesignationRoute.post("/settings_designation_delete",authenticateToken, DeleteDesignation)
DesignationRoute.post("/settings_designation_preview",authenticateToken, previewDesignation)


module.exports = { DesignationRoute };