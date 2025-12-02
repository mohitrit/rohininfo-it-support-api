const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

//insert

exports.insertMill = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("mill_id", req.body.mill_id)
          .input("mill_name", req.body.mill_name)
          .input("description", req.body.description)
          .input("user_id",req.user.user_id)
          .output("new_identity")
          .execute("settings_mill_insert");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset,
          valid: true,
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

//delete fabric

exports.browseMill = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;

    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("search", req.body.filter_value)
          .execute("settings_mill_browse");
      })
      .then((result) => {
        const data =
          result.recordset.length > 0
            ? filterData(result.recordset, filter)
            : [];
        res.send({
          status: 200,
          data: data,
          valid: true,
          excelRecord: result.recordset,
          totalRecords: result.recordset.length,
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

// Disable

exports.disableMILL = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("mill_id", req.body.mill_id)
          .input("disable", req.body.disable)
          .input("user_id",req.user.user_id)
          .execute("settings_mill_disable");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
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

//delete
exports.DeleteMILL = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("mill_id", req.body.mill_id)
          .input("user_id",req.user.user_id)
          .execute("settings_mill_delete");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
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

// preview

exports.previewMill = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("mill_id", req.body.mill_id)
          .execute("settings_mill_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
          excelRecord: result.recordset,
          totalRecords: result.recordset.length,
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
