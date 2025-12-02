const { authenticateToken } = require("../../authentication/auth");
const { UserInsert, browseUser, previewUser, deleteUser, disableUser, uploadUserProfile, attachmentProfile } = require("../../controller/Masters/users");
const { imageUpload } = require("../../File/File");

const UsersRoutes = require("express").Router();

UsersRoutes.post("/Masters_user_insert", authenticateToken, UserInsert);
UsersRoutes.post("/Masters_user_browse", authenticateToken, browseUser);
UsersRoutes.post("/Masters_user_preview", authenticateToken, previewUser);
UsersRoutes.post("/Masters_user_delete", authenticateToken, deleteUser);
UsersRoutes.post("/Masters_user_disable",  disableUser);
UsersRoutes.post("/masters_user_update_pic", imageUpload("uploads/userProfile", 20).single("file_path"),
    uploadUserProfile)
module.exports = { UsersRoutes };
UsersRoutes.get("/masters_user_profile_image_preview",authenticateToken, attachmentProfile);
