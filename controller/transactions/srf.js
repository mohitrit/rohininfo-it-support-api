const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
const nodemailer = require("nodemailer");

//! insert of srf
exports.srfInsert = asyncHandler(async (req, res) => {
	try {
		let SrfBranding = new sql.Table("dbo.transaction_srf_branding");
		// SrfBranding.columns.add("srf_id", sql.Int);
		SrfBranding.columns.add("branding_space", sql.NVarChar(100));
		SrfBranding.columns.add("branding_technique", sql.NVarChar(100));
		SrfBranding.columns.add("branding_type", sql.NVarChar(100));
		SrfBranding.columns.add("size", sql.NVarChar(100));
		SrfBranding.columns.add("color", sql.NVarChar(100));
		SrfBranding.columns.add("remarks", sql.NVarChar(sql.MAX));
		req.body.SrfBandingData.forEach((item) => {
			if (!item.branding_space == "") {
				SrfBranding.rows.add(
					item.branding_space,
					item.branding_technique,
					item.branding_type,
					item.size,
					// item.color,
					typeof item.color === "string"
						? item.color
						: JSON.stringify(item.color ?? []),
					item.remarks
				);
			}
		});

		let SrfMaleSizes = new sql.Table("dbo.transaction_srf_male_sizes");
		SrfMaleSizes.columns.add("color_id", sql.Int);
		SrfMaleSizes.columns.add("color", sql.NVarChar(100));
		SrfMaleSizes.columns.add("size_s", sql.Int);
		SrfMaleSizes.columns.add("size_m", sql.Int);
		SrfMaleSizes.columns.add("size_l", sql.Int);
		SrfMaleSizes.columns.add("size_xl", sql.Int);
		SrfMaleSizes.columns.add("size_2xl", sql.Int);
		SrfMaleSizes.columns.add("size_3xl", sql.Int);
		SrfMaleSizes.columns.add("size_4xl", sql.Int);
		SrfMaleSizes.columns.add("style_code", sql.NVarChar(100));
		SrfMaleSizes.columns.add("size_xs", sql.Int);
		SrfMaleSizes.columns.add("size_5xl", sql.Int);
		SrfMaleSizes.columns.add("size_6xl", sql.Int);

		// [].forEach((item) => {
		req.body.SrfMaleSizesData.forEach((item) => {
			if (!item.color == "") {
				SrfMaleSizes.rows.add(
					item.color_id,
					item.color,
					item.size_s,
					item.size_m,
					item.size_l,
					item.size_xl,
					item.size_2xl,
					item.size_3xl,
					item.size_4xl,
					item.style_code,
					item.size_xs,
					item.size_5xl,
					item.size_6xl
				);
			}
		});
		let SrfFemaleSizes = new sql.Table("dbo.transaction_srf_female_sizes");
		SrfFemaleSizes.columns.add("color_id", sql.Int);
		SrfFemaleSizes.columns.add("color", sql.NVarChar(100));
		SrfFemaleSizes.columns.add("size_xs", sql.Int);
		SrfFemaleSizes.columns.add("size_s", sql.Int);
		SrfFemaleSizes.columns.add("size_m", sql.Int);
		SrfFemaleSizes.columns.add("size_l", sql.Int);
		SrfFemaleSizes.columns.add("size_xl", sql.Int);
		SrfFemaleSizes.columns.add("size_2xl", sql.Int);
		SrfFemaleSizes.columns.add("size_3xl", sql.Int);
		SrfFemaleSizes.columns.add("style_code", sql.NVarChar(50));
		SrfFemaleSizes.columns.add("size_xss", sql.Int);
		SrfFemaleSizes.columns.add("size_4xl", sql.Int);
		SrfFemaleSizes.columns.add("size_5xl", sql.Int);

		req.body.SrfFemaleSizesData.forEach((item) => {
			// [].forEach((item) => {
			if (!item.color == "") {
				SrfFemaleSizes.rows.add(
					item.color_id,
					item.color,
					item.size_xs,
					item.size_s,
					item.size_m,
					item.size_l,
					item.size_xl,
					item.size_2xl,
					item.size_3xl,
					item.style_code,
					item.size_xxs,
					item.size_4xl,
					item.size_5xl
				);
			}
		});
		let SrfTrouserSizes = new sql.Table("dbo.transaction_srf_trouser_sizes");
		SrfTrouserSizes.columns.add("color_id", sql.Int);
		SrfTrouserSizes.columns.add("color", sql.NVarChar(100));
		SrfTrouserSizes.columns.add("size_28", sql.Int);
		SrfTrouserSizes.columns.add("size_30", sql.Int);
		SrfTrouserSizes.columns.add("size_32", sql.Int);
		SrfTrouserSizes.columns.add("size_34", sql.Int);
		SrfTrouserSizes.columns.add("size_36", sql.Int);
		SrfTrouserSizes.columns.add("size_38", sql.Int);
		SrfTrouserSizes.columns.add("size_40", sql.Int);
		SrfTrouserSizes.columns.add("size_42", sql.Int);
		SrfTrouserSizes.columns.add("size_44", sql.Int);
		SrfTrouserSizes.columns.add("size_other", sql.Int);
		SrfTrouserSizes.columns.add("style_code", sql.NVarChar(100));
		req.body.SrfTrouserSizesData.forEach((item) => {
			// [].forEach((item) => {
			if (!item.color == "") {
				SrfTrouserSizes.rows.add(
					item.color_id,
					item.color,
					item.size_28,
					item.size_30,
					item.size_32,
					item.size_34,
					item.size_36,
					item.size_38,
					item.size_40,
					item.size_42,
					item.size_44,
					item.size_other,
					item.style_code
				);
			}
		});
		let SrfAccessories = new sql.Table("dbo.transaction_srf_accessories");
		SrfAccessories.columns.add("accessories_id", sql.Int);
		SrfAccessories.columns.add("qty", sql.Decimal(18, 3));
		req.body.SrfAccessoriesData.forEach((item) => {
			SrfAccessories.rows.add(item.tran_id, item.qty);
		});
		let SrfPackaging = new sql.Table("dbo.transaction_srf_packaging");
		SrfPackaging.columns.add("packaging_id", sql.Int);
		SrfPackaging.columns.add("qty", sql.Decimal(18, 3));
		req.body.SrfPackagingData.forEach((item) => {
			SrfPackaging.rows.add(item.packaging_id, item.qty);
		});
		let SrfContrast = new sql.Table("dbo.transaction_srf_contrast");
		SrfContrast.columns.add("contrast_fabric_id", sql.Int);
		SrfContrast.columns.add("contrast_fabric", sql.NVarChar(100));
		SrfContrast.columns.add("color_id", sql.Int);
		SrfContrast.columns.add("contrast_color", sql.NVarChar(100));
		SrfContrast.columns.add("fabric_type", sql.NVarChar(50));
		req.body.SrfContrast.forEach((item) => {
			SrfContrast.rows.add(
				item.fabric_id,
				item.fabric_name,
				item.color_id,
				item.color,
				item.type
			);
		});
		let SrfColor = new sql.Table("dbo.transaction_srf_colors");
		SrfColor.columns.add("color_id", sql.Int);
		SrfColor.columns.add("color", sql.NVarChar(100));
		SrfColor.columns.add("type", sql.NVarChar(100));
		req.body.SrfColor.forEach((item) => {
			SrfColor.rows.add(item.color_id, item.color_name, item.type);
		});

		let SrfFabricTrim = new sql.Table("dbo.transaction_srf_fabric_trim");
		SrfFabricTrim.columns.add("fabric_trim_id", sql.Int);
		SrfFabricTrim.columns.add("qty", sql.Decimal(18, 3));
		req.body.SrfFabricTrim.forEach((item) => {
			SrfFabricTrim.rows.add(item.fabric_trim_id, item.qty);
		});
		let SrfCapSizes = new sql.Table("dbo.transaction_srf_cap_sizes");
		SrfCapSizes.columns.add("color_id", sql.Int);
		SrfCapSizes.columns.add("color", sql.NVarChar(100));
		SrfCapSizes.columns.add("adult", sql.Int);
		SrfCapSizes.columns.add("kid", sql.Int);
		SrfCapSizes.columns.add("style_code", sql.NVarChar(100));
		req.body.SrfCapSizesData.forEach((item) => {
			SrfCapSizes.rows.add(
				item.color_id,
				item.color,
				item.adult,
				item.kid,
				item.style_code
			);
		});

		let srfFabric = new sql.Table("dbo.transaction_srf_fabric");
		srfFabric.columns.add("fabric_type", sql.NVarChar(100));
		srfFabric.columns.add("unique_id", sql.NVarChar(100));
		srfFabric.columns.add("fabric_id", sql.Int);
		srfFabric.columns.add("fabric_name", sql.NVarChar(100));
		srfFabric.columns.add("internal_code", sql.NVarChar(100));
		srfFabric.columns.add("overall_blend", sql.NVarChar(100));
		srfFabric.columns.add("uom", sql.NVarChar(100));
		srfFabric.columns.add("pantone", sql.NVarChar(100));
		srfFabric.columns.add("fabric_color_id", sql.Int);
		srfFabric.columns.add("fabric_color", sql.NVarChar(100));
		srfFabric.columns.add("qty", sql.Decimal(18, 2));
		req.body.srfFabric.forEach((item) => {
			srfFabric.rows.add(
				item.type,
				item.unique_id,
				item.fabric_id,
				item.fabric_name,
				item.internal_code,
				item.overall_blend,
				item.uom,
				item.pantone,
				item.fabric_color_id ? item.fabric_color_id : item.color_id,
				item.color,
				item.qty
			);
		});
		let SrfTouserFemale = new sql.Table("transaction_srf_trouser_female_sizes");
		SrfTouserFemale.columns.add("color_id", sql.Int);
		SrfTouserFemale.columns.add("color", sql.NVarChar(100));
		SrfTouserFemale.columns.add("size_26", sql.Int);
		SrfTouserFemale.columns.add("size_28", sql.Int);
		SrfTouserFemale.columns.add("size_30", sql.Int);
		SrfTouserFemale.columns.add("size_32", sql.Int);
		SrfTouserFemale.columns.add("size_34", sql.Int);
		SrfTouserFemale.columns.add("size_36", sql.Int);
		SrfTouserFemale.columns.add("size_38", sql.Int);
		SrfTouserFemale.columns.add("size_40", sql.Int);
		SrfTouserFemale.columns.add("size_42", sql.Int);
		SrfTouserFemale.columns.add("style_code", sql.NVarChar(100));
		req.body.SrfTouserFemale.forEach((item) => {
			SrfTouserFemale.rows.add(
				item.color_id,
				item.color,
				item.size_26,
				item.size_28,
				item.size_30,
				item.size_32,
				item.size_34,
				item.size_36,
				item.size_38,
				item.size_40,
				item.size_42,
				item.style_code
			);
		});

		await sql
			.connect(config)
			.then((pool) => {
				return (
					pool
						.request()
						.input("srf_id", req.body.srf_id)
						.input("customer_id", req.body.customer_id)
						.input("srf_no", req.body.srf_no)
						.input("riv", req.body.riv)
						.input("date", req.body.date)
						.input("delivery_date", req.body.delivery_date)
						.input("contact1_id", req.body.contact1_id)
						.input("contact2_id", req.body.contact2_id)
						.input("style_code", req.body.style_code)
						.input("description", req.body.description)
						.input("fabric_id", req.body.fabric_id)
						.input("fabric_type", req.body.fabric_type)
						// .input("fabric_type", req.body.product_usage == "Cap" || "SweatShirt" || "T-Shirt" ? " Knitted Fabric" : "Woven Fabric")
						.input("fabric", req.body.fabric)
						.input("fabric_color_id", req.body.fabric_color_id)
						.input("fabric_color", req.body.fabric_color)
						.input("contrast_fabric", req.body.contrast_fabric)
						.input("contrast_fabric_color", req.body.contrast_fabric_color)
						.input("pattern", req.body.pattern)
						.input("fit", req.body.fit)
						.input("sleeves", req.body.sleeves)
						.input("placket_style", req.body.placket_style)
						.input("placket_color", req.body.placket_color)
						.input("placket_size", req.body.placket_size)
						.input("button_placket", req.body.button_placket)
						.input("product_usage", req.body.product_usage)
						.input("product_style", req.body.product_style)
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
						.input("special_instruction", req.body.special_instruction)
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
						.input("cap_adult_size_qty", req.body.cap_adult_size_qty)
						.input("cap_kid_size_qty", req.body.cap_kid_size_qty)
						.input("bottom_tipping", req.body.bottom_tipping)
						.input("bottom_tipping_color", req.body.bottom_tipping_color)
						.input("fabric_trim", req.body.fabric_trim)
						.input("fabric_trim_remarks", req.body.fabric_trim_remarks)
						.input("style_type", req.body.style_type)
						.input("collar_size", req.body.collar_size)
						.input("front_open_hoodie", req.body.front_open_hoodie)
						.input("closed_front_hoodie", req.body.closed_front_hoodie)
						.input("dori_outlet", req.body.dori_outlet)
						.input("total_qty", req.body.total_qty)
						.input("fusing_in_belt", req.body.fusing_in_belt)
						.input("pocketing_placement", req.body.pocketing_placement)
						.input("button_placket_color", req.body.button_placket_color)
						.input("kaaj_color", req.body.kaaj_color)
						.input("button_thread_color", req.body.button_thread_color)
						.input("srf_type", req.body.srf_type)
						.input("product_usage_id", req.body.product_usage_id)
						.input("style_id", req.body.style_id)
						// .input("type", req.body.type)
						.input("transaction_srf_branding", sql.TVP, SrfBranding)
						.input("transaction_srf_male_sizes", sql.TVP, SrfMaleSizes)
						.input("transaction_srf_female_sizes", sql.TVP, SrfFemaleSizes)
						.input("transaction_srf_trouser_sizes", sql.TVP, SrfTrouserSizes)
						.input("transaction_srf_accessories", sql.TVP, SrfAccessories)
						.input("transaction_srf_packaging", sql.TVP, SrfPackaging)
						.input("transaction_srf_contrast", sql.TVP, SrfContrast)
						.input("transaction_srf_colors", sql.TVP, SrfColor)
						.input("transaction_srf_fabric_trim", sql.TVP, SrfFabricTrim)
						.input("transaction_srf_cap_sizes", sql.TVP, SrfCapSizes)
						.input("transaction_srf_fabric", sql.TVP, srfFabric)
						.input(
							"transaction_srf_trouser_female_sizes",
							sql.TVP,
							SrfTouserFemale
						)
						.input("front_closure", req.body.front_closure)
						.input("collar_piping", req.body.collar_piping)
						.input("collar_piping_color", req.body.collar_piping_color)
						.input("srf_req_date", req.body.srf_req_date)
						.input("branch_id", req.body.branch_id)
						.input("user_id", req.user.user_id)
						.output("new_identity")
						.execute("transaction_srf_insert")
				);
			})
			.then((result) => {
				res.send({
					status: 200,
					valid: true,
					data: result.recordset[0].id,
				});
			})
			.catch((err) => {
				console.log('transaction_srf_insert 😎😎😎😎 ', err)
				res.send({
					status: 400,
					message: err,
				});
			});
	} catch (err) {
		res.status(500).send({
			status: 500,
			message: err,
		});
	}
});
// ?===browse of srf form ===////
exports.browseSRF = asyncHandler(async (req, res) => {
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
					.input("type", req.body.type)
					.execute("transaction_srf_browse");
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
//!===delete of srf form ===//
exports.DeleteSRF = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.execute("transaction_srf_delete");
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

//todo===preview of srf form ===// ///
exports.previewSRF = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.execute("transaction_srf_preview");
			})
			.then((result) => {
				if (result.recordset) {
					const obj = {
						data: {
							...result.recordsets[0][0],
							riv: result.recordsets[0][0]?.riv + 1,
						},
						branding: result.recordsets[1],
						malesize: result.recordsets[2],
						femalesize: result.recordsets[3],
						trouserSize: result.recordsets[4],
						accessories: result.recordsets[5],
						packaging: result.recordsets[6],
						contrast: result.recordsets[7],
					};
					res.send({
						status: 200,
						valid: true,
						...obj,
						attachment: result.recordset[8],
						srfcolor: result.recordsets[9],
						SrfFabricTrim: result.recordsets[10],
						capSizes: result.recordsets[11],
						Fabric: result.recordsets[12],
						srfTrouserFemale: result.recordsets[13],
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

//! prefix style code generation
exports.styleCode = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("style_id", req.body.style_id)
					.input("customer_id", req.body.customer_id)
					.input("user_id", req.user.user_id)
					.input("product_usage_id", req.body.product_usage_id)
					.execute("generate_srf_style_code");
			})
			.then((result) => {
				res.send({
					status: 200,
					valid: true,
					data: result.recordset[0].style_code,
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

//!insert attachment api//
exports.SrfAttachmentInsert = asyncHandler(async (req, res) => {
	try {
		if (req.files.length === -1) {
			res.send({
				status: 202,
				message: "Record Not Found",
			});
		}
		let srfAttach = new sql.Table("dbo.srf_attachment");
		srfAttach.columns.add("attachment_path", sql.NVarChar(sql.MAX));
		req.files.forEach((item) => {
			srfAttach.rows.add(item.path);
		});
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.input("srf_attachment", sql.TVP, srfAttach)
					.execute("transaction_srf_attachment_insert");
			})
			.then((result) => {
				res.send({
					status: 200,
					message: "success",
					valid: true,
					data: result.recordset,
					mailData: result.recordsets[1],
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

//? srf attachment preview
exports.attachmentSrf = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.execute("transaction_srf_attachment_preview");
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

//? print api for srf table //
exports.SrfPrint = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.execute("transaction_srf_print");
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
					// SrfFabricTrim: result.recordsets[7],
					attachement: result.recordsets[7],
					contrast: result.recordsets[8],
					srfcolor: result.recordsets[9],
					srfFabricTrimDetails: result.recordsets[10],
					capSizes: result.recordsets[11],
					Fabric: result.recordsets[12],
					SrfFemaleTrouser: result.recordsets[13],
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

//? list of woven fabric for shirts in srf//
exports.listWovenFabric = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("search", req.body.filter_value)
					.execute("list_woven_fabric");
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

//! list of knitted and woven fabric list_fabric_in_srf
exports.listKnitWovenFabric = asyncHandler(async (req, res) => {
	try {
		const filter = req.query;
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("search", req.body.filter_value)
					.input("type", req.body.fabric_type)
					.execute("list_fabric_in_srf");
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

// todo list of fabric trim maaster for srf
exports.listFabricTrim = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("search", req.body.filter_value)
					.execute("list_fabric_trim");
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

//todo delete attachment of image preview
exports.DeleteSRFimagePreview = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("tran_id", req.body.tran_id)
					.execute("transaction_srf_attachment_delete");
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

//SRF Send Maill Attachment
// function sendEmail(mailto, mailCC, subject, data) {
// 	var transporter = nodemailer.createTransport({
// 		service: "gmail",
// 		auth: {
// 			user: process.env.CLIENT_APP_ID,
// 			pass: process.env.GMAIL_CLIENT_APP_PASSWORD,
// 		},
// 	});
// 	var mailOptions = {
// 		from: process.env.CLIENT_APP_ID,
// 		to: mailto,
// 		cc: mailCC,
// 		subject: subject,
// 		html: `<div style="font-family: sans-serif">
//     <table
//       style="
//         max-width: 700px;
//         margin: 20px auto 10px;
//         border: solid 1px #ddd;
//         background-color: #fff;
//         border-top: solid 5px #da222b;
//         box-shadow: 0 -7px 0 #000;
//         font-size: 14px;
//         min-width: 600px;
//       "
//     >
//       <tbody>
//         <tr>
//           <td>
//             <table style="width: 100%">
//               <tr style="vertical-align: top">
//                 <td style="width: 50%; padding: 15px 15px 0">
//                   <p style="margin: 0">
//                     <img
//                       src="https://adminapi.brij.in/uploads/brij.png"
//                       alt="Brij"
//                       style="height: 85px"
//                     />
//                   </p>
//                 </td>
//                 <td style="width: 50%; text-align: right; padding: 15px">
//                   <img
//                     src="https://adminapi.brij.in/uploads/jcb.png"
//                     alt="Brij"
//                     style="
//                       height: 85px;
//                       max-width: 100px;
//                       object-fit: contain;
//                     "
//                   />
//                 </td>
//               </tr>
//             </table>
//           </td>
//         </tr>
//         <tr>
//           <td style="padding: 0 15px">
//             <p
//               style="
//                 text-align: center;
//                 font-weight: bold;
//                 color: #da222b;
//                 font-size: 20px;
//                 margin-top: 0;
//               "
//             >
//               Let's get you signed in
//             </p>
//             <p>Hi ${user}</p>
//             <p style="margin: 0; line-height: 1.5">
//               Only one step left to login into the portal. Please use this
//               code
//             </p>
//             <p
//               style="
//                 background-color: #e6e6e6;
//                 padding: 10px;
//                 color: #000;
//                 text-align: center;
//                 font-weight: bold;
//                 font-size: 20px;
//                 margin-bottom: 0;
//               "
//             >
//               <span>${otp}</span>
//             </p>
//             <p style="text-align: center; font-size: 12px; margin-top: 5px">
//               This code is valid for the next 10 minutes
//             </p>
//             <p style="margin-top: 30px; font-size: 13px">
//               OTP Generate on ${moment().format("lll")}
//             </p>
//             <p style="font-size: 17px; margin-top: 30px; margin-bottom: 10px">
//               Have questions or trouble logging in?
//             </p>
//             <p style="margin: 0; margin-bottom: 30px">
//               Just reply to this email or contact
//               <a
//                 href="mailto:client.support@brij.com"
//                 style="
//                   text-decoration: none;
//                   color: #da222b;
//                   font-weight: 500;
//                 "
//                 >client.support@brij.com</a
//               >
//             </p>
//           </td>
//         </tr>
//         <tr>
//           <td
//             style="
//               background-color: #000;
//               color: #fff;
//               padding: 10px;
//               margin-top: 20px;
//               font-size: 11px;
//             "
//           >
//             <table style="width: 100%">
//               <tr>
//                 <td style="vertical-align: top">
//                   <p style="margin: 0 0 6px; line-height: 1.4">
//                     <a style="color: #fff; text-decoration: none" href="tel:"
//                       >&#9742; +919650076390</a
//                     >
//                     <br />
//                     <a
//                       style="color: #fff; text-decoration: none"
//                       href="mailto:"
//                       >&#x2709; client.support@brij.com</a
//                     >
//                   </p>
//                 </td>
//                 <td style="text-align: right; vertical-align: top">
//                   <p style="margin: 0; line-height: 1.4">
//                     <strong>Address:</strong>
//                     ‘Brij House’ A-1/2 Wazirpur <br />
//                     Industrial Area, Delhi-110052, India
//                   </p>
//                 </td>
//               </tr>
//               <tr>
//                 <td
//                   colspan="2"
//                   style="
//                     text-align: center;
//                     border-top: solid 1px #333;
//                     padding-top: 11px;
//                   "
//                 >
//                   <span
//                     >© ${new Date().getFullYear()} - All
//                     Rights Reserved. - Developed & Maintained by Brij &
//                     Co.</span
//                   >
//                 </td>
//               </tr>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </div>`,
// 	};

// 	transporter.sendMail(mailOptions, function (error, info) {
// 		if (error) {
// 			console.log("error");
// 		}
// 	});
// }
// exports.SendSrfMail = asyncHandler(async (req, res) => {
// 	try {
// 		const toList = req.body.to;
// 		const ccList = req.body.cc;
// 		await sql
// 			.connect(config)
// 			.then((pool) => {
// 				return pool.request().execute("transaction_srf_browse");
// 			})
// 			.then((result) => {
// 				sendEmail(toList.join(", "), ccList.join(", "), "SRF Entry", req.body);
// 				res.send({
// 					status: 200,
// 					valid: true,
// 					data: result.recordset,
// 				});
// 			})
// 			.catch((err) => {
// 				res.send({
// 					status: 400,
// 					message: err,
// 				});
// 			});
// 	} catch (error) {
// 		res.status(500).send({
// 			status: 500,
// 			message: error,
// 		});
// 	}
// });

// final delivery date api for srf
exports.SrfFinalDeliveryDate = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.input("final_delivery_date", req.body.final_delivery_date)
					.input("user_id", req.user.user_id)
					.execute("transaction_srf_update_final_delivery_date");
			})
			.then((result) => {
				// sendNotifyJobsheetReadyDateEmail(req.body, req.body.customer_name);
				res.send({
					status: 200,
					valid: true,
					data: result,
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
exports.UpdateTransactionSRF = asyncHandler(async (req, res) => {
	try {
		await sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("srf_id", req.body.srf_id)
					.input("status", req.body.status)
					.input("status_remarks", req.body.status_remarks)
					.execute("update_transaction_srf_status");
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
