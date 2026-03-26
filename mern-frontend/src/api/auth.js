import API from "./axios";

// Register
export const registerUser = (data) => API.post("/auth/register", data);

// Login
export const loginUser = (data) => API.post("/auth/login", data);