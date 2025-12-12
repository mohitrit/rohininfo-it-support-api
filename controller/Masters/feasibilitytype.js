const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_FeasibilityType_Browse = asyncHandler(async (req, res) => {
    try {
        await sql
            .connect(config)
            .then((pool) => {
                return pool
                    .request()
                    .input("SearchTerm", req.body.filter_value)                    
                    .execute("usp_FeasibilityType_Browse");
            })
            .then((result) => {
                console.log("usp_FeasibilityType_Browse ✅✅ => ", result);
                res.send({
                    status: 200,
                    data: result.recordset,
                    valid: true,
                });
            })
            .catch((err) => {
                console.log("usp_FeasibilityType_Browse ❌❌ => ", err);
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

exports.usp_FeasibilityType_Save = asyncHandler(async (req, res) => {
    try {
        await sql
            .connect(config)
            .then((pool) => {
                return pool
                    .request()
                    .input("FeasibilityTypeID", req.body.feasibility_type_id || 0)  
                    .input("TypeName", req.body.type_name)                       
                    .input("Description", req.body.description)                  
                    .input("IsActive", req.body.isActive)                       
                    .execute("usp_FeasibilityType_Save");
            })
            .then((result) => {
                console.log("usp_FeasibilityType_Save ✅✅ => ", result);
                res.send({
                    status: 200,
                    data: result.recordset[0],
                    valid: true,
                });
            })
            .catch((err) => {
                console.log("usp_FeasibilityType_Save ❌❌ => ", err);
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

exports.usp_FeasibilityType_Preview = asyncHandler(async (req, res) => {
    try {
        await sql
            .connect(config)
            .then((pool) => {
                return pool
                    .request()
                    .input("FeasibilityTypeID", req.body.feasibility_type_id)  
                    .execute("usp_FeasibilityType_Preview");
            })
            .then((result) => {
                console.log("usp_FeasibilityType_Preview ✅✅ => ", result);
                res.send({
                    status: 200,
                    data: result.recordset[0],
                    valid: true,
                });
            })
            .catch((err) => {
                console.log("usp_FeasibilityType_Preview ❌❌ => ", err);
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

exports.usp_FeasibilityType_Delete = asyncHandler(async (req, res) => {
    try {
        await sql
            .connect(config)
            .then((pool) => {
                return pool
                    .request()
                    .input("FeasibilityTypeID", req.body.feasibility_type_id)  
                    .execute("usp_FeasibilityType_Delete");
            })
            .then((result) => {
                console.log("usp_FeasibilityType_Delete ✅✅ => ", result);
                res.send({
                    status: 200,
                    message: "Feasibility Type deleted successfully",
                    valid: true,
                });
            })
            .catch((err) => {
                console.log("usp_FeasibilityType_Delete ❌❌ => ", err);
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
