const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
exports.ScannerQrcode = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", 15)
          .input("type", req.body.type)
          .input("qrcode", req.body.qrcode)
          .execute("app_check_qrcode");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          customerDetails: result.recordsets[1],
          vendorDetails: result.recordsets[2],
        });
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
});