const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_PaymentMode_Browse = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("SearchTerm", req.body.filter_value)
          .execute("usp_PaymentMode_Browse");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset,
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_PaymentMode_Browse ❌❌ => ", err);
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

exports.usp_PaymentMode_Save = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("PaymentModeID", req.body.payment_mode_id)
          .input("PaymentMode", req.body.payment_mode)
          .input("Description", req.body.description)
          .input("IsActive", req.body.isActive)
          .input("IsOnline", req.body.IsOnline)
          .input("CreatedBy", req.body.user_id)
          .execute("usp_PaymentMode_Save");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_PaymentMode_Save ❌❌ => ", err);
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

exports.usp_PaymentMode_Preview = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("PaymentModeID", req.body.payment_mode_id)
          .execute("usp_PaymentMode_Preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_PaymentMode_Preview ❌❌ => ", err);
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

exports.usp_PaymentMode_Delete = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("PaymentModeID", req.body.payment_mode_id)
          .execute("usp_PaymentMode_Delete");
      })
      .then((result) => {
        console.log("usp_PaymentMode_Delete ✅✅ => ", result);
        res.send({
          status: 200,
          message: "Payment Mode deleted successfully",
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_PaymentMode_Delete ❌❌ => ", err);
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
