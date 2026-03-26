import Task from "../models/Task.js";

// ➕ Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📖 Get Tasks
export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "name email");
    } else {
      tasks = await Task.find({ user: req.user._id });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Authorization check
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Authorization check
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
