const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_Vendor_Browse = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("SearchTerm", req.body.filter_value)
					.execute("usp_Vendor_Browse");
			})
			.then((result) => {
				console.log("usp_Vendor_Browse ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset,
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_Vendor_Browse ❌❌ => ", err);
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

exports.usp_Vendor_Save = asyncHandler(async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input("VendorID", sql.Int, Number(req.body.vendor_id) || 0)
            .input("VendorName", sql.VarChar, req.body.vendor_name)
            .input("ISPID", sql.Int, Number(req.body.ISPID) || null) 
            .input("ContactPerson", sql.VarChar, req.body.contact_person)
            .input("Mobile", sql.VarChar, req.body.mobile)
            .input("Email", sql.VarChar, req.body.email) // 🔥 Frontend se email aana chahiye
            .input("PinID", sql.Int, Number(req.body.pin_id) || null) // 🔥 Match frontend key
            .input("City", sql.VarChar, req.body.city)
            .input("State", sql.VarChar, req.body.state)
            .input("Address", sql.VarChar, req.body.address)
            .input("IsActive", sql.Bit, req.body.isActive)
            .execute("usp_Vendor_Save");

        console.log("usp_Vendor_Save ✅✅");
        res.send({
            status: 200,
            data: result.recordset[0],
            valid: true,
        });
    } catch (err) {
        console.log("usp_Vendor_Save ❌❌ => ", err);
        res.status(400).send({
            status: 400,
            message: err.message || "Database Error",
            valid: false
        });
    }
});
exports.usp_Vendor_Preview = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("VendorID", req.body.vendor_id)
					.execute("usp_Vendor_Preview");
			})
			.then((result) => {
				console.log("usp_Vendor_Preview ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset[0],
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_Vendor_Preview ❌❌ => ", err);
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

exports.usp_Vendor_Delete = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("VendorID", req.body.vendor_id)
					.execute("usp_Vendor_Delete");
			})
			.then((result) => {
				console.log("usp_Vendor_Delete ✅✅ => ", result);
				res.send({
					status: 200,
					message: "Brand deleted successfully",
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_Vendor_Delete ❌❌ => ", err);
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

exports.usp_list_ISP = asyncHandler(async (req, res) => {
    try {
        await sql
            .connect(config)
            .then((pool) => {
                return pool.request().execute("usp_list_ISP");
            })
            .then((result) => {
                console.log("usp_list_ISP ✅✅ => ", result.recordset.length, "items");               
              
                const ispList = result.recordset.map(item => ({
                    isp_id: item.ISPID || item.isp_id || item.ID,
                    isp_name: item.ISPName || item.isp_name || item.Name
                }));

                res.send({
                    status: 200,
                    data: ispList,  
                    valid: true,
                });
            })
            .catch((err) => {
                console.log("usp_list_ISP ❌❌ => ", err);
                res.status(400).send({
                    status: 400,
                    message: err.message || "Failed to fetch ISP list",
                    valid: false,  
                });
            });
    } catch (error) {
        console.error("usp_list_ISP ERROR:", error);
        res.status(500).send({
            status: 500,
            message: "Server error",
            valid: false,
        });
    }
});

// exports.usp_list_PIN = asyncHandler(async (req, res) => {
//     try {
//         const searchQuery = req.query.search || req.body.search || ""; 

       
//         if (searchQuery === "") {
//             return res.send({
//                 status: 200,
//                 data: [],
//                 valid: true,
//                 message: "Please enter a PIN to search"
//             });
//         }

//         const pool = await sql.connect(config);
//         const result = await pool.request()
//             .input("search", sql.NVarChar(100), searchQuery) 
//             .execute("usp_list_PIN");

//         console.log("usp_list_PIN ✅✅ => ", result.recordset.length, "items");

//         const pinList = result.recordset.map(item => ({
//             pin_id: item.PinID,
//             pin_code: item.PIN,  
//             city: item.city,
//             district: item.District,
//             state: item.state
//         }));

//         res.send({
//             status: 200,
//             data: pinList,
//             valid: true,
//         });

//     } catch (error) {
//         console.error("usp_list_PIN ERROR:", error);
//         res.status(500).send({
//             status: 500,
//             message: "Server error",
//             valid: false,
//         });
//     }
// });
exports.usp_list_PIN = asyncHandler(async (req, res) => {
	try {
		console.log("REQ BODY =>", req.body);

		const pool = await sql.connect(config);

		const result = await pool
			.request()
			.input("search", sql.NVarChar(20), req.body.search)
			.execute("usp_list_PIN");

		console.log("RECORDSET =>", result.recordset);

		res.send({
			status: 200,
			data: result.recordset,
		});
	} catch (err) {
		console.log("ERROR =>", err);
		res.status(500).send({ error: err.message });
	}
});

