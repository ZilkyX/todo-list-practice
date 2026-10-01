import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";
import Task from "./model/task.model.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT;

const app = express();

//middleware - function in between request and response
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//create
app.post("/api/task", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res
        .status(400)
        .json({ success: false, error: "Title and content must be provided." });

    const task = new Task({
      title,
      content,
    });

    await task.save();

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.log("Error in creating a task.", error);
    res.status(500).json({ success: false, error: error });
  }
});

//fetch
app.get("/api/task", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log("Error in fetching tasks.", error);
    res.status(500).json({ success: false, error: error });
  }
});

//delete
app.delete("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.log("Error in deleting a task.", error);
    res.status(500).json({ success: false, error: error });
  }
});

//update
app.put("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({
        error: "All fields are required.",
      });

    const task = await Task.findById(id);

    if (!task)
      return res.status(404).json({
        error: "Task not found.",
      });

    const updatedTask = await Task.findByIdAndUpdate(id, { title, content });

    res.status(200).json({
      success: true,
      updatedTask,
    });
  } catch (error) {
    console.log("Error in updating a task.", error);
    res.status(500).json({ success: false, error: error });
  }
});

// get task by id
app.get("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ error: "Task not found." });

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getting a task.", error);
    res.status(500).json({ success: false, error: error });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

//server
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDB();
});
