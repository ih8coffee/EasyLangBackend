const jwt = require("jsonwebtoken");

const rbac = allowedRoles => {
  return async (req, res, next) => {
    try {
      if (!allowedRoles.includes(req.user.role)) {
        throw new Error("Access denied.");
      }
      next();
    } catch (error) {
      res.status(403).send({ error: "Access denied." });
    }
  };
};

module.exports = rbac;
