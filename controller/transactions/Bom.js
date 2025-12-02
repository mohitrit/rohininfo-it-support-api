const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

//insert of bom 

exports.insertBom = asyncHandler(async (req, res) => {
  try {
    let BomAccessories = new sql.Table("dbo.transaction_bom_accessories");
    BomAccessories.columns.add("accessories_id", sql.Int);
    BomAccessories.columns.add("qty", sql.Decimal(18, 2));
    BomAccessories.columns.add("rate", sql.Decimal(18, 2));
    BomAccessories.columns.add("amount", sql.Decimal(18, 2));
    BomAccessories.columns.add("remarks", sql.NVarChar(sql.MAX));
    req.body.BomAccessories.forEach((item) => {
      BomAccessories.rows.add(
        item.tran_id,
        item.qty,
        item.price,
        item.amount,
        item.remarks,
      );
    });

    let BomPackaging = new sql.Table("dbo.transaction_bom_packaging");
    BomPackaging.columns.add("packaging_id", sql.Int);
    BomPackaging.columns.add("qty", sql.Decimal(18, 2));
    BomPackaging.columns.add("rate", sql.Decimal(18, 2));
    BomPackaging.columns.add("amount", sql.Decimal(18, 2));
    req.body.BomPackaging.forEach((item) => {
      BomPackaging.rows.add(
        item.packaging_id,
        item.qty,
        item.price,
        item.amount
      );
    });

    // let BomFabricDetails = new sql.Table("dbo.transaction_bom_fabric");
    // BomFabricDetails.columns.add("fabric_id", sql.Int);
    // BomFabricDetails.columns.add("type", sql.NVarChar(50));
    // BomFabricDetails.columns.add("qty", sql.Decimal(18, 3));
    // BomFabricDetails.columns.add("rate", sql.Decimal(18, 2));
    // BomFabricDetails.columns.add("amount", sql.Decimal(18, 2));
    // req.body.BomFabricDetails.forEach((item) => {
    //   BomFabricDetails.rows.add(
    //     item.fabric_id,
    //     item.fabric_type,
    //     item.qty,
    //     item.price,
    //     item.amount,
    //   );
    // });

    let BomFabric = new sql.Table("dbo.transaction_bom_fabric");
    BomFabric.columns.add("fabric_id", sql.Int);
    BomFabric.columns.add("type", sql.NVarChar(50));
    BomFabric.columns.add("qty", sql.Decimal(18, 3));
    BomFabric.columns.add("rate", sql.Decimal(18, 2));
    BomFabric.columns.add("amount", sql.Decimal(18, 2));
    req.body.BomFabric.forEach((item) => {
      BomFabric.rows.add(
        item.fabric_id,
        item.fabric_type,
        item.qty,
        item.price,
        item.amount,
      )
    });
    let BomFabricTrim = new sql.Table("dbo.transaction_bom_fabric_trim");
    BomFabricTrim.columns.add("fabric_trim_id", sql.Int);
    BomFabricTrim.columns.add("qty", sql.Decimal(18, 2));
    BomFabricTrim.columns.add("rate", sql.Decimal(18, 2));
    BomFabricTrim.columns.add("amount", sql.Decimal(18, 2));
    req.body.BomFabricTrim.forEach((item) => {
      BomFabricTrim.rows.add(
        item.fabric_trim_id,
        item.qty,
        item.price,
        item.amount
      );
    });
    let BomCharges = new sql.Table("dbo.transaction_bom_charges");
    BomCharges.columns.add("bom_charges_id", sql.Int);
    BomCharges.columns.add("amount", sql.Decimal(18, 2));
    BomCharges.columns.add("remarks", sql.NVarChar(sql.MAX))
    req.body.BomCharges.forEach((item) => {
      if (item.bom_charges_id) {
        BomCharges.rows.add(
          item.bom_charges_id,
          item.amount,
          item.remarks
        );
      }
    });
    let BomContrast = new sql.Table("transaction_bom_contrast");
    BomContrast.columns.add("contrast_fabric_id", sql.Int);
    BomContrast.columns.add("contrast_fabric", sql.NVarChar(100));
    BomContrast.columns.add("color_id", sql.Int);
    BomContrast.columns.add("contrast_color", sql.NVarChar(100));
    BomContrast.columns.add("fabric_type", sql.NVarChar(100));
    BomContrast.columns.add("qty", sql.Decimal(18, 2));
    BomContrast.columns.add("rate", sql.Decimal(18, 2));
    BomContrast.columns.add("amount", sql.Decimal(18, 2));
    req.body.BomContrast.forEach((item) => {
      BomContrast.rows.add(
        item.contrast_fabric_id,
        item.contrast_fabric,
        item.color_id,
        item.color,
        item.fabric_type,
        item.qty,
        item.price,
        item.amount,
      );
    });
    let BomBrandingData = new sql.Table("transaction_bom_branding");
    BomBrandingData.columns.add("branding_space", sql.NVarChar(100));
    BomBrandingData.columns.add("branding_technique", sql.NVarChar(100));
    BomBrandingData.columns.add("branding_type", sql.NVarChar(100));
    BomBrandingData.columns.add("size", sql.NVarChar(100));
    BomBrandingData.columns.add("color", sql.NVarChar(100));
    BomBrandingData.columns.add("remarks", sql.NVarChar(sql.MAX));
    BomBrandingData.columns.add("qty", sql.Decimal(18, 3));
    BomBrandingData.columns.add("rate", sql.Decimal(18, 2));
    BomBrandingData.columns.add("amount", sql.Decimal(18, 2));
    req.body.BomBrandingData.forEach((item) => {
      BomBrandingData.rows.add(
        item.branding_space,
        item.branding_technique,
        item.branding_type,
        item.size,
        item.color,
        item.remarks,
        item.qty,
        item.rate,
        item.amount
      );
    });
    await sql
      .connect(config)
      .then((pool) => {
        const rejectionPer = parseFloat(req.body.rejection_per)
        const rejectionAmt = parseFloat(req.body.rejection_amt)
        const totalAmt = parseFloat(req.body.total_amt)
        const marginPer = parseFloat(req.body.margin_per)
        const marginAmt = parseFloat(req.body.margin_amt)
        const marketingPer = parseFloat(req.body.marketing_per)
        const marketingAmt = parseFloat(req.body.marketing_amt)
        const markupPer = parseFloat(req.body.markup_per)
        const markupAmt = parseFloat(req.body.markup_amt)
        const markdownPer = parseFloat(req.body.markdown_per)
        const markdownAmt = parseFloat(req.body.markdown_amt)
        const markupTotal = parseFloat(req.body.markup_total)
        const markdownTotal = parseFloat(req.body.markdown_total)


        return pool
          .request()
          .input("bom_id", req.body.bom_id)
          .input("riv", req.body.riv_bom)
          .input("customer_id", req.body.customer_id)
          .input("srf_id", req.body.srf_id)
          .input("bom_no", req.body.bom_no)
          .input("date", req.body.date)
          .input("remarks", req.body.remarks)
          .input("rejection_per", rejectionPer)
          .input("rejection_amt", rejectionAmt)
          .input("total_amt", totalAmt)
          .input("margin_per", marginPer)
          .input("margin_amt", marginAmt)
          .input("marketing_per", marketingPer)
          .input("marketing_amt", marketingAmt)
          .input("markup_per", markupPer)
          .input("markup_amt", markupAmt)
          .input("markdown_per", markdownPer)
          .input("markdown_amt", markdownAmt)
          .input("markup_total", markupTotal)
          .input("markdown_total", markdownTotal)
          .input("transaction_bom_accessories", sql.TVP, BomAccessories)
          .input("transaction_bom_packaging", sql.TVP, BomPackaging)
          .input("transaction_bom_fabric", sql.TVP, BomFabric)
          .input("transaction_bom_fabric_trim", sql.TVP, BomFabricTrim)
          .input("transaction_bom_charges", sql.TVP, BomCharges)
          .input("transaction_bom_contrast", sql.TVP, BomContrast)
          .input("transaction_bom_branding", sql.TVP, BomBrandingData)
          .input("branch_id", req.body.branch_id)
          // .input("user_id", 0)
          .input("user_id", req.user.user_id)
          .output("new_identity")
          .execute("transaction_bom_insert");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.output.new_identity,
          // data: result
          // data: result.recordsets[0],//
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

exports.BomSrfPick = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          // .input("user_id", req.user.user_id)
          // .input("user_id", 15)
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("pick_srf_main_in_bom");
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

//? list of bom charges 
exports.listBomCharges = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("search", req.body.filter_value)
          .execute("list_bom_charges");
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

//! bom pick srf details // 
exports.PickSrfDetailsBom = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("srf_id", req.body.srf_id)
          .execute("pick_srf_details_in_bom");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordsets[0],
          accessory: result.recordsets[1],
          packaging: result.recordsets[2],
          fabricTrim: result.recordsets[3],
          contrast: result.recordsets[4],
          branding: result.recordsets[5],
          fabric: result.recordsets[6],
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

//?bom preview for  bom form
exports.previewBom = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("bom_id", req.body.bom_id)
          .execute("transaction_bom_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          BomAccessories: result.recordsets[1],
          BomPackaging: result.recordsets[2],
          BomFabric: result.recordsets[3],
          BomFabricTrim: result.recordsets[4],
          BomCharges: result.recordsets[5],
          BomContrast: result.recordsets[6],
          BomBranding: result.recordsets[7],
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
//! bom browse 
exports.browseBom = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .input("customer", "")
          .input("product", "")
          // .input("customer", req.body.customer)
          // .input("product", req.body.product)
          .execute("transaction_bom_browse");
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

//! delete api for bom 
exports.DeleteBom = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("bom_id", req.body.bom_id)
          .execute("transaction_bom_delete");
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

//? list of fabric knitted and woven 
exports.listKnittedWovenFabric = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("search", req.body.filter_value)
          .execute("list_fabric_in_bom");
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

//! print api of Bom 
exports.BomPrint = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request()
          .input("bom_id", req.body.bom_id)
          .execute("transaction_bom_print");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordsets[0][0],
          BomAccessories: result.recordsets[1],
          BomPackaging: result.recordsets[2],
          fabric: result.recordsets[3],
          BomFabricTrim: result.recordsets[4],
          BomCharges: result.recordsets[5],
          contrast: result.recordsets[6],
          BomBranding: result.recordsets[7],
          BomAttachment: result.recordsets[8],
          Graph: result.recordsets[9],
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

//todo Attachment of bom (insert)
exports.BomAttachmentInsert = asyncHandler(async (req, res) => {
  try {
    if (req.files.length === -1) {
      res.send({
        status: 202,
        message: "Record Not Found",
      })
    }
    let BomAttach = new sql.Table("dbo.bom_attachment");
    BomAttach.columns.add("attachment_path", sql.NVarChar(sql.MAX));
    req.files.forEach((item) => {
      BomAttach.rows.add(item.path);
    });
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("bom_id", req.body.bom_id)
          .input("bom_attachment", sql.TVP, BomAttach)
          .execute("transaction_bom_attachment_insert");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          valid: true,
          data: result.recordset
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

//? Attachment of Bom (Preview)
exports.attachmentBomPreview = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("bom_id", req.body.bom_id)
          .execute("transaction_bom_attachment_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordset,
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

//! Attachment Of Bom (Delete)
exports.DeleteAttchmentBom = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_bom_attachment_delete");
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