const axios = require("axios");

const baseURL = "http://localhost:3000/api"; // Adjust this to your actual API base URL
const pmCredentials = {
  email: "pm@example.com", // Use the actual PM account email
  password: "password123", // Use the actual PM account password
};

const performPmActions = async () => {
  let createdUserId;

  try {
    // Step 1: Authenticate as PM
    const loginResponse = await axios.post(
      `${baseURL}/auth/login`,
      pmCredentials
    );
    const token = loginResponse.data.token; // Adjust according to your response structure

    // Step 2: Create a new user
    const createUserResponse = await axios.post(
      `${baseURL}/users`,
      {
        username: "testUser",
        email: "testUser@example.com",
        password: "password123",
        role: "worker", // Specify role as needed
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Create User Response:", createUserResponse.data);
    createdUserId = createUserResponse.data._id; // Adjust according to your response structure

    // Step 3: Add feedback for the created user (example action)
    const addFeedbackResponse = await axios.post(
      `${baseURL}/feedback`,
      {
        userId: createdUserId,
        feedback: "Great work on the project!",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Add Feedback Response:", addFeedbackResponse.data);

    // Perform more actions as needed...

    // Undo Actions: Delete the created user to clean up
    if (createdUserId) {
      const deleteResponse = await axios.delete(
        `${baseURL}/users/${createdUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Deleted User Response:", deleteResponse.data);
    }
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data);
    } else if (error.request) {
      console.error("Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
};

performPmActions();
