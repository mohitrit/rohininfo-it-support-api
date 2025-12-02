const multer = require("multer");
const path = require("path");
exports.imageUpload = function (filePath, fileSize, fileLink) {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name path
        cb(null, filePath);
      },
      // dest: './uploads/',
      filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        var filename = path.basename(file.originalname, ext);
        cb(null, filename + "-" + Date.now() + ext);
      },
    }),
    // file size
    limits: { fileSize: 1024 * 1024 * fileSize },
    fileFilter: function (req, file, cb) {
      // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png|pdf/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(
        "Error: File upload only supports the " +
          "following filetypes - " +
          filetypes
      );
    },
  });
};
