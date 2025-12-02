const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const { max } = require("moment");

//insert
exports.CustomersInsert = asyncHandler(async (req, res) => {
  try {
    let CustomerDetail = new sql.Table("dbo.Masters_Customer_contact_person");

    CustomerDetail.columns.add("contact_person", sql.VarChar(50));
    CustomerDetail.columns.add("mobile", sql.VarChar(50));
    CustomerDetail.columns.add("mobile1", sql.VarChar(50));
    CustomerDetail.columns.add("email", sql.VarChar(50));
    CustomerDetail.columns.add("email1", sql.VarChar(50));
    CustomerDetail.columns.add("department", sql.VarChar(50));
    CustomerDetail.columns.add("designation", sql.VarChar(50));
    req.body.CustomerDetails.forEach((item) => {
      CustomerDetail.rows.add(
        item.contact_person,
        item.mobile,
        item.mobile1,
        item.email,
        item.email1,
        item.department_name,
        item.designation_name
      );
    });

    let AttachmentPass = new sql.Table("dbo.Masters_Customer_attachment");
    AttachmentPass.columns.add("attachment_path", sql.NVarChar(sql.MAX));
    req.body.attachmentData.forEach((item) => {
      AttachmentPass.rows.add(item.path);
    });
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("customer_id", req.body.customer_id)
          .input("customer_code", req.body.customer_code)
          .input("prefix", req.body.prefix)
          .input("company_name",req.body.company_name)
          .input("display_name", req.body.display_name)
          .input("industry_type", req.body.industry_type)
          .input("google_map", req.body.google_map)
          .input("address", req.body.address)
          .input("landmark", req.body.landmark)
          .input("pincode", req.body.pincode)
          .input("city", req.body.city)
          .input("state_code", req.body.state_code)
          .input("state", req.body.state)
          .input("payment_terms", req.body.payment_terms)
          .input("country", req.body.country)
          .input("pan", req.body.pan)
          .input("gstin", req.body.gstin)
          .input("additional_information", req.body.additional_information)
          .input("branch_id", req.body.branch_id)
          .input("masters_customer_contact_person", sql.TVP, CustomerDetail)
          .input("masters_customer_attachment", sql.TVP, AttachmentPass)
          .input("user_id",req.user.user_id)
          .output("new_identity")
          .execute("masters_customer_insert");
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

exports.browseCustomers = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id",req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("Masters_customer_browse");
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
exports.DeleteCustomers = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("customer_id", req.body.customer_id)
          .execute("Masters_customer_delete");
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

exports.previewCustomers = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("customer_id", req.body.customer_id)
          .execute("Masters_customer_preview");
      })
      .then((result) => {
        const obj = { ...result.recordsets[0][0] };
        obj.attachmentData = result.recordsets[1];
        (obj.CustomerDetails = result.recordsets[2]),
          res.send({
            status: 200,
            data: obj,
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


//upload


exports.uploadCustomer = asyncHandler(async (req, res) => {
  try {
    res.send({
      status: 200,
      data: req.files,
      valid: req.files.length > 0 ? true : false,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
});