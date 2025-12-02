const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const { max } = require("moment");

//insert FabricTrim 
exports.FabricTrimInsert = asyncHandler(async (req, res) => {
  try {

    const FabricTrimCustomer = new sql.Table("dbo.Masters_fabric_trim_customer");

    FabricTrimCustomer.columns.add("customer_id", sql.Int);
    req.body.FabricTrimCustomers.forEach((item) => {
      if(item.customer_id){
      FabricTrimCustomer.rows.add(item.customer_id);
      }
    });

    let FabricTrimVender = new sql.Table("dbo.Masters_fabric_trim_vendor");

    FabricTrimVender.columns.add("vendor_id", sql.Int);
    FabricTrimVender.columns.add("mill", sql.NVarChar(100));
    FabricTrimVender.columns.add("list_price", sql.Decimal(18, 2));

    req.body.FabricTrimVender.forEach((item) => {
      FabricTrimVender.rows.add(
        item.vendor_id,
        item.mill,
        +item.list_price);
    });
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("fabric_trim_id", req.body.fabric_trim_id)
          .input("unique_id", req.body.unique_id)
          .input("fabric_name", req.body.fabric_name)
          .input("uom", req.body.uom)
          .input("internal_code", req.body.internal_code)
          .input("color", req.body.color)
          .input("blend", req.body.blend)
          .input("gsm", req.body.gsm)
          .input("width", req.body.width)
          .input("develop_date", req.body.develop_date)
          .input("additional_information", req.body.additional_information)
          .input("attachment", req.body.attachment)
          .input("price", req.body.price)
          .input("Masters_fabric_trim_customer", sql.TVP, FabricTrimCustomer)
          .input("Masters_fabric_trim_vendor", sql.TVP, FabricTrimVender)
          .input("user_id", req.user.user_id)
          .output("new_identity")
          .execute("Masters_fabric_trim_insert");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
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




//browse FabricTrim
exports.browseFabricTrims = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("Masters_fabric_trim_browse");
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

//delete FabricTrim
exports.DeleteFabricTrims = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("fabric_trim_id", req.body.fabric_trim_id)
          .execute("Masters_fabric_trim_delete");
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

exports.previewFabricTrims = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("fabric_trim_id", req.body.fabric_trim_id)
          .execute("Masters_fabric_trim_preview");
      })
      .then((result) => {
        const obj = { ...result.recordsets[0][0] };
        obj.FabricTrimCustomers = result.recordsets[1];
        obj.FabricTrimVender = result.recordsets[2],
          res.send({
            status: 200,
            valid: true,
            data: obj,
            // excelRecord: result.recordset,
            // totalRecords: result.recordset.length,
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


//fabric 

exports.uploadFabricTrim = asyncHandler(async (req, res) => {
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
