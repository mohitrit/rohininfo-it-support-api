const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

//insert

exports.insertDyeingHouse = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("dyeing_house_id", req.body.dyeing_house_id)
          .input("dyeing_house_name", req.body.dyeing_house_name)
          .input("description", req.body.description)
          .input("user_id",req.user.user_id)
          .output("new_identity")
          .execute("settings_dyeing_house_insert");
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

//browse dyeing
exports.browseDyeing = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("search", req.body.filter_value)
          .execute("settings_dyeing_house_browse");
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

exports.disableDyeing = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("dyeing_house_id", req.body.dyeing_house_id)
          .input("disable", req.body.disable)
          .input("user_id",req.user.user_id)
          .execute("settings_dyeing_house_disable");
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
exports.DeleteDyeing = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("dyeing_house_id", req.body.dyeing_house_id)
          .input("user_id",req.user.user_id)
          .execute("settings_dyeing_house_delete");
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

exports.previewDyeing = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("dyeing_house_id", req.body.dyeing_house_id)
          .execute("settings_dyeing_house_preview");
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