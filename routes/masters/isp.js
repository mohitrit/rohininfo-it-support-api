const { authenticateToken } = require("../../authentication/auth");
const {
	usp_ISP_Browse,
	usp_ISP_Save,
	usp_ISP_Preview,
	usp_ISP_Delete,
} = require("../../controller/Masters/isp");

const masterISPRoutes = require("express").Router();

masterISPRoutes.post("/usp_ISP_Browse", usp_ISP_Browse);
masterISPRoutes.post("/usp_ISP_Save", usp_ISP_Save);
masterISPRoutes.post("/usp_ISP_Preview", usp_ISP_Preview);
masterISPRoutes.post("/usp_ISP_Delete", usp_ISP_Delete);

module.exports = { masterISPRoutes };
