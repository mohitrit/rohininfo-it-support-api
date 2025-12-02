const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");




//?insert of rgp 
exports.insertRGP = asyncHandler(async (req, res) => {
  try {
    let RGPDetails = new sql.Table("dbo.transaction_rgp_details");
    // RGPDetails.columns.add("mtran_id", sql.Int);
    RGPDetails.columns.add("qr_ref_id", sql.Int);
    RGPDetails.columns.add("qr_code", sql.NVarChar(100));
    RGPDetails.columns.add("qty", sql.Int);
    RGPDetails.columns.add("rate", sql.Decimal(18, 2));
    RGPDetails.columns.add("amount", sql.Decimal(18, 2));
    req.body.RGPDetails.forEach((item) => {
      RGPDetails.rows.add(
        // item.mtran_id,
        item.tran_id,
        item.qr_code,
        item.qty,
        item.rate,
        item.amount,
      );
    });
    await sql
      .connect(config)
      .then((pool) => {
        return (
          pool
            .request()
            .input("tran_id", req.body.tran_id)
            .input("rgp_no", req.body.rgp_no)
            .input("date", req.body.date)
            .input("customer_id", req.body.customer_id)
            .input("contact_person_id", req.body.contact_person_id)
            .input("dispatch_through", req.body.dispatch_through)
            .input("sample_type", req.body.sample_type)
            .input("representative_id", req.body.representative_id)
            .input("remarks", req.body.remarks)
            .input("refundable_deposit", req.body.refundable_deposit)
            .input("transaction_rgp_details", sql.TVP, RGPDetails)
            .input("branch_id", req.body.branch_id)
            // .input("branch_id", req.body.branch_id)
            .input("user_id", req.user.user_id)
            // .input("user_id", 15)
            .output("new_identity")
            .execute("transaction_rgp_insert")
        );
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
      message: err.message,
    });
  }
});

// !pick qr code in rgp 
exports.RgpQRPick = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          // .input("tran_id", req.body.tran_id)
          .execute("pick_qr_in_rgp");
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

//  ? browse of rgp 
exports.browseRGP = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("transaction_rgp_browse");
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

// ! list of contact person 
exports.listContactPerson = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("customer_id", req.body.customer_id)
          .execute("list_contact_person");
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

//? delete api fro rgp 
exports.DeleteRGP = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_rgp_delete");
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

//! preview of RGP 
exports.previewRGP = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_rgp_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          RGPDetails: result.recordsets[1],
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

//? print api of rgp 
exports.RGPPrint = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_rgp_print");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordsets[0][0],
          RGPDetails: result.recordsets[1],
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