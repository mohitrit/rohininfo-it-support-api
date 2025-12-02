const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const { max } = require("moment");

// inser of user rights
exports.UserRightsInsert = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return (
					pool
						.request()
						.input("role_id", req.body.role_id)
						.input("role_name", req.body.role_name)
						.input("description", req.body.description)
						.input("is_active", req.body.is_active)
						.input("user_id", req.user.user_id)
						// .output("new_identity")
						.execute("insert_or_update_user_role")
				);
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

// browse api of user rights
exports.browseUserRights = asyncHandler(async (req, res) => {
	try {
		const filter = req.query;
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("role_id", req.body.role_id)
					.input("is_active", req.body.is_active)
					.input("search_term", req.body.filter_value)
					.execute("browse_user_roles");
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
//preview of user rights
exports.previewUserRights = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("role_id", req.body.role_id)
					.execute("preview_user_role");
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
//delete of user rights
exports.DeleteUserRights = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("role_id", req.body.role_id)
					.execute("delete_user_role");
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

//user rights rols table
exports.insertOrUpdateUserRights = async (req, res) => {
	try {
		// const pool = await sql.connect(config);
		// const tvp = new sql.Table("UserRightsType");
		// tvp.columns.add('role_id', sql.Int);
		// tvp.columns.add('transaction_code', sql.VarChar(100));
		// tvp.columns.add('transaction_id', sql.Int);
		// tvp.columns.add('can_view', sql.Bit);
		// tvp.columns.add('can_insert', sql.Bit);
		// tvp.columns.add('can_edit', sql.Bit);
		// tvp.columns.add('can_delete', sql.Bit);
		// tvp.columns.add('can_print', sql.Bit);
		// tvp.columns.add('created_by', sql.Int);
		// req.body.rights.forEach(row => {
		//     tvp.rows.add(
		//         // row.role_id,
		//         req.body.role_id,
		//         row.transaction_code,
		//         row.transaction_id,
		//         row.can_view,
		//         row.can_insert,
		//         row.can_edit,
		//         row.can_delete,
		//         row.can_print,
		//         req.user.user_id
		//     );
		// });
		let tvp = new sql.Table("dbo.UserRightsType");
		tvp.columns.add("role_id", sql.Int);
		tvp.columns.add("transaction_code", sql.VarChar(100));
		tvp.columns.add("transaction_id", sql.Int);
		tvp.columns.add("can_view", sql.Bit);
		tvp.columns.add("can_insert", sql.Bit);
		tvp.columns.add("can_edit", sql.Bit);
		tvp.columns.add("can_delete", sql.Bit);
		tvp.columns.add("can_print", sql.Bit);
		tvp.columns.add("created_by", sql.Int);
		req.body.rights.forEach((item) => {
			tvp.rows.add(
				// req.body.role_id,//
				item.role_id,
				item.transaction_code,
				item.transaction_id,
				item.can_view,
				item.can_insert,
				item.can_edit,
				item.can_delete,
				item.can_print,
				req.user.user_id
			);
		});
		await sql.connect(config).then((pool) => {
			return (
				pool
					.request()
					.input("rights", sql.TVP, tvp)
					// .input('role_id', req.body.role_id)
					// .input('user_id', 16)
					.execute("insert_or_update_web_user_rights")
			);
		});
		res.status(200).json({
			message: "User rights inserted/updated successfully",
			success: true,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal server error",
			error: err.message,
		});
	}
};
// browse of rights apis//
function getDistinctValuesByColumn(array, column) {
	return array.filter(
		(item, index, self) =>
			index === self.findIndex((t) => t[column] === item[column])
	);
}
//this api indicates user id
exports.browseUserRightsByRole = asyncHandler(async (req, res) => {
	try {
		const user_id =
			req.query.global === "true"
				? req.user.user_id
				: parseInt(req.query.user_id);

		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("user_id", req.user.user_id)
					.execute("browse_user_rights_by_user");
			})
			.then((result) => {
				if (req.query.global === "true") {
					const distinctModules = getDistinctValuesByColumn(
						result.recordset,
						"module_name"
					);
					res.send({
						status: 200,
						valid: true,
						data: distinctModules.map((module) => ({
							...module,
							rights: result.recordset.filter(
								(right) => right.module_name === module.module_name
							),
						})),
					});
				} else {
					res.send({
						status: 200,
						valid: true,
						data: result.recordset,
					});
				}
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
//thgis api indicates the role
exports.browseUserRightsByRolee = asyncHandler(async (req, res) => {
	try {
		const role_id =
			req.query.global === "true"
				? req.user.role_id
				: parseInt(req.query.role_id);

		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("role_id", role_id)
					.execute("browse_user_rights_by_role");
			})
			.then((result) => {
				if (req.query.global === "true") {
					const distinctModules = getDistinctValuesByColumn(
						result.recordset,
						"module_name"
					);
					res.send({
						status: 200,
						valid: true,
						data: distinctModules.map((module) => ({
							...module,
							rights: result.recordset.filter(
								(right) => right.module_name === module.module_name
							),
						})),
					});
				} else {
					res.send({
						status: 200,
						valid: true,
						data: result.recordset,
					});
				}
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
//list of user role
exports.listUserRole = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool.request().execute("user_role_list");
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
