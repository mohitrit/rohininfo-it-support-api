const { authenticateToken } = require("../../authentication/auth");
const {
  usp_Stores_Save,
  usp_Stores_Browse,
  usp_Stores_Preview,
  usp_Stores_Delete,
} = require("../../controller/Stores/store");

const storeStoreRoutes = require("express").Router();

storeStoreRoutes.post("/usp_Stores_Save", usp_Stores_Save);
storeStoreRoutes.post("/usp_Stores_Browse", usp_Stores_Browse);
storeStoreRoutes.post("/usp_Stores_Preview", usp_Stores_Preview);
storeStoreRoutes.post("/usp_Stores_Delete", usp_Stores_Delete);

module.exports = { storeStoreRoutes };
