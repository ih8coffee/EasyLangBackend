const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");

// Creating a new user requires authentication
router.post(
  "/users",
  auth,
  rbac(["projectManager"]),
  UserController.createUser
);

// Listing all users: Restricted to PMs or editors
// PMs can see all users, editors can see users within their projects
router.get(
  "/users",
  auth,
  async (req, res, next) => {
    if (["projectManager", "manager", "admin"].includes(req.user.role)) {
      if (req.user.role === "projectManager" || req.user.role === "admin") {
        return next();
      } else if (req.user.role === "manager") {
        req.isEditor = true;
        return next();
      }
    } else {
      return res.status(403).send({ error: "Access denied." });
    }
  },
  UserController.getAllUsers
);

// Fetch a user's own profile: Requires authentication
router.get("/users/me", auth, UserController.getOwnProfile);

router.put("/users/me", auth, UserController.updateOwnProfile);

// Fetching a user by ID: Requires authentication
router.get("/users/:id", auth, UserController.getUserById);

// Updating a user role: Requires being a PM
router.patch(
  "/users/:id/role",
  auth,
  rbac(["projectManager"]),
  UserController.updateUserRole
);

// Deleting a user: Requires being a PM
router.delete(
  "/users/:id",
  auth,
  rbac(["projectManager"]),
  UserController.deleteUser
);

module.exports = router;
