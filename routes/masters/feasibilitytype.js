const { authenticateToken } = require("../../authentication/auth");
const {
    usp_FeasibilityType_Save,
    usp_FeasibilityType_Browse,
    usp_FeasibilityType_Preview,
    usp_FeasibilityType_Delete,
} = require("../../controller/Masters/feasibilitytype"); 

const masterFeasibilityTypeRoutes = require("express").Router();



masterFeasibilityTypeRoutes.post("/usp_FeasibilityType_Save", usp_FeasibilityType_Save);
masterFeasibilityTypeRoutes.post("/usp_FeasibilityType_Browse", usp_FeasibilityType_Browse);
masterFeasibilityTypeRoutes.post("/usp_FeasibilityType_Preview", usp_FeasibilityType_Preview);
masterFeasibilityTypeRoutes.post("/usp_FeasibilityType_Delete", usp_FeasibilityType_Delete);

module.exports = { masterFeasibilityTypeRoutes };
