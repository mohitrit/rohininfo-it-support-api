const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

//insert packaging
exports.PackagingInsert = asyncHandler(async (req, res) => {
  try {
    const packagingCustomer = new sql.Table("dbo.Masters_packaging_customer");

    packagingCustomer.columns.add("customer_id", sql.Int);
    req.body.packagingCustomer.forEach((item) => {
      if(item.customer_id){
        packagingCustomer.rows.add(item.customer_id);
      }
    });

    let packagingVendor = new sql.Table("dbo.Masters_packaging_vendor");

    packagingVendor.columns.add("vendor_id", sql.Int);
    packagingVendor.columns.add("list_price", sql.Decimal(18, 2));

    req.body.packagingVendor.forEach((item) => {
      if(item.vendor_id){
        packagingVendor.rows.add(
          item.vendor_id,
          +item.list_price);
      }
 
    });

    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("packaging_id", req.body.Packaging_id)
          .input("unique_id", req.body.unique_id)
          .input("item_name", req.body.item_name)
          .input("uom", req.body.uom)
          .input("internal_code", req.body.internal_code)
          .input("product_usage", req.body.product_usage)
          .input("make_brand", req.body.make_brand)
          .input("color", req.body.color)
          .input("ply", req.body.ply)
          .input("gsm", req.body.gsm)
          .input("other_specification", req.body.other_specification)
          .input("dim_l", req.body.dim_l)
          .input("dim_b", req.body.dim_b)
          .input("dim_h", req.body.dim_h)
          .input("develop_date", req.body.develop_date)
          .input("price", req.body.price)
          .input("additional_information", req.body.additional_information)
          .input("attachment", req.body.attachment)
          .input("Masters_packaging_customer", sql.TVP, packagingCustomer)
          .input("Masters_packaging_vendor", sql.TVP, packagingVendor)
          .input("user_id", req.user.user_id)
          .output("new_identity")
          .execute("Masters_packaging_insert");
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

//browse packaging
exports.browsePackagings = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)
          .input("search", req.body.filter_value)
          .execute("Masters_Packaging_browse");
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

//delete packaging
exports.DeletePackagings = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("packaging_id", req.body.packaging_id)
          .execute("Masters_Packaging_delete");
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

exports.previewPackagings = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("packaging_id", req.body.packaging_id)
          .execute("Masters_packaging_preview");
      })
      .then((result) => {
        const obj = { ...result.recordsets[0][0] };
        obj.packagingCustomer = result.recordsets[1],
          obj.packagingVendor = result.recordsets[2];

        res.send({
          status: 200,
          data: obj,
          valid: true,
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

// upload files 

exports.uploadPackaging = asyncHandler(async (req, res) => {
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
