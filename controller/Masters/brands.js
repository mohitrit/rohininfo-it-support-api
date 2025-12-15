const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_Brand_Browse = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("SearchTerm", req.body.filter_value)
          .execute("usp_Brand_Browse");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset,
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Brand_Browse ❌❌ => ", err);
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

exports.usp_Brand_Save = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("BrandID", req.body.brand_id)
          .input("BrandName", req.body.brand_name)
          .input("BrandCode", req.body.brand_code)
          .input("Description", req.body.description)
          .input("IsActive", req.body.isActive)
          .execute("usp_Brand_Save");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Brand_Save ❌❌ => ", err);
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

exports.usp_Brand_Preview = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("BrandID", req.body.brand_id)
          .execute("usp_Brand_Preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Brand_Preview ❌❌ => ", err);
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

exports.usp_Brand_Delete = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("BrandID", req.body.brand_id)
          .execute("usp_Brand_Delete");
      })
      .then((result) => {
        console.log("usp_Brand_Delete ✅✅ => ", result);
        res.send({
          status: 200,
          message: "Brand deleted successfully",
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Brand_Delete ❌❌ => ", err);
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
