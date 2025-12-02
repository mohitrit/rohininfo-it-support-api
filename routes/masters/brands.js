const { authenticateToken } = require("../../authentication/auth");
const { usp_Brand_Save, usp_Brand_Browse } = require("../../controller/Masters/brands");

const masterBrandsRoutes = require("express").Router();

masterBrandsRoutes.post("/usp_Brand_Save", usp_Brand_Save);
masterBrandsRoutes.post("/usp_Brand_Browse", usp_Brand_Browse);

module.exports = { masterBrandsRoutes };