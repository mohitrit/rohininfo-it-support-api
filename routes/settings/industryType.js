
const { authenticateToken } = require("../../authentication/auth");
const { insertIndustryType, browseIndustryType, disableIndustryType, DeleteIndustryType, previewIndustryType } = require("../../controller/settings/industryType");

const IndustryTypeRoute = require("express").Router();
IndustryTypeRoute.post("/settings_industry_type_insert",authenticateToken, insertIndustryType)
IndustryTypeRoute.post("/settings_industry_type_browse",authenticateToken, browseIndustryType)
IndustryTypeRoute.post("/settings_industry_type_disable",authenticateToken, disableIndustryType)
IndustryTypeRoute.post("/settings_industry_type_delete",authenticateToken, DeleteIndustryType)
IndustryTypeRoute.post("/settings_industry_type_preview",authenticateToken, previewIndustryType)

module.exports = { IndustryTypeRoute };