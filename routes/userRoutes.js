const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");

// Creating a new user requires authentication
router.post("/users", auth, rbac(["pm"]), UserController.createUser);

// Listing all users: Restricted to PMs or editors
// PMs can see all users, editors can see users within their projects
router.get(
  "/users",
  auth,
  async (req, res, next) => {
    if (["pm", "editor"].includes(req.user.role)) {
      if (req.user.role === "pm") {
        return next();
      } else if (req.user.role === "editor") {
        req.isEditor = true;
        return next();
      }
    } else {
      return res.status(403).send({ error: "Access denied." });
    }
  },
  UserController.getAllUsers
);

// Fetching a user by ID: Requires authentication
router.get("/users/:id", auth, UserController.getUserById);

// Updating a user role: Requires being a PM
router.patch(
  "/users/:id/role",
  auth,
  rbac(["pm"]),
  UserController.updateUserRole
);

// Deleting a user: Requires being a PM
router.delete("/users/:id", auth, rbac(["pm"]), UserController.deleteUser);

module.exports = router;
