const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");

exports.usp_RIT_BrowseUsers = asyncHandler(async (req, res) => {
	try {
		const filter = req.query;
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("SearchTerm", req.body.filter_value)
					.input("SortColumn", req.body.sort_column)
					.input("SortDirection", req.body.sort_direction)
					.input("PageNumber", req.query.page_number)
					.input("PageSize", req.body.page_size)
					.execute("usp_RIT_BrowseUsers");
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






































//insert accessories//
exports.AccessoriesInsert = asyncHandler(async (req, res) => {
	try {
		let AccessoriesVendor = new sql.Table("dbo.masters_accessories_vendors");
		AccessoriesVendor.columns.add("vendor_id", sql.Int);
		AccessoriesVendor.columns.add("vendor_code", sql.NVarChar(100));
		AccessoriesVendor.columns.add("mill", sql.NVarChar(100));
		req.body.AccessoriesVendor.forEach((item) => {
			AccessoriesVendor.rows.add(
				item.vendor_id,
				item.vendor_code,
				item.mill_name
			);
		});
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("tran_id", req.body.tran_id)
					.input("unique_id", req.body.unique_id)
					.input("category_id", req.body.category_id)
					.input("subcategory_id", req.body.subcategory_id)
					.input("item_name", req.body.item_name)
					.input("uom", req.body.uom)
					.input("internal_code", req.body.internal_code)
					.input("product_usage_id", req.body.product_usage_id)
					.input("product_usage", req.body.product_usage)
					.input("product_type_id", req.body.product_type_id)
					.input("product_type", req.body.product_type)
					.input("type", req.body.type)
					.input("color_id", req.body.color_id)
					.input("color_size", req.body.color_size)
					.input("brand", req.body.brand)
					.input("color", req.body.color)
					.input("pantone", req.body.pantone)
					.input("size", req.body.size)
					.input("base_type", req.body.base_type)
					.input("article_no", req.body.article_no)
					.input("puller_no", req.body.puller_no)
					.input("open_close_end", req.body.open_close_end)
					.input("other_description", req.body.other_description)
					.input("price", req.body.price)
					.input("masters_accessories_vendors", sql.TVP, AccessoriesVendor)
					.input("user_id", req.user.user_id)
					.output("new_identity")
					.execute("Masters_accessories_insert");
			})
			.then((result) => {
				res.send({
					status: 200,
					message: "success",
					valid: true,
					data: result.output.new_identity,
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

exports.Masters_accessories_preview = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("tran_id", req.body.tran_id)
					.execute("Masters_accessories_preview");
			})
			.then((result) => {
				const obj = { ...result.recordsets[0][0] };
				obj.AccessoriesVendor = result.recordsets[1];
				res.send({
					status: 200,
					data: obj,
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



exports.Masters_accessories_delete = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("tran_id", req.body.tran_id)
					.execute("Masters_accessories_delete");
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

exports.AccessoriesAttachmentInsert = asyncHandler(async (req, res) => {
	try {
		if (req.files.length === -1) {
			res.send({
				status: 202,
				message: "Record Not Found",
			});
		}
		let AccessoriesAttach = new sql.Table("dbo.Masters_accessories_attachment");
		AccessoriesAttach.columns.add("attachment_path", sql.NVarChar(sql.MAX));
		req.files.forEach((item) => {
			AccessoriesAttach.rows.add(item.path);
		});
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("mtran_id", req.body.mtran_id)
					.input("Masters_accessories_attachment", sql.TVP, AccessoriesAttach)
					.execute("Masters_accessories_attachment_insert");
			})
			.then((result) => {
				res.send({
					status: 200,
					message: "success",
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

// file preview api
exports.PreviewAccessoriesAttachment = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("mtran_id", req.body.mtran_id)
					.execute("Masters_accessories_attachment_preview");
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

// file upload delete api
exports.DeleteAccessories = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("tran_id", req.body.tran_id)
					.execute("Masters_accessories_attachment_delete");
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
