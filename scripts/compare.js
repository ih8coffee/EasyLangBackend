const bcrypt = require("bcryptjs");
const password = "password123";

// Hash the password
bcrypt.hash(password, 8, (err, hashedPassword) => {
  if (err) {
    console.error("Failed to hash the password:", err);
    return;
  }
  console.log("Password hashed successfully:", hashedPassword);

  // Compare with hash inside the hash callback
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.error("Failed to compare the password:", err);
      return;
    }
    console.log("Password compared successfully:", result);
  });
});
