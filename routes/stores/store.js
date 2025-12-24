const { authenticateToken } = require("../../authentication/auth");
const {
  usp_Stores_Save,
  usp_Stores_Browse,
  usp_Stores_Preview,
  usp_Stores_Delete,
  usp_list_Brand,
} = require("../../controller/Stores/store");

const storeStoreRoutes = require("express").Router();

storeStoreRoutes.post("/usp_Stores_Save", usp_Stores_Save);
storeStoreRoutes.post("/usp_Stores_Browse", usp_Stores_Browse);
storeStoreRoutes.post("/usp_Stores_Preview", usp_Stores_Preview);
storeStoreRoutes.post("/usp_Stores_Delete", usp_Stores_Delete);
storeStoreRoutes.post("/usp_list_Brand", usp_list_Brand);

module.exports = { storeStoreRoutes };
