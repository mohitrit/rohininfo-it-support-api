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
    // Connection Pool setup
    const pool = await sql.connect(config);
    
    const result = await pool.request()
      .input("StoreID", sql.Int, req.body.store_id || 0)
      .input("ReceivedDate", sql.Date, req.body.received_date)
      .input("StoreCode", sql.VarChar, req.body.store_code)      
      .input("BrandID", sql.Int, (req.body.brand_id == null || req.body.brand_id === "" || req.body.brand_id == 0) 
    ? 1  // Yahan wo ID likhein jo aapke 'Brands' table mein default/Dummy brand ki hai
    : parseInt(req.body.brand_id)
)      .input("StoreStatus", sql.VarChar, req.body.store_status)
      .input("Address", sql.VarChar, req.body.address)
      .input("City", sql.VarChar, req.body.city)
      .input("StateID", sql.Int, parseInt(req.body.state_id))
      .input("GoogleLocation", sql.VarChar, req.body.google_location || null)
      .input("LCName", sql.VarChar, req.body.lc_name)
      .input("LCContact", sql.VarChar, req.body.lc_contact)
      .input("AreaManagerName", sql.VarChar, req.body.area_manager_name)
      .input("AreaManagerContact", sql.VarChar, req.body.area_manager_contact)
      .input("FeasibilityTypeID", sql.Int, parseInt(req.body.feasibility_type_id))
      .input("IsActive", sql.Bit, req.body.isActive ?? true)
      .input("CreatedBy", sql.Int, req.body.user_id || 1)
      .execute("usp_Stores_Save");

    console.log("usp_Stores_Save ✅ => Success");

    res.status(200).send({
      status: 200,
      data: result.recordset ? result.recordset[0] : null,
      valid: true,
      message: "Store saved successfully"
    });

  } catch (err) {
    console.error("usp_Stores_Save ❌ => ", err.message);
    res.status(400).send({
      status: 400,
      message: err.message || "Database Error",
      valid: false
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
