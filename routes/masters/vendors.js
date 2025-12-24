const { authenticateToken } = require("../../authentication/auth");
const {
    usp_Vendor_Save,
    usp_Vendor_Browse,
    usp_Vendor_Preview,
    usp_Vendor_Delete,
    usp_list_ISP,
    usp_list_PIN,
} = require("../../controller/Masters/vendors");

const masterVendorsRoutes = require("express").Router();

masterVendorsRoutes.post("/usp_Vendor_Save", usp_Vendor_Save);
masterVendorsRoutes.post("/usp_Vendor_Browse", usp_Vendor_Browse);
masterVendorsRoutes.post("/usp_Vendor_Preview", usp_Vendor_Preview);
masterVendorsRoutes.post("/usp_Vendor_Delete", usp_Vendor_Delete);
masterVendorsRoutes.post("/usp_list_ISP", usp_list_ISP);
masterVendorsRoutes.post("/usp_list_PIN", usp_list_PIN);
module.exports = { masterVendorsRoutes };
