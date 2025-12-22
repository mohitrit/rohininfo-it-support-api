const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_Stores_Browse = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("SearchTerm", req.body.filter_value)
          .execute("usp_Stores_Browse");
      })
      .then((result) => {
        console.log("usp_Stores_Browse ✅✅ => ", result);
        res.send({
          status: 200,
          data: result.recordset,
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Stores_Browse ❌❌ => ", err);
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

exports.usp_Stores_Save = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StoreID", req.body.store_id)
          .input("ReceivedDate", req.body.received_date)
          .input("StoreCode", req.body.store_code)
          .input("BrandID", req.body.brand_id)
          .input("StoreStatus", req.body.store_status)
          .input("Address", req.body.address)
          .input("City", req.body.city)
          .input("StateID", req.body.state_id)
          .input("GoogleLocation", req.body.google_location)
          .input("LCName", req.body.lc_name)
          .input("LCContact", req.body.lc_contact)
          .input("AreaManagerName", req.body.area_manager_name)
          .input("AreaManagerContact", req.body.area_manager_contact)
          .input("FeasibilityTypeID", req.body.feasibility_type_id)
          .input("IsActive", req.body.isActive)
          .input("CreatedBy", req.body.user_id)
          .execute("usp_Stores_Save");
      })
      .then((result) => {
        console.log("usp_Stores_Save ✅✅ => ", result);
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Stores_Save ❌❌ => ", err);
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

exports.usp_Stores_Preview = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StoreID", req.body.store_id)
          .execute("usp_Stores_Preview");
      })
      .then((result) => {
        console.log("usp_Stores_Preview ✅✅ => ", result);
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Stores_Preview ❌❌ => ", err);
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

exports.usp_Stores_Delete = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StoreID", req.body.store_id)
          .execute("usp_Stores_Delete");
      })
      .then((result) => {
        console.log("usp_Stores_Delete ✅✅ => ", result);
        res.send({
          status: 200,
          message: "Store deleted successfully",
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Stores_Delete ❌❌ => ", err);
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
