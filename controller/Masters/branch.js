const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const { max } = require("moment");

//insert packaging
exports.insertBranch = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("branch_id", req.body.branch_id)
          .input("branch_code", req.body.branch_code)
          .input("prefix", req.body.prefix)
          .input("address", req.body.address)
          .input("pincode", req.body.pincode)
          .input("city", req.body.city)
          .input("state", req.body.state)
          .input("state_code", req.body.state_code)
          .input("country", req.body.country)
          .input("landline", req.body.landline)
          .input("pan", req.body.pan)
          .input("authorised_signatory", req.body.authorised_signatory)
          .input("gstin", req.body.gstin)
          .input("mobile", req.body.mobile)
          .input("email", req.body.email)
          .input("user_id", req.user.user_id)
          .output("new_identity")
          .execute("Masters_branch_insert");
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

//browse
exports.browseBranch = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.body.user_id)

          .input("search", req.body.filter_value)
          .execute("Masters_branch_browse");
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

exports.disableBranch = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()

          .input("disable", req.body.disable)
          .input("branch_id", req.user.user_id)
          .execute("Masters_branch_disable");
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

//delete
exports.deleteBranch = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("branch_id", req.body.branch_id)
          .execute("Masters_branch_delete");
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

exports.previewBranch = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("Branch_id", req.body.branch_id)
          .execute("Masters_branch_preview");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset[0],
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

// user filter of branch //
exports.UpdateUserFilter = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id",req.user.user_id)
          .input("from_date", req.body.from_date)
          .input("to_date", req.body.to_date)
          .input("branch_id", req.body.branch_id)
          .execute("update_user_filter");
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

// get user filter 

exports.getUserFilter = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id",req.user.user_id)
          .execute("get_user_filter");
      })
      .then((result) => {
        res.send({
          status: 200,
          data: result.recordset[0],
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

// list branch 
exports.listBranch = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("search", req.body.filter_value)
          .execute("list_branch");
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
exports.listUpdatedbranch = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .execute("list_branch_user");
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