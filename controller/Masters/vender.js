const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

//insert

exports.VendersInsert = asyncHandler(async (req, res) => {
  try {
    let VenderContact = new sql.Table("dbo.masters_vendor_contact_person");

    VenderContact.columns.add("contact_person", sql.VarChar(50));
    VenderContact.columns.add("mobile", sql.VarChar(50));
    VenderContact.columns.add("mobile1", sql.VarChar(50));
    VenderContact.columns.add("email", sql.VarChar(50));
    VenderContact.columns.add("email1", sql.VarChar(50));
    VenderContact.columns.add("department", sql.VarChar(50));
    VenderContact.columns.add("designation", sql.VarChar(50));
    req.body.VenderDetail.forEach((item) => {
      VenderContact.rows.add(
        item.contact_person,
        item.mobile,
        item.mobile1,
        item.email,
        item.email1,
        item.department,
        item.designation
      );
    });

    let AttachmentVender = new sql.Table("dbo.masters_vendor_attachment");

    AttachmentVender.columns.add("attachment_path", sql.NVarChar(sql.MAX));

    req.body.attachmentData.forEach((item) => {
      AttachmentVender.rows.add(item.path);
    });

    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("vendor_id", req.body.vendor_id)
          .input("vendor_code", req.body.vendor_code)
          .input("company_name", req.body.company_name)
          .input("display_name", req.body.display_name)
          .input("address", req.body.address)
          .input("google_map", req.body.google_map)
          .input("landmark", req.body.landmark)
          .input("pincode", req.body.pincode)
          .input("city", req.body.city)
          .input("state_code", req.body.state_code)
          .input("state", req.body.state)
          .input("country", req.body.country)
          .input("landline", req.body.landline)
          .input("pan", req.body.pan)
          .input("gstin", req.body.gstin)
          .input("tan", req.body.tan)
          .input("msme_no", req.body.msme_no)
          .input("msme_type", req.body.msme_type)
          .input("msme_status", req.body.msme_status)
          .input("bank_name", req.body.bank_name)
          .input("bank_branch", req.body.bank_branch)
          .input("ifsc", req.body.ifsc)
          .input("account_no", req.body.account_no)
          .input("payment_terms", req.body.payment_terms)
          .input("additional_information", req.body.additional_information)
          .input("masters_vendor_attachment", sql.TVP, AttachmentVender)
          .input("masters_vendor_contact_person", sql.TVP, VenderContact)
          .input("branch_id", req.body.branch_id)
          .input("user_id", req.user.user_id)
          .output("new_identity")

          .execute("masters_vendor_insert");
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

//browse dyeing
exports.browseVenders = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)

          .input("search", req.body.filter_value)
          .execute("Masters_vendor_browse");
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
//delete
exports.DeleteVenders = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("vendor_id", req.body.vendor_id)
          .execute("Masters_vendor_delete");
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

exports.previewVenders = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("vendor_id", req.body.vendor_id)
          .execute("Masters_vendor_preview");
      })
      .then((result) => {
        const obj = { ...result.recordsets[0][0] };
        obj.attachmentData = result.recordsets[1];
        obj.VenderDetail = result.recordsets[2],
          res.send({
            status: 200,
            valid: true,
            data: obj,
            // attachement: result.recordsets[1],
            // contact_person: result.recordsets[2],
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




exports.uploadVender = asyncHandler(async (req, res) => {
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