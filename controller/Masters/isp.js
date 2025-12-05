const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_ISP_Browse = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("SearchTerm", req.body.filter_value)
					.execute("usp_ISP_Browse");
			})
			.then((result) => {
				console.log("usp_ISP_Browse ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset,
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_ISP_Browse ❌❌ => ", err);
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

exports.usp_ISP_Save = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("ISPID", req.body.isp_id)
					.input("ISPName", req.body.isp_name)
					.input("ShortCode", req.body.short_code)
					.input("Website", req.body.website)
					.input("Remarks", req.body.remarks)
					.input("IsActive", req.body.isActive)
					.execute("usp_ISP_Save");
			})
			.then((result) => {
				console.log("usp_ISP_Save ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset[0],
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_ISP_Save ❌❌ => ", err);
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

exports.usp_ISP_Preview = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("ISPID", req.body.isp_id)
					.execute("usp_ISP_Preview");
			})
			.then((result) => {
				console.log("usp_ISP_Preview ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset[0],
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_ISP_Preview ❌❌ => ", err);
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

exports.usp_ISP_Delete = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("ISPID", req.body.isp_id)
					.execute("usp_ISP_Delete");
			})
			.then((result) => {
				console.log("usp_ISP_Delete ✅✅ => ", result);
				res.send({
					status: 200,
					message: "Brand deleted successfully",
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_ISP_Delete ❌❌ => ", err);
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