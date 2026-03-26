import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../api/tasks";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // 🔄 Fetch tasks
  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Create task
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await createTask({ title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Start editing
  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // 💾 Save update
  const handleUpdate = async (id) => {
    try {
      await updateTask(id, {
        title: editTitle,
        description: editDescription,
      });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl mb-4">Dashboard</h1>

      <p>Welcome, {user?.name}</p>
      <p className="mb-4">Role: {user?.role}</p>

      <button
        onClick={logout}
        className="mb-4 bg-red-500 px-4 py-2"
      >
        Logout
      </button>

      {/* ➕ Create Task */}
      <form onSubmit={handleCreate} className="mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-2 text-black mr-2"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 text-black mr-2"
        />
        <button className="bg-blue-500 px-4 py-2">
          Add
        </button>
      </form>

      {/* 📋 Task List */}
      <div>
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800 p-4 mb-3"
          >
            {editingId === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="p-2 text-black mr-2"
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="p-2 text-black mr-2"
                />

                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-green-500 px-2 mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 px-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{task.title}</p>
                  <p className="text-sm text-gray-400">
                    {task.description}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 px-2 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 px-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;