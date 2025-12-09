const { authenticateToken } = require("../../authentication/auth");
const {
	usp_PIN_Browse,
	usp_PIN_Save,
	usp_PIN_Preview,
	usp_PIN_Delete,
} = require("../../controller/Masters/pin");

const masterPinRoutes = require("express").Router();

masterPinRoutes.post("/usp_PIN_Browse", usp_PIN_Browse);
masterPinRoutes.post("/usp_PIN_Save", usp_PIN_Save);
masterPinRoutes.post("/usp_PIN_Preview", usp_PIN_Preview);
masterPinRoutes.post("/usp_PIN_Delete", usp_PIN_Delete);

module.exports = { masterPinRoutes };
