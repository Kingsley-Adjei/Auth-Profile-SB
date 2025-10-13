import { createTask, getTask } from "../service/taskService.js";

export const getTaskController = async (req, res) => {
  try {
    const task = await getTask();
    if (!task.data) {
      return res.status(404).json({
        success: false,
        message: "No Task found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task gotten successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const createTaskController = async (req, res) => {
  try {
    const { title, description, requirements } = req.body;

    if (!title || !requirements) {
      return res.status(400).json({
        success: false,
        message: "Title and requirements are required",
      });
    }

    const Task = await createTask(title, description, requirements);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: Task,
    });
    if (!Task.data) {
      return res.status(400).json({
        success: false,
        message: "Failed to create Task",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
