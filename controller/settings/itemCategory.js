const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");



exports.insertItemCategory = asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("accessories_category_id", req.body.accessories_category_id)
            .input("accessories_category", req.body.accessories_category)
            .input("description", req.body.description)
            .input("user_id",req.user.user_id)
            .output("new_identity")
            .execute("settings_accessories_category_insert");
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



  exports.browseItemCategory = asyncHandler(async (req, res) => {
    try {
      const filter = req.query;
  
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("search", req.body.filter_value)
            .execute("settings_accessories_category_browse");
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

exports.previewItemCategory = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("accessories_category_id", req.body.accessories_category_id)
          .execute("settings_accessories_category_preview");
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

exports.deleteItemCategory = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("accessories_category_id", req.body.accessories_category_id)
          .input("user_id",req.user.user_id)
          .execute("settings_accessories_category_delete");
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

exports.disableItemCategory = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("accessories_category_id", req.body.accessories_category_id)
          .input("disable", req.body.disable)
          .input("user_id",req.user.user_id)
          .execute("setting_accessories_category_disable");
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