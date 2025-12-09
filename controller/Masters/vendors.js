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
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("VendorID", req.body.vendor_id)
					.input("VendorName", req.body.vendor_name)
					.input("ISPID", req.body.isp_id)
					.input("ContactPerson", req.body.contact_person)
					.input("Mobile", req.body.mobile)
					.input("Email", req.body.email)
					.input("PinID", req.body.pin_id)
					.input("City", req.body.city)
					.input("State", req.body.state)
					.input("Address", req.body.address)
					.input("IsActive", req.body.isActive)
					.execute("usp_Vendor_Save");
			})
			.then((result) => {
				console.log("usp_Vendor_Save ✅✅ => ", result);
				res.send({
					status: 200,
					data: result.recordset[0],
					valid: true,
				});
			})
			.catch((err) => {
				console.log("usp_Vendor_Save ❌❌ => ", err);
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
