const { authenticateToken } = require("../../authentication/auth");
const {
  usp_Store_Save,
  usp_Store_Browse,
  usp_Store_Preview,
  usp_Store_Delete,
} = require("../../controller/Stores/store");

const storeStoreRoutes = require("express").Router();

masterStoreRoutes.post("/usp_Store_Save", usp_Store_Save);
masterSroreRoutes.post("/usp_Store_Browse", usp_Store_Browse);
masterStoreRoutes.post("/usp_Store_Preview", usp_Store_Preview);
masterStoreRoutes.post("/usp_Store_Delete", usp_Store_Delete);

module.exports = { storeStoreRoutes };
