const { usp_RIT_BrowseUsers, usp_RIT_InsertOrUpdateUser } = require("../../controller/Masters/users");

const masterUsersRoutes = require("express").Router();

masterUsersRoutes.post("/usp_RIT_BrowseUsers", usp_RIT_BrowseUsers);
masterUsersRoutes.post("/usp_RIT_InsertOrUpdateUser", usp_RIT_InsertOrUpdateUser);

module.exports = { masterUsersRoutes };
