const { authenticateToken } = require("../../authentication/auth");
const { QrSrfPick, PickSrfDetailsQr, insertQrcode, previewQrcode, browseQrcode, DeleteQrcode, printQrcode } = require("../../controller/transactions/QRCode");


const QrRoutes = require("express").Router();


QrRoutes.post("/pick_srf_main_in_qr",authenticateToken, QrSrfPick);
QrRoutes.post("/pick_srf_details_in_qr", PickSrfDetailsQr);
QrRoutes.post("/transaction_srf_qr_insert",authenticateToken, insertQrcode);
QrRoutes.post("/transaction_srf_qr_preveiw",previewQrcode);
QrRoutes.post("/transaction_srf_qr_browse",authenticateToken, browseQrcode);
// QrRoutes.post("/transaction_srf_qr_browse",browseQrcode);
QrRoutes.post('/transaction_srf_qr_delete', DeleteQrcode);
QrRoutes.post('/transaction_srf_qr_print',printQrcode);

module.exports = {QrRoutes}