const { usp_RIT_BrowseUsers } = require("../../controller/Masters/users");

const masterUsersRoutes = require("express").Router();

masterUsersRoutes.post("/usp_RIT_BrowseUsers", usp_RIT_BrowseUsers);

module.exports = { masterUsersRoutes };
