const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.usp_PIN_Browse = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("SearchTerm", req.body.filter_value)
					.execute("usp_PIN_Browse");
			})
			.then((result) => {
				console.log("usp_PIN_Browse ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset,
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_PIN_Browse ❌❌ => ", err);
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

exports.usp_PIN_Save = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("PinID", req.body.pin_id)
					.input("Pin", req.body.pin)
					.input("State", req.body.state)
					.input("District", req.body.district)
					.input("City", req.body.city)
					.input("IsActive", req.body.isActive)
					.execute("usp_PIN_Save");
			})
			.then((result) => {
				console.log("usp_PIN_Save ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset[0],
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_PIN_Save ❌❌ => ", err);
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

exports.usp_PIN_Preview = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("PinID", req.body.pin_id)
					.execute("usp_PIN_Preview");
			})
			.then((result) => {
				console.log("usp_PIN_Preview ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset[0],
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_PIN_Preview ❌❌ => ", err);
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

exports.usp_PIN_Delete = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("PinID", req.body.pin_id)
					.execute("usp_PIN_Delete");
			})
			.then((result) => {
				console.log("usp_PIN_Delete ✅✅ => ", result);
				res.send({
					status: 200,
					message: "Brand deleted successfully",
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_PIN_Delete ❌❌ => ", err);
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
