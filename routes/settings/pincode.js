const { authenticateToken } = require("../../authentication/auth");
const { insertPincode, browsePincode, disablePincode, DeletePincode, previewPincode, listState } = require("../../controller/settings/pincode");
const { previewProductUsage } = require("../../controller/settings/productUsage");


const PincodeRoute = require("express").Router();

PincodeRoute.post("/settings_pincode_insert",authenticateToken, insertPincode)
PincodeRoute.post("/settings_pincode_browse",authenticateToken, browsePincode)
PincodeRoute.post("/settings_pincode_disable",authenticateToken, disablePincode)
PincodeRoute.post("/settings_pincode_delete",authenticateToken, DeletePincode)
PincodeRoute.post("/settings_pincode_preview",authenticateToken, previewPincode)
PincodeRoute.post("/list_state", listState)


module.exports = { PincodeRoute };