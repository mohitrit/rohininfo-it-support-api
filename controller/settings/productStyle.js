const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

//insert

exports.insertProductStyle = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("style_id", req.body.style_id)
          .input("product_usage_id", req.body.product_usage_id)
          .input("prefix", req.body.prefix)
          .input("style", req.body.style)
          .input("description", req.body.description)
          .input("size_chart", req.body.size_chart)
          .input("user_id",req.user.user_id)
          .output("new_identity")
          .execute("settings_product_style_insert");
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


exports.uploadSizeChartProfile = asyncHandler(async (req, res) => {
  try {
    res.send({
      status: 200,
      data: req.file,
      valid: true,
    });
  } catch (error) {
    
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
});

//delete fabric

exports.browseProductStyle = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;

    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("search", req.body.filter_value)
          .execute("settings_product_style_browse");
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

// exports.disableProductUasage = asyncHandler(async (req, res) => {
//   try {
//     await sql
//       .connect(config)
//       .then((pool) => {
//         return pool
//           .request()
//           .input("product_usage_id", req.body.product_usage_id)
//           .input("disable", req.body.disable)
//           .input("user_id", getUserID())
//           .execute("settings_product_usage_disable");
//       })
//       .then((result) => {
//         res.send({
//           status: 200,
//           valid: true,
//         });
//       })
//       .catch((err) => {
//         
//         res.send({
//           status: 400,
//           message: err,
//         });
//       });
//   } catch (error) {
//     
//     res.status(500).send({
//       status: 500,
//       message: error,
//     });
//   }
// });

//delete
exports.DeleteProductStyle = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("style_id", req.body.style_id)
          .input("user_id", req.user.user_id)
          .execute("settings_product_style_delete");
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

exports.previewProductStyle = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("style_id", req.body.style_id)
          .execute("settings_product_style_preview");
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
