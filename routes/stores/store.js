const { authenticateToken } = require("../../authentication/auth");
const {
  usp_Store_Save,
  usp_Store_Browse,
  usp_Store_Preview,
  usp_Store_Delete,
} = require("../../controller/Stores/store");

const storeStoreRoutes = require("express").Router();

storeStoreRoutes.post("/usp_Store_Save", usp_Store_Save);
storeStoreRoutes.post("/usp_Store_Browse", usp_Store_Browse);
storeStoreRoutes.post("/usp_Store_Preview", usp_Store_Preview);
storeStoreRoutes.post("/usp_Store_Delete", usp_Store_Delete);

module.exports = { storeStoreRoutes };
