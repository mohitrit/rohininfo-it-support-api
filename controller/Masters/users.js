const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const { max } = require("moment");

//!insert user
exports.UserInsert = asyncHandler(async (req, res) => {

  try {
    let UserRights = new sql.Table("user_right_branch");
    UserRights.columns.add("branch_id", sql.Int);
    req.body.UserRightsFData.forEach((item) => {
      UserRights.rows.add(
        item.branch_id,
      );
    }
    );
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)
          .input("emp_code", req.body.emp_code)
          .input("full_name", req.body.full_name)
          .input("mobile", req.body.mobile)
          .input("email", req.body.email)
          .input("department", req.body.department)
          .input("designation", req.body.designation)
          .input("image_path", req.body.image_path)
          .input("role_id", req.body.role_id)
          .input("add_user_id", req.user.user_id)
          .input("user_right_branch", sql.TVP, UserRights)
          .output("new_identity")
          .execute("Masters_user_insert");
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

//!browse of packaging
exports.browseUser = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)

          .input("search", req.body.filter_value)
          .execute("Masters_user_browse");
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
//! disable user 
exports.disableUser = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()

          .input("user_id", req.body.user_id)
          .input("disable", req.body.disable)
          .execute("Masters_user_disable");
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

//!delete of packaging
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)
          .execute("Masters_user_delete");
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

//! preview of Packaging
exports.previewUser = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)
          .execute("Masters_user_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordsets[0][0],
          userRight: result.recordsets[1],
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

//! upload of user profile 
exports.uploadUserProfile = asyncHandler(async (req, res) => {
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

//! Preview of Attachment 
exports.attachmentProfile = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .execute("masters_user_profile_image_preview");
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