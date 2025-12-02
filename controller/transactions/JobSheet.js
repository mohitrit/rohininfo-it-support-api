const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const { application } = require("express");
const nodemailer = require("nodemailer");
const moment = require("moment");

// Todo pick srf main details //
exports.JSSrfPick = asyncHandler(async (req, res) => {
	try {
		const filter = req.query;
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("user_id", req.user.user_id)
					.input("search", req.body.filter_value)
					.execute("pick_srf_main_in_jobsheet");
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

//  ! pick srf main details
exports.PickSrfDetailsJS = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.execute("pick_srf_details_in_jobsheet");
			})
			.then((result) => {
				res.send({
					status: 200,
					accessory: result.recordsets[1],
					packaging: result.recordsets[2],
					fabricTrim: result.recordsets[3],
					contrast: result.recordsets[4],
					branding: result.recordsets[5],
					cap: result.recordsets[6],
					female: result.recordsets[7],
					malesize: result.recordsets[8],
					trouserSize: result.recordsets[9],
					fabric: result.recordsets[10],
					srfColor: result.recordsets[11],
					srfTrouserFemale: result.recordsets[12],
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

// ? insert of job sheet
// exports.JobSheetInsert = asyncHandler(async (req, res) => {
// 	try {
// 		let JSAccessories = new sql.Table("dbo.transaction_jobsheet_accessories");
// 		JSAccessories.columns.add("accessories_id", sql.Int);
// 		JSAccessories.columns.add("qty", sql.Decimal(18, 3));
// 		JSAccessories.columns.add("zip_size", sql.Int);
// 		JSAccessories.columns.add("level_size", sql.Int);
// 		// console.log("testacc",JSAccessories);

// 		req.body.JSAccessories.forEach((item) => {
// 			JSAccessories.rows.add(
// 				Number(item.tran_id),
// 				item.qty,
// 				item.zip_size === undefined || item.zip_size === null || item.zip_size === "" ? 0 : Number(item.zip_size),
// 				item.level_size === undefined || item.level_size === null || item.level_size === "" ? 0 : Number(item.level_size)
// 			);
// 		});
// 		console.log("testacc", JSAccessories);


// 		let JSBranding = new sql.Table("dbo.transaction_jobsheet_branding");
// 		JSBranding.columns.add("branding_space", sql.NVarChar(100));
// 		JSBranding.columns.add("branding_technique", sql.NVarChar(100));
// 		JSBranding.columns.add("branding_type", sql.NVarChar(100));
// 		JSBranding.columns.add("size", sql.NVarChar(100));
// 		JSBranding.columns.add("color", sql.NVarChar(100));
// 		JSBranding.columns.add("remarks", sql.NVarChar(sql.MAX));
// 		req.body.JSBranding.forEach((item) => {
// 			JSBranding.rows.add(
// 				item.branding_space,
// 				item.branding_technique,
// 				item.branding_type,
// 				item.size,
// 				item.color,
// 				// JSON.stringify(item.color ?? []),
// 				item.remarks
// 			);
// 		});

// 		let JSMaleSizes = new sql.Table("dbo.transaction_jobsheet_male_sizes");
// 		JSMaleSizes.columns.add("color_id", sql.Int);
// 		JSMaleSizes.columns.add("color", sql.NVarChar(100));
// 		JSMaleSizes.columns.add("size_s", sql.Int);
// 		JSMaleSizes.columns.add("size_m", sql.Int);
// 		JSMaleSizes.columns.add("size_l", sql.Int);
// 		JSMaleSizes.columns.add("size_xl", sql.Int);
// 		JSMaleSizes.columns.add("size_2xl", sql.Int);
// 		JSMaleSizes.columns.add("size_3xl", sql.Int);
// 		JSMaleSizes.columns.add("size_4xl", sql.Int);
// 		JSMaleSizes.columns.add("size_5xl", sql.Int);
// 		JSMaleSizes.columns.add("size_6xl", sql.Int);
// 		JSMaleSizes.columns.add("size_xs", sql.Int);
// 		JSMaleSizes.columns.add("style_code", sql.NVarChar(100));
// 		JSMaleSizes.columns.add("size_other", sql.Int);
// 		req.body.JSMaleSizes.forEach((item) => {
// 			if (!item.color == "") {
// 				JSMaleSizes.rows.add(
// 					item.color_id,
// 					item.color,
// 					Number(item.size_s),
// 					Number(item.size_m),
// 					Number(item.size_l),
// 					Number(item.size_xl),
// 					Number(item.size_2xl),
// 					Number(item.size_3xl),
// 					Number(item.size_4xl),
// 					Number(item.size_5xl),
// 					Number(item.size_6xl),
// 					Number(item.size_xs),
// 					item.style_code,
// 					Number(item.size_other),
// 				);
// 			}
// 		});

// 		let JSFemaleSizes = new sql.Table("dbo.transaction_jobsheet_female_sizes");
// 		// JSFemaleSizes.columns.add("jobsheet_id", sql.Int);
// 		JSFemaleSizes.columns.add("color_id", sql.Int);
// 		JSFemaleSizes.columns.add("color", sql.NVarChar(100));
// 		JSFemaleSizes.columns.add("size_xs", sql.Int);
// 		JSFemaleSizes.columns.add("size_s", sql.Int);
// 		JSFemaleSizes.columns.add("size_m", sql.Int);
// 		JSFemaleSizes.columns.add("size_l", sql.Int);
// 		JSFemaleSizes.columns.add("size_xl", sql.Int);
// 		JSFemaleSizes.columns.add("size_2xl", sql.Int);
// 		JSFemaleSizes.columns.add("size_3xl", sql.Int);
// 		JSFemaleSizes.columns.add("size_4xl", sql.Int);
// 		JSFemaleSizes.columns.add("size_5xl", sql.Int);
// 		JSFemaleSizes.columns.add("size_xxs", sql.Int);
// 		JSFemaleSizes.columns.add("style_code", sql.NVarChar(50));
// 		JSFemaleSizes.columns.add("size_other", sql.Int);

// 		req.body.JSFemaleSizes.forEach((item) => {
// 			// [].forEach((item) => {
// 			if (!item.color == "") {
// 				JSFemaleSizes.rows.add(
// 					Number(item.color_id),
// 					item.color,
// 					Number(item.size_xs),
// 					Number(item.size_s),
// 					Number(item.size_m),
// 					Number(item.size_l),
// 					Number(item.size_xl),
// 					Number(item.size_2xl),
// 					Number(item.size_3xl),
// 					Number(item.size_4xl),
// 					Number(item.size_5xl),
// 					Number(item.size_xxs),
// 					item.style_code,
// 					Number(item.size_other),
// 				);
// 			}
// 		});

// 		let JSTrouserSizes = new sql.Table(
// 			"dbo.transaction_jobsheet_trouser_sizes"
// 		);
// 		// JSTrouserSizes.columns.add("jobsheet_id", sql.Int);
// 		JSTrouserSizes.columns.add("color_id", sql.Int);
// 		JSTrouserSizes.columns.add("color", sql.NVarChar(100));
// 		JSTrouserSizes.columns.add("size_28", sql.Int);
// 		JSTrouserSizes.columns.add("size_30", sql.Int);
// 		JSTrouserSizes.columns.add("size_32", sql.Int);
// 		JSTrouserSizes.columns.add("size_34", sql.Int);
// 		JSTrouserSizes.columns.add("size_36", sql.Int);
// 		JSTrouserSizes.columns.add("size_38", sql.Int);
// 		JSTrouserSizes.columns.add("size_40", sql.Int);
// 		JSTrouserSizes.columns.add("size_42", sql.Int);
// 		JSTrouserSizes.columns.add("size_44", sql.Int);
// 		JSTrouserSizes.columns.add("size_other", sql.Int);
// 		JSTrouserSizes.columns.add("style_code", sql.NVarChar(100));
// 		// JSTrouserSizes.columns.add("total", sql.Int);
// 		req.body.JSTrouserSizes.forEach((item) => {
// 			if (!item.color == "") {
// 				JSTrouserSizes.rows.add(
// 					Number(item.color_id),
// 					item.color,
// 					Number(item.size_28),
// 					Number(item.size_30),
// 					Number(item.size_32),
// 					Number(item.size_34),
// 					Number(item.size_36),
// 					Number(item.size_38),
// 					Number(item.size_40),
// 					Number(item.size_42),
// 					Number(item.size_44),
// 					Number(item.size_other),
// 					item.style_code
// 					// item.total,
// 				);
// 			}
// 		});

// 		let JSPackaging = new sql.Table("dbo.transaction_jobsheet_packaging");
// 		JSPackaging.columns.add("packaging_id", sql.Int);
// 		JSPackaging.columns.add("qty", sql.Decimal(18, 3));
// 		req.body.JSPackaging.forEach((item) => {
// 			// if (!item.qty == "") {
// 			JSPackaging.rows.add(Number(item.packaging_id), item.qty);
// 			// }
// 		});

// 		let JSContrast = new sql.Table("dbo.transaction_jobsheet_contrast");
// 		JSContrast.columns.add("contrast_fabric_id", sql.Int);
// 		JSContrast.columns.add("contrast_fabric", sql.NVarChar(100));
// 		JSContrast.columns.add("color_id", sql.Int);
// 		JSContrast.columns.add("contrast_color", sql.NVarChar(100));
// 		JSContrast.columns.add("fabric_type", sql.NVarChar(100));
// 		JSContrast.columns.add("qty", sql.Decimal(18, 3));
// 		req.body.JSContrast.forEach((item) => {
// 			// if (!item.qty == "") {
// 			JSContrast.rows.add(
// 				Number(item.fabric_id),
// 				item.fabric_name,
// 				item.color_id,
// 				// 0,
// 				item.color,
// 				item.type,
// 				item.qty
// 			);
// 			// }
// 		});

// 		let JSColor = new sql.Table("dbo.transaction_jobsheet_colors");
// 		JSColor.columns.add("color_id", sql.Int);
// 		JSColor.columns.add("color", sql.NVarChar(100));
// 		JSColor.columns.add("type", sql.NVarChar(100));
// 		req.body.JSColor.forEach((item) => {
// 			if (!item.color_id == "") {
// 				JSColor.rows.add(item.color_id, item.color_name, item.type);
// 			}
// 		});

// 		// let JSFabricTrim = new sql.Table("dbo.transaction_jobsheet_fabric_trim");
// 		// JSFabricTrim.columns.add("fabric_trim_id", sql.Int);
// 		// JSFabricTrim.columns.add("qty", sql.Decimal(18, 3));
// 		// JSFabricTrim.columns.add("zip_size", sql.Int);
// 		// JSFabricTrim.columns.add("level_size", sql.Int);
// 		// console.log("tesyttrims", JSFabricTrim);
// 		// req.body.JSFabricTrim.forEach((item) => {
// 		// 	JSFabricTrim.rows.add(
// 		// 		Number(item.fabric_trim_id),
// 		// 		item.qty,
// 		// 		item.zip_size,
// 		// 		item.level_size,
// 		// 	);
// 		// });

// 		let JSFabricTrim = new sql.Table("dbo.transaction_jobsheet_fabric_trim");
// 		JSFabricTrim.columns.add("fabric_trim_id", sql.Int);
// 		JSFabricTrim.columns.add("qty", sql.Decimal(18, 3));
// 		JSFabricTrim.columns.add("zip_size", sql.Int);
// 		JSFabricTrim.columns.add("level_size", sql.Int);
// 		req.body.JSFabricTrim.forEach((item) => {
// 			JSFabricTrim.rows.add(
// 				Number(item.fabric_trim_id),
// 				item.qty,
// 				item.zip_size === undefined || item.zip_size === null || item.zip_size === "" ? 0 : Number(item.zip_size),
// 				item.level_size === undefined || item.level_size === null || item.level_size === "" ? 0 : Number(item.level_size)
// 			);
// 		});
// 		console.log("test7483", JSFabricTrim);


// 		let JSCapSizes = new sql.Table("dbo.transaction_jobsheet_cap_sizes");
// 		JSCapSizes.columns.add("color_id", sql.Int);
// 		JSCapSizes.columns.add("color", sql.NVarChar(100));
// 		JSCapSizes.columns.add("adult", sql.Int);
// 		JSCapSizes.columns.add("kid", sql.Int);
// 		JSCapSizes.columns.add("style_code", sql.NVarChar(100));
// 		req.body.JSCapSizes.forEach((item) => {
// 			if (!item.color_id == "") {
// 				JSCapSizes.rows.add(
// 					item.color_id,
// 					item.color,
// 					item.adult,
// 					item.kid,
// 					item.style_code
// 				);
// 			}
// 		});
// 		let JSFabric = new sql.Table("dbo.transaction_jobsheet_fabric");
// 		JSFabric.columns.add("fabric_id", sql.Int);
// 		JSFabric.columns.add("fabric_type", sql.NVarChar(100));
// 		JSFabric.columns.add("fabric", sql.NVarChar(100));
// 		JSFabric.columns.add("fabric_color_id", sql.Int);
// 		JSFabric.columns.add("fabric_color", sql.NVarChar(100));
// 		JSFabric.columns.add("qty", sql.Decimal(18, 3));
// 		req.body.JSFabric.forEach((item) => {
// 			if (!item.fabric_color_id == "" || !item.color_id == "") {
// 				JSFabric.rows.add(
// 					Number(item.fabric_id),
// 					item.type,
// 					item.fabric_name,
// 					item.fabric_color_id ? item.fabric_color_id : item.color_id,
// 					item.color ? item.color : item.fabric_color,
// 					item.qty
// 				);
// 			}
// 		});
// 		let JSTrosuerFemale = new sql.Table(
// 			"transaction_jobsheet_trouser_female_sizes"
// 		);
// 		JSTrosuerFemale.columns.add("color_id", sql.Int);
// 		JSTrosuerFemale.columns.add("color", sql.NVarChar(100));
// 		JSTrosuerFemale.columns.add("size_26", sql.Int);
// 		JSTrosuerFemale.columns.add("size_28", sql.Int);
// 		JSTrosuerFemale.columns.add("size_30", sql.Int);
// 		JSTrosuerFemale.columns.add("size_32", sql.Int);
// 		JSTrosuerFemale.columns.add("size_34", sql.Int);
// 		JSTrosuerFemale.columns.add("size_36", sql.Int);
// 		JSTrosuerFemale.columns.add("size_38", sql.Int);
// 		JSTrosuerFemale.columns.add("size_40", sql.Int);
// 		JSTrosuerFemale.columns.add("size_42", sql.Int);
// 		JSTrosuerFemale.columns.add("style_code", sql.NVarChar(100));
// 		JSTrosuerFemale.columns.add("size_other", sql.Int);
// 		req.body.JSTrosuerFemale.forEach((item) => {
// 			if (!item.color == "") {
// 				JSTrosuerFemale.rows.add(
// 					Number(item.color_id),
// 					item.color,
// 					Number(item.size_26),
// 					Number(item.size_28),
// 					Number(item.size_30),
// 					Number(item.size_32),
// 					Number(item.size_34),
// 					Number(item.size_36),
// 					Number(item.size_38),
// 					Number(item.size_40),
// 					Number(item.size_42),
// 					item.style_code,
// 					Number(item.size_other),
// 				);
// 			}
// 		});

// 		await sql
// 			.connect(config)
// 			.then((pool) => {
// 				return pool
// 					.request()
// 					.input("jobsheet_id", req.body.jobsheet_id)
// 					.input("riv", req.body.riv_job_sheet)
// 					.input("jobsheet_no", req.body.jobsheet_no)
// 					.input("date", req.body.js_date)
// 					.input("srf_id", req.body.srf_id)
// 					.input("customer_id", req.body.customer_id)
// 					.input("contact1_id", req.body.contact1_id)
// 					.input("contact2_id", req.body.contact2_id)
// 					.input("delivery_date", req.body.js_delivery_date)
// 					.input("total_qty", req.body.total_qty)
// 					.input("pi_no", req.body.pi_no)
// 					.input("pi_date", req.body.pi_date)
// 					.input("final_delivery_date", req.body.final_delivery_date)
// 					.input("description", req.body.description)
// 					.input("special_instruction", req.body.special_instruction)
// 					.input("reviewed", req.body.reviewed)
// 					.input("product_usage", req.body.product_usage)
// 					.input("product_style", req.body.product_style)
// 					.input("product_usage_id", req.body.product_usage_id)
// 					.input("product_style_id", req.body.style_id)
// 					.input("closed_front_hoodie", req.body.closed_front_hoodie)
// 					.input("front_open_hoodie", req.body.front_open_hoodie)
// 					.input("approved_sample", req.body.approved_sample)
// 					.input("transaction_jobsheet_accessories", sql.TVP, JSAccessories)
// 					.input("transaction_jobsheet_branding", sql.TVP, JSBranding)
// 					.input("transaction_jobsheet_male_sizes", sql.TVP, JSMaleSizes)
// 					.input("transaction_jobsheet_female_sizes", sql.TVP, JSFemaleSizes)
// 					.input("transaction_jobsheet_trouser_sizes", sql.TVP, JSTrouserSizes)
// 					.input("transaction_jobsheet_packaging", sql.TVP, JSPackaging)
// 					.input("transaction_jobsheet_contrast", sql.TVP, JSContrast)
// 					.input("transaction_jobsheet_colors", sql.TVP, JSColor)
// 					.input("transaction_jobsheet_fabric_trim", sql.TVP, JSFabricTrim)
// 					.input("transaction_jobsheet_cap_sizes", sql.TVP, JSCapSizes)
// 					.input("transaction_jobsheet_fabric", sql.TVP, JSFabric)
// 					.input(
// 						"transaction_jobsheet_trouser_female_sizes",
// 						sql.TVP,
// 						JSTrosuerFemale
// 					)
// 					.input("pattern", req.body.pattern)
// 					.input("fit", req.body.fit)
// 					.input("sleeves", req.body.sleeves)
// 					.input("placket_style", req.body.placket_style)
// 					.input("placket_color", req.body.placket_color)
// 					.input("placket_size", req.body.placket_size)
// 					.input("button_placket", req.body.button_placket)
// 					.input("fusing", req.body.fusing)
// 					.input("fusing_in_collar", req.body.fusing_in_collar)
// 					.input("fusing_in_cuff", req.body.fusing_in_cuff)
// 					.input("fusing_in_placket", req.body.fusing_in_placket)
// 					.input("neck_tape", req.body.neck_tape)
// 					.input("neck_tape_color", req.body.neck_tape_color)
// 					.input("neck_style", req.body.neck_style)
// 					.input("neck_style_color", req.body.neck_style_color)
// 					.input("collar_style", req.body.collar_style)
// 					.input("collar_color", req.body.collar_color)
// 					.input("collar_tipping_color", req.body.collar_tipping_color)
// 					.input("collar_band_color", req.body.collar_band_color)
// 					.input("cuff_style", req.body.cuff_style)
// 					.input("cuff_color", req.body.cuff_color)
// 					.input("cuff_tipping", req.body.cuff_tipping)
// 					.input("cuff_tipping_color", req.body.cuff_tipping_color)
// 					.input("inside_cuff_fabric", req.body.inside_cuff_fabric)
// 					.input("inside_cuff_color", req.body.inside_cuff_color)
// 					.input("sleeve_piping", req.body.sleeve_piping)
// 					.input("sleeve_piping_color", req.body.sleeve_piping_color)
// 					.input("side_slit", req.body.side_slit)
// 					.input("side_slit_color", req.body.side_slit_color)
// 					.input("visor", req.body.visor)
// 					.input("visor_color", req.body.visor_color)
// 					.input("visor_stitches", req.body.visor_stitches)
// 					.input("visor_stitch_color", req.body.visor_stitch_color)
// 					.input("eyelet", req.body.eyelet)
// 					.input("eyelet_color", req.body.eyelet_color)
// 					.input("back_fastening", req.body.back_fastening)
// 					.input("sweatband", req.body.sweatband)
// 					.input("sandwich", req.body.sandwich)
// 					.input("sandwich_color", req.body.sandwich_color)
// 					.input("belt_style", req.body.belt_style)
// 					.input("belt_closure", req.body.belt_closure)
// 					.input("bottom_finish", req.body.bottom_finish)
// 					.input("bartack_placement", req.body.bartack_placement)
// 					.input("bartack_color", req.body.bartack_color)
// 					.input("velcro_size", req.body.velcro_size)
// 					.input("velcro_color", req.body.velcro_color)
// 					.input("poplin_color", req.body.poplin_color)
// 					.input("bottom_tipping", req.body.bottom_tipping)
// 					.input("bottom_tipping_color", req.body.bottom_tipping_color)
// 					.input("fabric_trim", req.body.fabric_trim)
// 					.input("fabric_trim_remarks", req.body.fabric_trim_remarks)
// 					.input("style_type", req.body.style_type)
// 					.input("collar_size", req.body.collar_size)
// 					.input("dori_outlet", req.body.dori_outlet)
// 					.input("fusing_in_belt", req.body.fusing_in_belt)
// 					.input("pocketing_placement", req.body.pocketing_placement)
// 					.input("button_placket_color", req.body.button_placket_color)
// 					.input("kaaj_color", req.body.kaaj_color)
// 					.input("button_thread_color", req.body.button_thread_color)
// 					.input("front_closure", req.body.front_closure)
// 					.input("collar_piping", req.body.collar_piping)
// 					.input("collar_piping_color", req.body.collar_piping_color)
// 					.input(
// 						"order_received_date_from_cus",
// 						req.body.order_received_date_from_cus
// 					)
// 					.input("branch_id", req.body.branch_id)
// 					.input("user_id", req.user.user_id)
// 					.output("new_identity")
// 					.execute("transaction_jobsheet_insert");
// 			})
// 			.then((result) => {
// 				res.send({
// 					status: 200,
// 					valid: true,
// 					data: result.output.new_identity,
// 					// data: result.recordsets[0].id,///
// 				});
// 			})
// 			.catch((err) => {
// 				console.log("testnnkjgd", err);

// 				res.send({
// 					status: 400,
// 					message: err,
// 				});
// 			});
// 	} catch (err) {
// 		res.status(500).send({
// 			status: 500,
// 			message: err,
// 		});
// 	}
// });
// Add this helper function at the top of your file
// Add these helper functions at the top of your file
const toIntOrZero = (value) => {
    if (value === undefined || value === null || value === "" || isNaN(value)) {
        return 0;
    }
    return Number(value);
};

const toStringOrEmpty = (value) => {
    if (value === undefined || value === null) {
        return "";
    }
    return String(value);
};

exports.JobSheetInsert = asyncHandler(async (req, res) => {
	try {
		// JSAccessories
		let JSAccessories = new sql.Table("dbo.transaction_jobsheet_accessories");
		JSAccessories.columns.add("accessories_id", sql.Int);
		JSAccessories.columns.add("qty", sql.Decimal(18, 3));
		JSAccessories.columns.add("zip_size", sql.Int);
		JSAccessories.columns.add("level_size", sql.Int);

		req.body.JSAccessories.forEach((item) => {
			JSAccessories.rows.add(
				toIntOrZero(item.tran_id),
				item.qty || 0,
				toIntOrZero(item.zip_size),
				toIntOrZero(item.level_size)
			);
		});
		console.log("JSAccessories TABLE 🦥 = ", JSAccessories);

		// JSBranding - FIX ALL STRING FIELDS
		let JSBranding = new sql.Table("dbo.transaction_jobsheet_branding");
		JSBranding.columns.add("branding_space", sql.NVarChar(100));
		JSBranding.columns.add("branding_technique", sql.NVarChar(100));
		JSBranding.columns.add("branding_type", sql.NVarChar(100));
		JSBranding.columns.add("size", sql.NVarChar(100));
		JSBranding.columns.add("color", sql.NVarChar(100));
		JSBranding.columns.add("remarks", sql.NVarChar(sql.MAX));
		
		req.body.JSBranding.forEach((item) => {
			JSBranding.rows.add(
				toStringOrEmpty(item.branding_space),
				toStringOrEmpty(item.branding_technique),
				toStringOrEmpty(item.branding_type),
				toStringOrEmpty(item.size),
				toStringOrEmpty(item.color),
				toStringOrEmpty(item.remarks)
			);
		});

		// JSMaleSizes
		let JSMaleSizes = new sql.Table("dbo.transaction_jobsheet_male_sizes");
		JSMaleSizes.columns.add("color_id", sql.Int);
		JSMaleSizes.columns.add("color", sql.NVarChar(100));
		JSMaleSizes.columns.add("size_s", sql.Int);
		JSMaleSizes.columns.add("size_m", sql.Int);
		JSMaleSizes.columns.add("size_l", sql.Int);
		JSMaleSizes.columns.add("size_xl", sql.Int);
		JSMaleSizes.columns.add("size_2xl", sql.Int);
		JSMaleSizes.columns.add("size_3xl", sql.Int);
		JSMaleSizes.columns.add("size_4xl", sql.Int);
		JSMaleSizes.columns.add("size_5xl", sql.Int);
		JSMaleSizes.columns.add("size_6xl", sql.Int);
		JSMaleSizes.columns.add("size_xs", sql.Int);
		JSMaleSizes.columns.add("style_code", sql.NVarChar(100));
		JSMaleSizes.columns.add("size_other", sql.Int);
		
		req.body.JSMaleSizes.forEach((item) => {
			if (item.color && item.color !== "") {
				JSMaleSizes.rows.add(
					toIntOrZero(item.color_id),
					toStringOrEmpty(item.color),
					toIntOrZero(item.size_s),
					toIntOrZero(item.size_m),
					toIntOrZero(item.size_l),
					toIntOrZero(item.size_xl),
					toIntOrZero(item.size_2xl),
					toIntOrZero(item.size_3xl),
					toIntOrZero(item.size_4xl),
					toIntOrZero(item.size_5xl),
					toIntOrZero(item.size_6xl),
					toIntOrZero(item.size_xs),
					toStringOrEmpty(item.style_code),
					toIntOrZero(item.size_other)
				);
			}
		});

		// JSFemaleSizes
		let JSFemaleSizes = new sql.Table("dbo.transaction_jobsheet_female_sizes");
		JSFemaleSizes.columns.add("color_id", sql.Int);
		JSFemaleSizes.columns.add("color", sql.NVarChar(100));
		JSFemaleSizes.columns.add("size_xs", sql.Int);
		JSFemaleSizes.columns.add("size_s", sql.Int);
		JSFemaleSizes.columns.add("size_m", sql.Int);
		JSFemaleSizes.columns.add("size_l", sql.Int);
		JSFemaleSizes.columns.add("size_xl", sql.Int);
		JSFemaleSizes.columns.add("size_2xl", sql.Int);
		JSFemaleSizes.columns.add("size_3xl", sql.Int);
		JSFemaleSizes.columns.add("size_4xl", sql.Int);
		JSFemaleSizes.columns.add("size_5xl", sql.Int);
		JSFemaleSizes.columns.add("size_xxs", sql.Int);
		JSFemaleSizes.columns.add("style_code", sql.NVarChar(50));
		JSFemaleSizes.columns.add("size_other", sql.Int);

		req.body.JSFemaleSizes.forEach((item) => {
			if (item.color && item.color !== "") {
				JSFemaleSizes.rows.add(
					toIntOrZero(item.color_id),
					toStringOrEmpty(item.color),
					toIntOrZero(item.size_xs),
					toIntOrZero(item.size_s),
					toIntOrZero(item.size_m),
					toIntOrZero(item.size_l),
					toIntOrZero(item.size_xl),
					toIntOrZero(item.size_2xl),
					toIntOrZero(item.size_3xl),
					toIntOrZero(item.size_4xl),
					toIntOrZero(item.size_5xl),
					toIntOrZero(item.size_xxs),
					toStringOrEmpty(item.style_code),
					toIntOrZero(item.size_other)
				);
			}
		});

		// JSTrouserSizes
		let JSTrouserSizes = new sql.Table("dbo.transaction_jobsheet_trouser_sizes");
		JSTrouserSizes.columns.add("color_id", sql.Int);
		JSTrouserSizes.columns.add("color", sql.NVarChar(100));
		JSTrouserSizes.columns.add("size_28", sql.Int);
		JSTrouserSizes.columns.add("size_30", sql.Int);
		JSTrouserSizes.columns.add("size_32", sql.Int);
		JSTrouserSizes.columns.add("size_34", sql.Int);
		JSTrouserSizes.columns.add("size_36", sql.Int);
		JSTrouserSizes.columns.add("size_38", sql.Int);
		JSTrouserSizes.columns.add("size_40", sql.Int);
		JSTrouserSizes.columns.add("size_42", sql.Int);
		JSTrouserSizes.columns.add("size_44", sql.Int);
		JSTrouserSizes.columns.add("size_other", sql.Int);
		JSTrouserSizes.columns.add("style_code", sql.NVarChar(100));
		
		req.body.JSTrouserSizes.forEach((item) => {
			if (item.color && item.color !== "") {
				JSTrouserSizes.rows.add(
					toIntOrZero(item.color_id),
					toStringOrEmpty(item.color),
					toIntOrZero(item.size_28),
					toIntOrZero(item.size_30),
					toIntOrZero(item.size_32),
					toIntOrZero(item.size_34),
					toIntOrZero(item.size_36),
					toIntOrZero(item.size_38),
					toIntOrZero(item.size_40),
					toIntOrZero(item.size_42),
					toIntOrZero(item.size_44),
					toIntOrZero(item.size_other),
					toStringOrEmpty(item.style_code)
				);
			}
		});

		// JSPackaging
		let JSPackaging = new sql.Table("dbo.transaction_jobsheet_packaging");
		JSPackaging.columns.add("packaging_id", sql.Int);
		JSPackaging.columns.add("qty", sql.Decimal(18, 3));
		
		req.body.JSPackaging.forEach((item) => {
			JSPackaging.rows.add(
				toIntOrZero(item.packaging_id), 
				item.qty || 0
			);
		});

		// JSContrast
		let JSContrast = new sql.Table("dbo.transaction_jobsheet_contrast");
		JSContrast.columns.add("contrast_fabric_id", sql.Int);
		JSContrast.columns.add("contrast_fabric", sql.NVarChar(100));
		JSContrast.columns.add("color_id", sql.Int);
		JSContrast.columns.add("contrast_color", sql.NVarChar(100));
		JSContrast.columns.add("fabric_type", sql.NVarChar(100));
		JSContrast.columns.add("qty", sql.Decimal(18, 3));
		
		req.body.JSContrast.forEach((item) => {
			JSContrast.rows.add(
				toIntOrZero(item.fabric_id),
				toStringOrEmpty(item.fabric_name),
				toIntOrZero(item.color_id),
				toStringOrEmpty(item.color),
				toStringOrEmpty(item.type),
				item.qty || 0
			);
		});

		// JSColor
		let JSColor = new sql.Table("dbo.transaction_jobsheet_colors");
		JSColor.columns.add("color_id", sql.Int);
		JSColor.columns.add("color", sql.NVarChar(100));
		JSColor.columns.add("type", sql.NVarChar(100));
		
		req.body.JSColor.forEach((item) => {
			if (item.color_id) {
				JSColor.rows.add(
					toIntOrZero(item.color_id), 
					toStringOrEmpty(item.color_name), 
					toStringOrEmpty(item.type)
				);
			}
		});

		// JSFabricTrim
		let JSFabricTrim = new sql.Table("dbo.transaction_jobsheet_fabric_trim");
		JSFabricTrim.columns.add("fabric_trim_id", sql.Int);
		JSFabricTrim.columns.add("qty", sql.Decimal(18, 3));
		JSFabricTrim.columns.add("zip_size", sql.Int);
		JSFabricTrim.columns.add("level_size", sql.Int);
		
		req.body.JSFabricTrim.forEach((item) => {
			JSFabricTrim.rows.add(
				toIntOrZero(item.fabric_trim_id),
				item.qty || 0,
				toIntOrZero(item.zip_size),
				toIntOrZero(item.level_size)
			);
		});

		// JSCapSizes
		let JSCapSizes = new sql.Table("dbo.transaction_jobsheet_cap_sizes");
		JSCapSizes.columns.add("color_id", sql.Int);
		JSCapSizes.columns.add("color", sql.NVarChar(100));
		JSCapSizes.columns.add("adult", sql.Int);
		JSCapSizes.columns.add("kid", sql.Int);
		JSCapSizes.columns.add("style_code", sql.NVarChar(100));
		
		req.body.JSCapSizes.forEach((item) => {
			if (item.color_id) {
				JSCapSizes.rows.add(
					toIntOrZero(item.color_id),
					toStringOrEmpty(item.color),
					toIntOrZero(item.adult),
					toIntOrZero(item.kid),
					toStringOrEmpty(item.style_code)
				);
			}
		});

		// JSFabric
		let JSFabric = new sql.Table("dbo.transaction_jobsheet_fabric");
		JSFabric.columns.add("fabric_id", sql.Int);
		JSFabric.columns.add("fabric_type", sql.NVarChar(100));
		JSFabric.columns.add("fabric", sql.NVarChar(100));
		JSFabric.columns.add("fabric_color_id", sql.Int);
		JSFabric.columns.add("fabric_color", sql.NVarChar(100));
		JSFabric.columns.add("qty", sql.Decimal(18, 3));
		
		req.body.JSFabric.forEach((item) => {
			if (item.fabric_color_id || item.color_id) {
				JSFabric.rows.add(
					toIntOrZero(item.fabric_id),
					toStringOrEmpty(item.type),
					toStringOrEmpty(item.fabric_name),
					toIntOrZero(item.fabric_color_id || item.color_id),
					toStringOrEmpty(item.color || item.fabric_color),
					item.qty || 0
				);
			}
		});

		// JSTrosuerFemale
		let JSTrosuerFemale = new sql.Table("transaction_jobsheet_trouser_female_sizes");
		JSTrosuerFemale.columns.add("color_id", sql.Int);
		JSTrosuerFemale.columns.add("color", sql.NVarChar(100));
		JSTrosuerFemale.columns.add("size_26", sql.Int);
		JSTrosuerFemale.columns.add("size_28", sql.Int);
		JSTrosuerFemale.columns.add("size_30", sql.Int);
		JSTrosuerFemale.columns.add("size_32", sql.Int);
		JSTrosuerFemale.columns.add("size_34", sql.Int);
		JSTrosuerFemale.columns.add("size_36", sql.Int);
		JSTrosuerFemale.columns.add("size_38", sql.Int);
		JSTrosuerFemale.columns.add("size_40", sql.Int);
		JSTrosuerFemale.columns.add("size_42", sql.Int);
		JSTrosuerFemale.columns.add("style_code", sql.NVarChar(100));
		JSTrosuerFemale.columns.add("size_other", sql.Int);
		
		req.body.JSTrosuerFemale.forEach((item) => {
			if (item.color && item.color !== "") {
				JSTrosuerFemale.rows.add(
					toIntOrZero(item.color_id),
					toStringOrEmpty(item.color),
					toIntOrZero(item.size_26),
					toIntOrZero(item.size_28),
					toIntOrZero(item.size_30),
					toIntOrZero(item.size_32),
					toIntOrZero(item.size_34),
					toIntOrZero(item.size_36),
					toIntOrZero(item.size_38),
					toIntOrZero(item.size_40),
					toIntOrZero(item.size_42),
					toStringOrEmpty(item.style_code),
					toIntOrZero(item.size_other)
				);
			}
		});

		// Rest of your SQL execution code remains the same...
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.input("riv", req.body.riv_job_sheet)
					.input("jobsheet_no", req.body.jobsheet_no)
					.input("date", req.body.js_date)
					.input("srf_id", req.body.srf_id)
					.input("customer_id", req.body.customer_id)
					.input("contact1_id", req.body.contact1_id)
					.input("contact2_id", req.body.contact2_id)
					.input("delivery_date", req.body.js_delivery_date)
					.input("total_qty", req.body.total_qty)
					.input("pi_no", req.body.pi_no)
					.input("pi_date", req.body.pi_date)
					.input("final_delivery_date", req.body.final_delivery_date)
					.input("description", req.body.description)
					.input("special_instruction", req.body.special_instruction)
					.input("reviewed", req.body.reviewed)
					.input("product_usage", req.body.product_usage)
					.input("product_style", req.body.product_style)
					.input("product_usage_id", req.body.product_usage_id)
					.input("product_style_id", req.body.style_id)
					.input("closed_front_hoodie", req.body.closed_front_hoodie)
					.input("front_open_hoodie", req.body.front_open_hoodie)
					.input("approved_sample", req.body.approved_sample)
					.input("transaction_jobsheet_accessories", sql.TVP, JSAccessories)
					.input("transaction_jobsheet_branding", sql.TVP, JSBranding)
					.input("transaction_jobsheet_male_sizes", sql.TVP, JSMaleSizes)
					.input("transaction_jobsheet_female_sizes", sql.TVP, JSFemaleSizes)
					.input("transaction_jobsheet_trouser_sizes", sql.TVP, JSTrouserSizes)
					.input("transaction_jobsheet_packaging", sql.TVP, JSPackaging)
					.input("transaction_jobsheet_contrast", sql.TVP, JSContrast)
					.input("transaction_jobsheet_colors", sql.TVP, JSColor)
					.input("transaction_jobsheet_fabric_trim", sql.TVP, JSFabricTrim)
					.input("transaction_jobsheet_cap_sizes", sql.TVP, JSCapSizes)
					.input("transaction_jobsheet_fabric", sql.TVP, JSFabric)
					.input("transaction_jobsheet_trouser_female_sizes", sql.TVP, JSTrosuerFemale)
					.input("pattern", req.body.pattern)
					.input("fit", req.body.fit)
					.input("sleeves", req.body.sleeves)
					.input("placket_style", req.body.placket_style)
					.input("placket_color", req.body.placket_color)
					.input("placket_size", req.body.placket_size)
					.input("button_placket", req.body.button_placket)
					.input("fusing", req.body.fusing)
					.input("fusing_in_collar", req.body.fusing_in_collar)
					.input("fusing_in_cuff", req.body.fusing_in_cuff)
					.input("fusing_in_placket", req.body.fusing_in_placket)
					.input("neck_tape", req.body.neck_tape)
					.input("neck_tape_color", req.body.neck_tape_color)
					.input("neck_style", req.body.neck_style)
					.input("neck_style_color", req.body.neck_style_color)
					.input("collar_style", req.body.collar_style)
					.input("collar_color", req.body.collar_color)
					.input("collar_tipping_color", req.body.collar_tipping_color)
					.input("collar_band_color", req.body.collar_band_color)
					.input("cuff_style", req.body.cuff_style)
					.input("cuff_color", req.body.cuff_color)
					.input("cuff_tipping", req.body.cuff_tipping)
					.input("cuff_tipping_color", req.body.cuff_tipping_color)
					.input("inside_cuff_fabric", req.body.inside_cuff_fabric)
					.input("inside_cuff_color", req.body.inside_cuff_color)
					.input("sleeve_piping", req.body.sleeve_piping)
					.input("sleeve_piping_color", req.body.sleeve_piping_color)
					.input("side_slit", req.body.side_slit)
					.input("side_slit_color", req.body.side_slit_color)
					.input("visor", req.body.visor)
					.input("visor_color", req.body.visor_color)
					.input("visor_stitches", req.body.visor_stitches)
					.input("visor_stitch_color", req.body.visor_stitch_color)
					.input("eyelet", req.body.eyelet)
					.input("eyelet_color", req.body.eyelet_color)
					.input("back_fastening", req.body.back_fastening)
					.input("sweatband", req.body.sweatband)
					.input("sandwich", req.body.sandwich)
					.input("sandwich_color", req.body.sandwich_color)
					.input("belt_style", req.body.belt_style)
					.input("belt_closure", req.body.belt_closure)
					.input("bottom_finish", req.body.bottom_finish)
					.input("bartack_placement", req.body.bartack_placement)
					.input("bartack_color", req.body.bartack_color)
					.input("velcro_size", req.body.velcro_size)
					.input("velcro_color", req.body.velcro_color)
					.input("poplin_color", req.body.poplin_color)
					.input("bottom_tipping", req.body.bottom_tipping)
					.input("bottom_tipping_color", req.body.bottom_tipping_color)
					.input("fabric_trim", req.body.fabric_trim)
					.input("fabric_trim_remarks", req.body.fabric_trim_remarks)
					.input("style_type", req.body.style_type)
					.input("collar_size", req.body.collar_size)
					.input("dori_outlet", req.body.dori_outlet)
					.input("fusing_in_belt", req.body.fusing_in_belt)
					.input("pocketing_placement", req.body.pocketing_placement)
					.input("button_placket_color", req.body.button_placket_color)
					.input("kaaj_color", req.body.kaaj_color)
					.input("button_thread_color", req.body.button_thread_color)
					.input("front_closure", req.body.front_closure)
					.input("collar_piping", req.body.collar_piping)
					.input("collar_piping_color", req.body.collar_piping_color)
					.input("order_received_date_from_cus", req.body.order_received_date_from_cus)
					.input("branch_id", req.body.branch_id)
					.input("user_id", req.user.user_id)
					.output("new_identity")
					.execute("transaction_jobsheet_insert");
			})
			.then((result) => {
				res.send({
					status: 200,
					valid: true,
					data: result.output.new_identity,
				});
			})
			.catch((err) => {
				console.log("testnnkjgd", err);
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (err) {
		console.log("ERROR 500 😛 = ", err);
		res.status(500).send({
			status: 500,
			message: err,
		});
	}
});

// Todo browse api of jobsheet
exports.JSBrowse = asyncHandler(async (req, res) => {
	try {
		const filter = req.query;
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("user_id", req.user.user_id)
					.input("search", req.body.filter_value)
					.input("company", req.body.company)
					.input("product", req.body.product)
					.execute("transaction_jobsheet_browse");
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

//! delete of js
exports.JSDelete = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.execute("transaction_jobsheet_delete");
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

// ? preview of jobsheet
exports.JSpreview = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.execute("transaction_jobsheet_preview");
			})
			.then((result) => {
				if (result.recordset) {
					const obj = {
						data: {
							...result.recordsets[0][0],
							riv: result.recordsets[0][0]?.riv + 1,
						},
						// data: result.recordsets[0][0],
						branding: result.recordsets[1],
						malesize: result.recordsets[2],
						femalesize: result.recordsets[3],
						trouserSize: result.recordsets[4],
						accessories: result.recordsets[5],
						packaging: result.recordsets[6],
						contrast: result.recordsets[7],
						attachment: result.recordset[8],
						fabric: result.recordsets[9],
						JSColor: result.recordsets[10],
						fabricTrim: result.recordsets[11],
						capSizes: result.recordsets[12],
						JSTrosuerFemale: result.recordsets[13],
					};
					res.send({
						status: 200,
						valid: true,
						...obj,
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

// * print of jobsheet
exports.JSPrint = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.execute("transaction_jobsheet_print");
			})
			.then((result) => {
				res.send({
					status: 200,
					data: result.recordsets[0][0],
					branding: result.recordsets[1],
					malesize: result.recordsets[2],
					femalesize: result.recordsets[3],
					trouserSize: result.recordsets[4],
					accessories: result.recordsets[5],
					packaging: result.recordsets[6],
					fabric: result.recordsets[7],
					attachement: result.recordsets[8],
					contrast: result.recordsets[9],
					JSColor: result.recordsets[10],
					FabricTrim: result.recordsets[11],
					capSizes: result.recordsets[12],
					Indent: result.recordsets[13],
					JSTrosuerFemale: result.recordsets[14],
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

// Todo attachment of jobsheet

exports.JSAttachmentInsert = asyncHandler(async (req, res) => {
	try {
		if (req.files.length === -1) {
			res.send({
				status: 202,
				message: "Record Not Found",
			});
		}
		let JSAttach = new sql.Table("dbo.jobsheet_attachment");
		// JSAttach.columns.add("jobsheet_id", sql.Int);
		JSAttach.columns.add("attachment_path", sql.NVarChar(sql.MAX));
		req.files.forEach((item) => {
			// JSAttach.rows.add(item.jobsheet_id);
			JSAttach.rows.add(item.path);
		});
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.input("jobsheet_attachment", sql.TVP, JSAttach)
					.execute("transaction_jobsheet_attachment_insert");
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

// ! delete of  js attachment
exports.DeleteJSImagePreview = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("tran_id", req.body.tran_id)
					.execute("transaction_jobsheet_attachment_delete");
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

// ! preview of js attachment

exports.PreviewJsAttachment = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.execute("transaction_jobsheet_attachment_preview");
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

// reviewed api for js browse grid
exports.JSReviewed = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.input("reviewed", req.body.reviewed)
					.input("user_id", req.user.user_id)
					.execute("transaction_jobsheet_update_reviewed");
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

exports.JSFinalDeliveryDate = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.input("final_delivery_date", req.body.final_delivery_date)
					.input("remarks", req.body.remarks)
					.input("user_id", req.user.user_id)
					.execute("transaction_jobsheet_update_final_delivery_date");
			})
			.then((result) => {
				const record = result.recordset?.[0];

				if (record?.final_delivery_date) {
					const rawDate = new Date(record.final_delivery_date);
					record.final_delivery_date = rawDate.toISOString().split("T")[0];
				}
				sendNotifyJobsheetReadyDateEmail(record, record.customer_name);
				res.send({
					status: 200,
					valid: true,
					data: result.recordset,
				});
			})
			.catch((err) => {
				console.error("SQL Error:", err);
				res.status(400).send({
					status: 400,
					message: err.message || "Database error",
				});
			});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: error.message || "Internal server error",
		});
	}
});

function sendNotifyJobsheetReadyDateEmail(data, subject) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.CLIENT_APP_ID,
			pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
		},
	});
	var mailOptions = {
		from: process.env.CLIENT_APP_ID,
		to: `${data.contact1_email || ""}`,
		cc: `${data.contact2_email || ""}`,
		subject: `Ready to Dispatch Date Updated-${data.customer_name}-${data.product_usage}(${data.jobsheet_no})`,
		html: `<div style="font-family: sans-serif">
    <table
      style="
        max-width: 700px;
        margin: 20px auto 10px;
        border: solid 1px #ddd;
        background-color: #fff;
        border-top: solid 5px #da222b;
        box-shadow: 0 -7px 0 #000;
        font-size: 14px;
        min-width: 600px;
      "
    >
      <tbody>
        <tr>
          <td>
            <table style="width: 100%">
               <tr style="vertical-align: top">
                  <td style="width: 50%; padding: 15px 15px 0">
                    <p style="margin: 0">
                      <img
                        src="https://adminapi.brij.in/uploads/brij.png"
                        alt="Brij"
                        style="height: 65px"
                      />
                    </p>
                  </td>
                  <td style="width: 50%; text-align: right; padding: 15px">
                    <img
                      src="https://myerp.brij.in/assets/Brij_logo-DBus5JMP.png"
                      alt="Brij"
                      style="
                        height: 65px;
                        max-width: 120px;
                        object-fit: contain;
                      "
                    />
                  </td>
                </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px ">
            <p>Dear Team,</p>
            <p style="margin: 0; line-height: 1.5">
            Please note that the "Ready to Dispatch" date for the following order has been updated:
            </p>
            <table style="margin: 0;">
              <p  margin-bottom: 20px; margin-top: 30px;">
              </p>
              <tr>
                <td class="label-cell">&#8226; Customer Name:<strong> ${data.customer_name}</strong></td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Product Name:<strong> ${data.product_usage}</strong></td>
              </tr>
               <tr>
                <td class="label-cell">&#8226;     Order Reference No.:<strong> ${data.jobsheet_no}</strong></td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Updated Ready to Dispatch Date: <strong> ${data.final_delivery_date}</strong></td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Updated By: <strong>${data.full_name}</strong></td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Remarks (if any): <strong>${data.remarks}</strong></td>
              </tr>
            </table>

            <p>
            Kindly do further processing to dispatch the order
            </p>
              <p>
              Best regards,     
                  </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.error("Email send failed:", error);
		} else {
			console.log("Email sent successfully:", info.response);
		}
	});
}
//ppm filter api//
exports.JSPreProductionDate = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.input("ppm_date", req.body.ppm_date)
					.input("user_id", req.user.user_id)
					.execute("transaction_jobsheet_update_ppm_date");
			})
			// .then((result) => {
			// 	res.send({
			// 		status: 200,
			// 		valid: true,
			// 	});
			// })
			.then((result) => {
				const record = result.recordset?.[0];

				if (record?.final_delivery_date) {
					const rawDate = new Date(record.final_delivery_date);
					record.final_delivery_date = rawDate.toISOString().split("T")[0];
				}
				sendNotifyJobsheetPPMDateEmail(record, record.customer_name);
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
function sendNotifyJobsheetPPMDateEmail(data, subject) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.CLIENT_APP_ID,
			pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
		},
	});
	var mailOptions = {
		from: process.env.CLIENT_APP_ID,
		to: `${data.contact1_email || ""}`,
		cc: `${data.contact2_email || ""}`,
		subject: `Pre-Production Meeting Date Updated-${data.customer_name}-${data.product_usage}(${data.jobsheet_no})`,
		html: `<div style="font-family: sans-serif">
    <table
      style="
        max-width: 700px;
        margin: 20px auto 10px;
        border: solid 1px #ddd;
        background-color: #fff;
        border-top: solid 5px #da222b;
        box-shadow: 0 -7px 0 #000;
        font-size: 14px;
        min-width: 600px;
      "
    >
      <tbody>
        <tr>
          <td>
            <table style="width: 100%">
               <tr style="vertical-align: top">
                  <td style="width: 50%; padding: 15px 15px 0">
                    <p style="margin: 0">
                      <img
                        src="https://adminapi.brij.in/uploads/brij.png"
                        alt="Brij"
                        style="height: 65px"
                      />
                    </p>
                  </td>
                  <td style="width: 50%; text-align: right; padding: 15px">
                    <img
                      src="https://myerp.brij.in/assets/Brij_logo-DBus5JMP.png"
                      alt="Brij"
                      style="
                        height: 65px;
                        max-width: 120px;
                        object-fit: contain;
                      "
                    />
                  </td>
                </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px ">
            <p>Dear Team,</p>
            <p style="margin: 0; line-height: 1.5">
            Please note that the "PPM(Pre-Production Meeting)" date for the following order has been updated:
            </p>
            <table style="margin: 0;">
              <p  margin-bottom: 20px; margin-top: 30px;">
              </p>
              <tr>
                <td class="label-cell">&#8226; Customer Name:<strong> ${
									data.customer_name
								}</strong></td>
              </tr>
              <tr>
                <td class="label-cell">&#8226; Product Name:<strong> ${
									data.product_usage
								}</strong></td>
              </tr>
               <tr>
                <td class="label-cell">&#8226;     Order Reference No.:<strong> ${
									data.jobsheet_no
								}</strong></td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Updated PPM Date: <strong> ${moment(
									data.ppm_date
								).format("DD/MM/YYYY")}</strong></td>
              </tr>
              <tr>
                <td class="label-cell">&#8226;     Updated By: <strong>${
									data.full_name
								}</strong></td>
              </tr>
            </table>

            <p>
            Kindly do further processing to dispatch the order
            </p>
              <p>
              Best regards,     
                  </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background-color: #000;
              color: #fff;
              padding: 10px;
              margin-top: 20px;
              font-size: 11px;
            "
          >
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.error("Email send failed:", error);
		} else {
			console.log("Email sent successfully:", info.response);
		}
	});
}

exports.UpdateTransactionJobsheet = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("jobsheet_id", req.body.jobsheet_id)
					.input("status", req.body.status)
					.input("remarks_status", req.body.remarks_status)
					.execute("update_transaction_jobsheet_status");
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
