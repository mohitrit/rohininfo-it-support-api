const { authenticateToken } = require("../../authentication/auth");
const {
	usp_Brand_Save,
	usp_Brand_Browse,
	usp_Brand_Preview,
	usp_Brand_Delete,
} = require("../../controller/Masters/brands");

const masterBrandsRoutes = require("express").Router();

masterBrandsRoutes.post("/usp_Brand_Save", usp_Brand_Save);
masterBrandsRoutes.post("/usp_Brand_Browse", usp_Brand_Browse);
masterBrandsRoutes.post("/usp_Brand_Preview", usp_Brand_Preview);
masterBrandsRoutes.post("/usp_Brand_Delete", usp_Brand_Delete);

module.exports = { masterBrandsRoutes };
