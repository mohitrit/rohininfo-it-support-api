const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");



exports.KnittedFabricInsert = asyncHandler(async (req, res) => {
  try {
    const knittedCustomer = new sql.Table(
      "dbo.Masters_knitted_fabric_customer"
    );

    knittedCustomer.columns.add("customer_id", sql.Int);
    req.body.knittedCustomerFabric.forEach((item) => {
      if (item.customer_id) {
        knittedCustomer.rows.add(
          item.customer_id);
      }
    });

    let knittedFabric = new sql.Table("dbo.Masters_knitted_fabric_vendors");

    knittedFabric.columns.add("vendor_id", sql.Int);
    knittedFabric.columns.add("vendor_code", sql.VarChar(50));
    knittedFabric.columns.add("mill", sql.VarChar(50));
    knittedFabric.columns.add("list_price", sql.Decimal(18, 2));

    req.body.Fabric.forEach((item) => {
      if (item.vendor_id) {
        knittedFabric.rows.add(
          item.vendor_id,
          item.vendor_code,
          item.mill,
          +item.list_price);
      }

    });

    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("knitted_fabric_id", req.body.knitted_fabric_id)
          .input("unique_id", req.body.unique_id)
          .input("fabric_name", req.body.fabric_name)
          .input("uom", req.body.uom)
          .input("internal_code", req.body.internal_code)
          .input("dyeing_house", req.body.dyeing_house)
          .input("yarn_count_warp", req.body.yarn_count_warp)
          .input("yarn_count", req.body.yarn_count)
          .input("blend", req.body.blend)
          .input("gsm", req.body.gsm)
          .input("stitch_length", req.body.stitch_length)
          .input("width", req.body.width)
          .input("width_type", req.body.width_type)
          .input("color", req.body.color)
          .input("color_id", req.body.color_id)
          .input("pantone", req.body.pantone)
          .input("knitted_type", req.body.knitted_type)
          .input("trim_type", req.body.trim_type)
          .input("machine_guage", req.body.machine_guage)
          .input("finish_name", req.body.finish_name)
          .input("develop_date", req.body.develop_date)
          .input("additional_information", req.body.additional_information)
          .input("attachment", req.body.attachment)
          .input("price", req.body.price)
          .input("Masters_knitted_fabric_customer", sql.TVP, knittedCustomer)
          .input("Masters_knitted_fabric_vendors", sql.TVP, knittedFabric)
          .input("user_id", req.user.user_id)
          .output("new_identity")

          .execute("Masters_knitted_fabric_insert");
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

//browse
exports.browseKnittedFabric = asyncHandler(async (req, res) => {
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
          .execute("Masters_knitted_fabric_browse");
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
exports.DeleteKnittedFabric = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("knitted_fabric_id", req.body.knitted_fabric_id)
          .execute("Masters_knitted_fabric_delete");
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

exports.previewKnittedFabric = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("knitted_fabric_id", req.body.knitted_fabric_id)
          .execute("Masters_knitted_fabric_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          knittedCustomerFabric: result.recordsets[1],
          Fabric: result.recordsets[2],
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



//upload

exports.uploadKnittedFabric = asyncHandler(async (req, res) => {
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

///test