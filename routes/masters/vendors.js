const { authenticateToken } = require("../../authentication/auth");
const {
    usp_Vendor_Save,
    usp_Vendor_Browse,
    usp_Vendor_Preview,
    usp_Vendor_Delete,
} = require("../../controller/Masters/vendors");

const masterBrandsRoutes = require("express").Router();

masterBrandsRoutes.post("/usp_Vendor_Save", usp_Vendor_Save);
masterBrandsRoutes.post("/usp_Vendor_Browse", usp_Vendor_Browse);
masterBrandsRoutes.post("/usp_Vendor_Preview", usp_Vendor_Preview);
masterBrandsRoutes.post("/usp_Vendor_Delete", usp_Vendor_Delete);

module.exports = { masterBrandsRoutes };
