
const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

const { filterData } = require("../filter");

// insert of BOM 
exports.insertBOM = asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("bom_charges_id", req.body.bom_charges_id)
            .input("bom_charges", req.body.bom_charges)
            .input("description", req.body.description)
            .input("user_id",req.user.user_id)
            .output("new_identity")
            .execute("settings_bom_charges_insert");
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

//   preview of Bom 
exports.previewBOM = asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("bom_charges_id", req.body.bom_charges_id)
            .execute("settings_bom_charges_preview");
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


  // browse of BOM
  exports.browseBOM = asyncHandler(async (req, res) => {
    try {
      const filter = req.query;
  
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("search", req.body.filter_value)
            .execute("settings_bom_charges_browse");
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

  // delete of BOM

  exports.DeleteBOM = asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("bom_charges_id", req.body.bom_charges_id)
            .input("user_id",req.user.user_id)
            .execute("settings_bom_charges_delete");
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

//   disable of BOM 
exports.disableBOM = asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("bom_charges_id", req.body.bom_charges_id)
            .input("disable", req.body.disable)
            .input("user_id",req.user.user_id)
            .execute("settings_bom_charges_disable");
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