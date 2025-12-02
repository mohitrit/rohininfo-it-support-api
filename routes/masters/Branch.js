

const { authenticateToken } = require("../../authentication/auth");
const { insertBranch, browseBranch, disableBranch, previewBranch, deleteBranch, UpdateUserFilter, getUserFilter, listBranch, listUpdatedbranch } = require("../../controller/Masters/branch");

const BranchRoutes = require("express").Router();

BranchRoutes.post("/Masters_branch_insert", authenticateToken, insertBranch);
BranchRoutes.post("/Masters_branch_browse", authenticateToken, browseBranch);
BranchRoutes.post("/Masters_branch_disable", authenticateToken, disableBranch);
BranchRoutes.post("/Masters_branch_preview", authenticateToken, previewBranch);
BranchRoutes.post("/Masters_branch_delete", authenticateToken, deleteBranch);
BranchRoutes.post("/update_user_filter",authenticateToken, UpdateUserFilter);
BranchRoutes.get("/get_user_filter",authenticateToken, getUserFilter);
BranchRoutes.post("/list_branch", listBranch);
BranchRoutes.post("/list_branch_user",authenticateToken, listUpdatedbranch);


module.exports = { BranchRoutes };
