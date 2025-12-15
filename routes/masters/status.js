const { authenticateToken } = require("../../authentication/auth");
const {
    usp_Status_Save,
    usp_Status_Browse,
    usp_Status_Preview,
    usp_Status_Delete,
} = require("../../controller/Masters/status"); 

const masterStatusRoutes = require("express").Router();

masterStatusRoutes.post("/usp_Status_Save", usp_Status_Save);
masterStatusRoutes.post("/usp_Status_Browse", usp_Status_Browse);
masterStatusRoutes.post("/usp_Status_Preview", usp_Status_Preview);
masterStatusRoutes.post("/usp_Status_Delete", usp_Status_Delete);

module.exports = { masterStatusRoutes };
