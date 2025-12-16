const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_Store_Browse = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("SearchTerm", req.body.filter_value)
          .execute("usp_Store_Browse");
      })
      .then((result) => {
        console.log("usp_Store_Browse ✅✅ => ", result);
        res.send({
          status: 200,
          data: result.recordset,
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Store_Browse ❌❌ => ", err);
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

exports.usp_Store_Save = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StoresID", req.body.store_id)
          .input("ReceivedDate", req.body.received_date)
          .input("StoreCode", req.body.store_code)
          .input("Brand", req.body.brand)
          .input("StoreStatus", req.body.store_status)
          .input("Address", req.body.address)
          .input("City", req.body.city)
          .input("State", req.body.state)
          .input("GoogleLocation", req.body.google_location)
          .input("LCName", req.body.lc_name)
          .input("LCContact", req.body.lc_contact)
          .input("AMName", req.body.area_manager_name)
          .input("AMContact", req.body.area_manager_contact)
          .input("FeasibilityType", req.body.feasibility_type)
          .execute("usp_Store_Save");
      })
      .then((result) => {
        console.log("usp_Store_Save ✅✅ => ", result);
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Store_Save ❌❌ => ", err);
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

exports.usp_Store_Preview = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StoresID", req.body.store_id)
          .execute("usp_Store_Preview");
      })
      .then((result) => {
        console.log("usp_Store_Preview ✅✅ => ", result);
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Store_Preview ❌❌ => ", err);
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

exports.usp_Store_Delete = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StoresID", req.body.store_id)
          .execute("usp_Store_Delete");
      })
      .then((result) => {
        console.log("usp_Store_Delete ✅✅ => ", result);
        res.send({
          status: 200,
          message: "Store deleted successfully",
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Store_Delete ❌❌ => ", err);
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
