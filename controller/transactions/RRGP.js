const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

// pick rgp header from rgp 

exports.RGPPick = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("pick_rgp_in_rrgp");
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


//   pick of rgp items 

exports.RGPItemsPick = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          // .input("user_id", req.user.user_id)
          .input("tran_id", req.body.tran_id)
          .execute("pick_rgp_item_in_rrgp");
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


//   insert of RRGP 


exports.insertRRGP = asyncHandler(async (req, res) => {
  try {
    let RRGPDetails = new sql.Table("dbo.transaction_rrgp_details");
    // RRGPDetails.columns.add("mtran_id", sql.Int);
    RRGPDetails.columns.add("rrgp_tran_id", sql.Int);
    RRGPDetails.columns.add("qty", sql.Int);
    RRGPDetails.columns.add("rate", sql.Decimal(18, 2));
    RRGPDetails.columns.add("amount", sql.Decimal(18, 2));
    req.body.RRGPDetails.forEach((item) => {
      RRGPDetails.rows.add(
        // item.mtran_id,
        item.tran_id,
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
            .input("rrgp_no", req.body.rrgp_no)
            .input("date", req.body.date)
            .input("rgp_id", req.body.rgp_id)
            .input("customer_id", req.body.customer_id)
            .input("remarks", req.body.remarks)
            // .input("rgp_remarks", req.body.rgp_remarks)
            .input("transaction_rrgp_details", sql.TVP, RRGPDetails)
            .input("branch_id", req.body.branch_id)
            .input("user_id", req.user.user_id)
            // .input("user_id", 15)
            .output("new_identity")
            .execute("transaction_rrgp_insert")
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

// browse of RRGPDetails




exports.browseRRGP = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("transaction_rrgp_browse");
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

// delete Of RRGp 
exports.DeleteRRGP = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_rrgp_delete");
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

// preview of RRGP 
exports.previewRRGP = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_rrgp_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          RRGPDetails: result.recordsets[1],
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

// print of rrgp 


exports.RRGPPrint = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_rrgp_print");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordsets[0][0],
          RRGPDetails: result.recordsets[1],
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