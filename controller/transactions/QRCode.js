const sql = require("mssql");
const { config } = require("../../config/config");
const asyncHandler = require("express-async-handler");
const { filterData } = require("../filter");
// srf pick for qr code generation
exports.QrSrfPick = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("pick_srf_main_in_qr");
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
// exports.PickSrfDetailsQr = asyncHandler(async (req, res) => {
//   try {
//     await sql
//       .connect(config)
//       .then((pool) => {
//         return pool
//           .request()
//           .input("srf_id", req.body.srf_id)
//           .execute("pick_srf_details_in_qr");
//       })
//       .then((result) => {
//         const femaleArray = [];
//         const maleArray = [];
//         const trouserArray = [];
//         const capArray = [];
//         const type = req.body.type;
//         const style_code = req.body.style_code;
//         const product_type = req.body.product_usage;
//         if (result.recordsets[0].length > 0) {
//           result.recordsets[0].forEach((val) => {
//             for (let key in val) {
//               if (val[key] && key !== "color" && key !== "prefix") {
//                 const size = key.slice(4, 5);
//                 const qr_code = `${style_code}/${type}/CS/${val.prefix}/${size.toUpperCase()}`;
//                 const trouserObj = {
//                   size: size,
//                   qty: val[key],
//                   qr_code: qr_code,
//                   color: val.color,
//                   type: 'CS',
//                   prefix: val.prefix,
//                   style_code: style_code,
//                 };
//                 capArray.push(trouserObj);
//               }
//             }
//           });
//         }

//         if (result.recordsets[1].length > 0) {
//           const sizeMappingFemal = {
//             size_xs: 30,
//             size_s: 32,
//             size_m: 34,
//             size_l: 36,
//             size_xl: 38,
//             size_2xl: 40,
//             size_3xl:42,
//           };
//           result.recordsets[1].forEach((val, index) => {
//             for (let key in val) {
//               let objvalFemal = {};
//               if (val[key] && key !== "color" && key !== "prefix") {
//                 objvalFemal[key] = val[key];
//                 // const sizeKey = key.slice(5).toLowerCase();
//                 // const numericSize = sizeMapping[sizeKey] || sizeKey;
//                 objvalFemal.size = key.slice(5);
//                 objvalFemal.qr_code = `${type}/FS/${val.prefix}/${ product_type==="Shirt"?sizeMappingFemal[key]:key.slice(5).toUpperCase()}`;
//                 objvalFemal.qty = val[key];
//                 objvalFemal.type = 'FS';
//                 objvalFemal.color = val.color;
//                 objvalFemal.prefix = val.prefix;
//                 objvalFemal.style_code = type;
//                 femaleArray.push(objvalFemal);
//               }
//             }
//           });
//         }



//         // Process male sizes
//         if (result.recordsets[2].length > 0) {
//           const MALESIZE = {
//             size_s: 36, size_m: 38, size_l: 40, size_xl: 42, size_2xl: 44, size_3xl: 46, size_4xl: 48,
//           }
//           result.recordsets[2].forEach((val, index) => {
//             for (let key in val) {
//               let objValMale = {};
//               if (val[key] && key !== "color" && key !== "prefix") {
//                 objValMale[key] = val[key];
//                 objValMale.color = val.color;
//                 objValMale.qr_code = `${type}/MS/${val.prefix}/${ product_type==="Shirt"?MALESIZE[key]:key.slice(5).toUpperCase()}`
//                 objValMale.size = key.slice(5);
//                 objValMale.type = 'MS';
//                 objValMale.qty = val[key];
//                 objValMale.prefix = val.prefix;
//                 objValMale.style_code = type;
//                 maleArray.push(objValMale);
//               }
//             }
//           });
//         }
//         // Process trouser sizes
//         if (result.recordsets[3]?.length > 0) {
//           result.recordsets[3].forEach((val, index) => {
//             for (let key in val) {
//               if (val[key] && key !== "color" && key !== "prefix") {
//                 const trouserObj = {
//                   size: key.slice(5),
//                   qty: val[key],
//                   qr_code: `${type}/TS/${val.prefix}/${key.slice(5).toUpperCase()}`,
//                   color: val.color,
//                   type: 'TS',
//                   prefix: val.prefix,
//                   style_code: type,
//                 };
//                 trouserArray.push(trouserObj);
//               }
//             }
//           });
//         }

//         res.send({
//           status: 200,
//           cap: capArray,
//           female: femaleArray,
//           male: maleArray,
//           trouser: trouserArray,
//           valid: true,
//         });
//       })
//       .catch((err) => {
//         
//         res.send({
//           status: 400,
//           message: err,
//         });
//       });
//   } catch (error) {
//     
//     res.status(500).send({
//       status: 500,
//       message: error,
//     });
//   }
// });

exports.PickSrfDetailsQr = asyncHandler(async (req, res) => {
  try {
    await sql.connect(config)
      .then((pool) => {
        return pool.request()
          .input("srf_id", req.body.srf_id)
          .execute("pick_srf_details_in_qr");
      })
      .then((result) => {
        const femaleArray = [];
        const maleArray = [];
        const trouserArray = [];
        const capArray = [];
        const type = req.body.type;
        const style_code = req.body.style_code;
        const product_type = req.body.product_usage;

        // Process cap sizes

        if (result.recordsets[0].length > 0) {
          result.recordsets[0].forEach((val) => {
            for (let key in val) {
              if (val[key] && key !== "color" && key !== "prefix" && key !== "style_code") {
                const size = key.slice(0, 1);
                const qr_code = `${val.style_code}/${val.prefix}/${size.toUpperCase()}`;
                // const qr_code = `${val.style_code}/${type}/${val.prefix}/${size.toUpperCase()}`;
                const capObj = {
                  size: size,
                  qty: val[key],
                  qr_code: qr_code,
                  color: val.color,
                  type: 'CS',
                  prefix: val.prefix,
                  style_code: val.style_code,
                };
                capArray.push(capObj);
              }
            }
          });
        }

        // Process female sizes
        if (result.recordsets[1].length > 0) {
          const sizeMappingFemal = {
            size_xs: 30,
            size_s: 32,
            size_m: 34,
            size_l: 36,
            size_xl: 38,
            size_2xl: 40,
            size_3xl: 42,
            style_code: '',
          };
          result.recordsets[1].forEach((val) => {
            for (let key in val) {
              let objvalFemal = {};
              if (val[key] && key !== "color" && key !== "prefix" && key !== "style_code") {
                objvalFemal[key] = val[key];
                objvalFemal.size = key.slice(5);
                objvalFemal.qr_code = `${val.style_code}/${val.prefix}/${product_type === "Shirt" ? sizeMappingFemal[key] : key.slice(5).toUpperCase()}`;
                // objvalFemal.qr_code = `${val.style_code}/${type}/${val.prefix}/${product_type === "Shirt" ? sizeMappingFemal[key] : key.slice(5).toUpperCase()}`;
                objvalFemal.qty = val[key];
                objvalFemal.type = 'FS';
                objvalFemal.color = val.color;
                objvalFemal.prefix = val.prefix;
                objvalFemal.style_code = val.style_code;
                femaleArray.push(objvalFemal);
              }
            }
          });
        }

        // Process male sizes
        if (result.recordsets[2].length > 0) {
          const MALESIZE = {
            size_s: 36,
            size_m: 38,
            size_l: 40,
            size_xl: 42,
            size_2xl: 44,
            size_3xl: 46,
            size_4xl: 48,
            style_code: '',
          };
          result.recordsets[2].forEach((val) => {
            for (let key in val) {
              let objValMale = {};
              if (val[key] && key !== "color" && key !== "prefix" && key !== "style_code") {
                objValMale[key] = val[key];
                objValMale.color = val.color;
                objValMale.qr_code = `${val.style_code}/${val.prefix}/${product_type === "Shirt" ? MALESIZE[key] : key.slice(5).toUpperCase()}`;
                // objValMale.qr_code = `${val.style_code}/${type}/${val.prefix}/${product_type === "Shirt" ? MALESIZE[key] : key.slice(5).toUpperCase()}`;
                objValMale.size = key.slice(5);
                objValMale.type = 'MS';
                objValMale.qty = val[key];
                objValMale.prefix = val.prefix;
                objValMale.style_code = val.style_code;
                maleArray.push(objValMale);
              }
            }
          });
        }

        // Process trouser sizes
        if (result.recordsets[3]?.length > 0) {
          result.recordsets[3].forEach((val) => {
            for (let key in val) {
              if (val[key] && key !== "color" && key !== "prefix" && key !== "style_code") {
                const trouserObj = {
                  size: key.slice(5),
                  qty: val[key],
                  qr_code: `${val.style_code}/${val.prefix}/${key.slice(5).toUpperCase()}`,
                  // qr_code: `${val.style_code}/${type}/${val.prefix}/${key.slice(5).toUpperCase()}`,
                  color: val.color,
                  type: 'TS',
                  prefix: val.prefix,
                  style_code: val.style_code,
                };
                trouserArray.push(trouserObj);
              }
            }
          });
        }

        res.send({
          status: 200,
          cap: capArray,
          female: femaleArray,
          male: maleArray,
          trouser: trouserArray,
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


// insert of qr code generation
exports.insertQrcode = asyncHandler(async (req, res) => {
  try {
    let QrDetails = new sql.Table("dbo.transaction_srf_qr_details");
    QrDetails.columns.add("qr_code", sql.NVarChar(100));
    QrDetails.columns.add("style_code", sql.NVarChar(100));
    QrDetails.columns.add("type", sql.NVarChar(100));
    QrDetails.columns.add("color", sql.NVarChar(100));
    QrDetails.columns.add("size", sql.NVarChar(100));
    QrDetails.columns.add("qty", sql.Int);
    QrDetails.columns.add("usp", sql.NVarChar(sql.MAX));
    req.body.QrDetails.forEach((item) => {
      QrDetails.rows.add(
        item.qr_code,
        item.style_code,
        item.type,
        item.prefix,
        item.size,
        item.qty,
        item.usp
      );
    });
    await sql
      .connect(config)
      .then((pool) => {
        return (
          pool
            .request()
            .input("tran_id", req.body.tran_id)
            .input("entry_no", req.body.entry_no)
            .input("date", req.body.date)
            .input("srf_id", req.body.srf_id)
            .input("style_code", req.body.style_code)
            .input("transaction_srf_qr_details", sql.TVP, QrDetails)
            // .input("user_id", 0)
            .input("user_id", req.user.user_id)
            .output("new_identity")
            .execute("transaction_srf_qr_insert")
        );
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
  } catch (err) {

    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
});

// preview of qr code
exports.previewQrcode = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_srf_qr_preveiw");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          QrDetails: result.recordsets[1],
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

// browse of qr code

exports.browseQrcode = asyncHandler(async (req, res) => {
  try {
    const filter = req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("user_id", req.user.user_id)
          .input("search", req.body.filter_value)
          .execute("transaction_srf_qr_browse");
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

// delete ========

exports.DeleteQrcode = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_srf_qr_delete");
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


//! Print Api of qr code 
exports.printQrcode = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("transaction_srf_qr_print");
      })
      .then((result) => {
        res.send({
          status: 200,
          valid: true,
          data: result.recordsets[0][0],
          QrDetails: result.recordsets[1],
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
