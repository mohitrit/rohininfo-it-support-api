const { authenticateToken } = require("../../authentication/auth");
const { ScannerQrcode } = require("../../controller/AppQrCode/qrCode");
const { authenticateTokenApp } = require("../../middleware/appAuthorize");
const AppQRCode = require("express").Router();
AppQRCode.post("/app_check_qrcode", ScannerQrcode);

module.exports = { AppQRCode };
