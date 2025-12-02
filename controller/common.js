const sql = require("mssql");
const asyncHandler = require("express-async-handler");
const { config } = require("../config/config");

exports.AutoGenerateCommonApi = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .execute(req.query.sp);
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          valid: true,
          id:result.recordset[0].id,
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
exports.AutoGenerateCommonApiByID = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id",req.user.user_id)
          .execute(req.query.sp);
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          valid: true,
          id:result.recordset[0].id,
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
