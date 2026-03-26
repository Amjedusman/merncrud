import API from "./axios";

// Get tasks
export const getTasks = () => API.get("/tasks");

// Create task
export const createTask = (data) => API.post("/tasks", data);

// Update task
export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

// Delete task
export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);