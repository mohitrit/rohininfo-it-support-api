const { authenticateToken } = require("../../authentication/auth");
const {
	UserRightsInsert,
	browseUserRights,
	previewUserRights,
	DeleteUserRights,
	insertOrUpdateUserRights,
	browseUserRightsByRole,
	listUserRole,
	browseUserRightsByRolee,
} = require("../../controller/userRights/userRights");

const userRightsRoutes = require("express").Router();

userRightsRoutes.post(
	"/insert_or_update_user_role",
	authenticateToken,
	UserRightsInsert
);
userRightsRoutes.post("/browse_user_roles", browseUserRights);
userRightsRoutes.post("/preview_user_role", previewUserRights);
userRightsRoutes.post("/delete_user_role", DeleteUserRights);
userRightsRoutes.post(
	"/insert_or_update_web_user_rights",
	authenticateToken,
	insertOrUpdateUserRights
);
userRightsRoutes.get(
	"/browse_user_rights_by_role",
	authenticateToken,
	browseUserRightsByRole
);
userRightsRoutes.get(
	"/browse_user_rights_by_rolee",
	authenticateToken,
	browseUserRightsByRolee
);
userRightsRoutes.post("/user_role_list", listUserRole);

module.exports = { userRightsRoutes };
