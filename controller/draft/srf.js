const jsonRoute = require("express").Router();//
const fs = require("fs");
const { type } = require("os");
const srfData = "./jsonfile/srf.json";
const jsonWriteFile = (users, res) => {
  fs.writeFile(srfData, JSON.stringify(users), (err) => {
    if (err) {
      res.status(500).json({
        message: `Error writing file ${err}`,
        status: 500,
      });
    } else {
      res.status(200).json({
        message: "Successfully wrote file",
        status: 200,
        valid: true,
      });
    }
  });
};
//
// const filterData = async (user_id, browse_id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       fs.readFile(jsonFile, "utf8", function (err, data) {
//         if (err) throw err;
//         const [users] = JSON.parse(data).filter(
//           (val) => val.user_id == user_id && val.browse_id == browse_id
//         );
//         if (users) {
//           resolve({ valid: true, ...users });
//         } else {
//           resolve({ valid: false });
//         }
//       });
//     } catch (err) {
//       res.json({
//         message: err,
//         status: 500,
//       });
//     }
//   });
// };

exports.getSrfDraftData = async (req, res) => {
  try {
    const user_id= req.user.user_id;
    fs.readFile(srfData, "utf8", async function (err, data) {
      if (err) throw err;
      const usersdata = data.length>0?JSON.parse(data).filter(
        (val) => val.user_id == user_id
      ):[];
      const users=usersdata.length>0?usersdata[0]:null
      if (users) {

        res.status(200).json({
          message: "success",
          status: 200,
          data:users,
          valid: true,
        });
      } else {
        res.status(201).json({
          message: "No Record",
          valid: false,
        });
      }
    //   req.filter = await filterData(user_id, browse_id);
    //   next();
    });
  } catch (err) {
    res.json({
      message: err,
      status: 500,
    });
  }
};
exports.deleteDraftData = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    // const jsonData ={ ...req.body,user_id};
    if (user_id) {
      fs.readFile(srfData, "utf8", function (err, data) {
        if (err) throw err;
        let users = JSON.parse(data);
        const indexOfArray = users.findIndex((val) => {
          return (
            val.user_id == user_id
          );
        });
        if (indexOfArray > -1) {
          users.splice(indexOfArray, 1);
          jsonWriteFile(users, res);
        } else{
          res.json({
            message: "Data Not Found",
            status: 404,
            type:true
          });
        }
      });
    } else {
      throw "please enter valid user id and browse id";
    }
  } catch (err) {
    res.json({
      message: err,
      status: 500,
    });
  }
};
exports.writeSrfDraft = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const jsonData ={ ...req.body,user_id};
    if (user_id) {
      fs.readFile(srfData, "utf8", function (err, data) {
        if (err) throw err;
        let users = JSON.parse(data);
        const indexOfArray = users.findIndex((val) => {
          return (
            val.user_id == user_id
          );
        });
        if (indexOfArray > -1) {
          users.splice(indexOfArray, 1, jsonData);
          jsonWriteFile(users, res);
        } else {
          users.push(jsonData);
          jsonWriteFile(users, res);
        }
      });
    } else {
      throw "please enter valid user id and browse id";
    }
  } catch (err) {
    res.json({
      message: err,
      status: 500,
    });
  }
};

