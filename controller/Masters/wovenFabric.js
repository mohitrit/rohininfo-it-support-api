const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

//insert
exports.wovenFabricInsert = asyncHandler(async (req, res) => {
  try {
    let wovenFabric = new sql.Table("dbo.Masters_woven_fabric_customer");
    wovenFabric.columns.add("customer_id", sql.Int);

    req.body.fabricWoven.forEach((item) => {
      if (item.customer_id) {
        wovenFabric.rows.add(item.customer_id);

      }
    });

    let wovenVender = new sql.Table("dbo.Masters_woven_fabric_vendors");
    wovenVender.columns.add("vendor_id", sql.Int);
    wovenVender.columns.add("vendor_code", sql.NVarChar(100));
    wovenVender.columns.add("mill", sql.NVarChar(100));
    wovenVender.columns.add("list_price", sql.Decimal(18, 2));
    req.body.venderWoven.forEach((item) => {
      if (item.vendor_id) {
        wovenVender.rows.add(item.vendor_id, item.vendor_code, item.mill_name, +item.list_price);
      }
    });

    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("woven_fabric_id", req.body.woven_fabric_id)
          .input("unique_id", req.body.unique_id)
          .input("fabric_name", req.body.fabric_name)
          .input("internal_code", req.body.internal_code)
          .input("uom", req.body.uom)
          .input("product_type", req.body.product_type)
          .input("fabric_category", req.body.fabric_category)
          .input("color", req.body.color)
          .input("color_id", req.body.color_id)
          .input("pantone", req.body.pantone)
          .input("fabric_weave", req.body.fabric_weave)
          .input("yarn_count_warp", req.body.yarn_count_warp)
          .input("yarn_count_warp_blend", req.body.yarn_count_warp_blend)
          .input("yarn_count_weft", req.body.yarn_count_weft)
          .input("yarn_count_weft_blend", req.body.yarn_count_weft_blend)
          .input("construction_warp", req.body.construction_warp)
          .input("construction_weft", req.body.construction_weft)
          .input("elastane_lycra", req.body.elastane_lycra)
          .input("overall_blend", req.body.overall_blend)
          .input("gsm", req.body.gsm)
          .input("width", req.body.width)
          .input("finish_name", req.body.finish_name)
          .input("develop_date", req.body.develop_date)
          .input("additional_information", req.body.additional_information)
          .input("attachment", req.body.attachment)
          .input("price", req.body.price)
          .input("Masters_woven_fabric_customer", sql.TVP, wovenFabric)
          .input("Masters_woven_fabric_vendors", sql.TVP, wovenVender)
          .input("user_id", req.user.user_id)
          .output("new_identity")
          .execute("Masters_woven_fabric_insert");
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
  } catch (err) {
    
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
});

//upload 
exports.uploadWovenFabric = asyncHandler(async (req, res) => {
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

//browse
exports.browseWovenFabric = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)
          .input("search", req.body.filter_value)
          .input("unique_id", req.body.unique_id)
          .input("fabric_name", req.body.fabric_name)
          .input("internal_code", req.body.internal_code)
          .input("color", req.body.color)
          .execute("Masters_woven_fabric_browse");
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

//delete
exports.DeleteWovenFabric = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("woven_fabric_id", req.body.woven_fabric_id)
          .execute("Masters_woven_fabric_delete");
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
// test api 
// preview
exports.previewWovenFabric = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("woven_fabric_id", req.body.woven_fabric_id)
          .execute("Masters_woven_fabric_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          attachement: result.recordsets[1],
          contact_person: result.recordsets[2],
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
