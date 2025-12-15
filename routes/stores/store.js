const { authenticateToken } = require("../../authentication/auth");
const {
  usp_Store_Save,
  usp_store_Browse,
  usp_Store_Preview,
  usp_Store_Delete,
} = require("../../controller/Stores/store");

const storeStoreRoutes = require("express").Router();

masterFeasibilityTypeRoutes.post(
  "/usp_FeasibilityType_Save",
  usp_FeasibilityType_Save
);
masterFeasibilityTypeRoutes.post(
  "/usp_FeasibilityType_Browse",
  usp_FeasibilityType_Browse
);
masterFeasibilityTypeRoutes.post(
  "/usp_FeasibilityType_Preview",
  usp_FeasibilityType_Preview
);
masterFeasibilityTypeRoutes.post(
  "/usp_FeasibilityType_Delete",
  usp_FeasibilityType_Delete
);

module.exports = { masterFeasibilityTypeRoutes };
