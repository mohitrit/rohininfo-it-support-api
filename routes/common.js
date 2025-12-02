const { authenticateToken } = require("../authentication/auth");
const { AutoGenerateCommonApi, AutoGenerateCommonApiByID } = require("../controller/common");
const common = require("express").Router();
common.get("/auto_generate_id",authenticateToken,AutoGenerateCommonApi);
common.get("/auto_generate_user_id",authenticateToken,AutoGenerateCommonApiByID);
module.exports = { common };