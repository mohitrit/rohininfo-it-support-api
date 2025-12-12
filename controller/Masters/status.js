const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_Status_Browse = asyncHandler(async (req, res) => {
    try {
        await sql
            .connect(config)
            .then((pool) => {
                return pool
                    .request()
                    .input("SearchTerm", req.body.filter_value)                    
                    .execute("usp_Status_Browse");
            })
            .then((result) => {
                console.log("usp_Status_Browse ✅✅ => ", result);
                res.send({
                    status: 200,
                    data: result.recordset,
                    valid: true,
                });
            })
            .catch((err) => {
                console.log("usp_Status_Browse ❌❌ => ", err);
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

// exports.usp_Status_Save = asyncHandler(async (req, res) => {
//     try {
//         await sql
//             .connect(config)
//             .then((pool) => {
//                 return pool
//                     .request()
//                     .input("StatusID", req.body.StatusID)
//                     .input("StatusName", req.body.StatusName)
//                     .input("StatusCode", req.body.StatusCode)
//                     .input("Description", req.body.Description)
//                     .input("IsActive", req.body.IsActive)
//                     .input("CreatedBy", req.body.CreatedBy)
//                     .execute("usp_Status_Save");
//             })
//             .then((result) => {
//                 console.log("usp_Status_Save ✅✅ => ", result);
//                 res.send({
//                     status: 200,
//                     data: result.recordset[0],
//                     valid: true,
//                 });
//             })
//             .catch((err) => {
//                 console.log("usp_Status_Save ❌❌ => ", err);
//                 res.send({
//                     status: 400,
//                     message: err,
//                 });
//             });
//     } catch (error) {
//         res.status(500).send({
//             status: 500,
//             message: error,
//         });
//     }
// });

exports.usp_Status_Save = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
                return pool
				 .request()
                     .input("StatusID", req.body.status_id)
                     .input("StatusName", req.body.status_name)
                     .input("StatusCode", req.body.status_code)
                     .input("Description", req.body.description)
                     .input("IsActive", req.body.isActive)                     
                     .execute("usp_Status_Save");
             })
			.then((result) => {
				console.log("usp_Status_Save ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset[0],
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_Status_Save ❌❌ => ", err);
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


exports.usp_Status_Preview = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StatusID", req.body.status_id)
          .execute("usp_Status_Preview");
      })
      .then((result) => {
        console.log("usp_Status_Preview ✅✅ => ", result);
        res.send({
          status: 200,
          data: result.recordset[0],
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Status_Preview ❌❌ => ", err);
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

exports.usp_Status_Delete = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("StatusID", req.body.status_id)
          .execute("usp_Status_Delete");
      })
      .then((result) => {
        console.log("usp_Status_Delete ✅✅ => ", result);
        res.send({
          status: 200,
          message: "Status deleted successfully",
          valid: true,
        });
      })
      .catch((err) => {
        console.log("usp_Status_Delete ❌❌ => ", err);
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
