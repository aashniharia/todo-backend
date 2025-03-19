import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../db/index.js";
import Todo from "../models/todo.models.js";
dotenv.config();
const app = express();
console.log("Server has started");
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on Port :${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("express app error: ", error);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection failed!!", error);
  });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  console.log("request for server health");
  res.status(200).json({ status: "ok" });
});

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/todos/:todoId/subtodos", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.subTodos.push(req.body);
    await todo.save();
    res.status(201).json(todo.subTodos[todo.subTodos.length - 1]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update subtodo
app.put("/api/todos/:todoId/subtodos/:subTodoId", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const subTodo = todo.subTodos.id(req.params.subTodoId);
    if (!subTodo) {
      return res.status(404).json({ message: "Subtodo not found" });
    }

    Object.assign(subTodo, req.body);
    await todo.save();
    res.json(subTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete subtodo
app.delete("/api/todos/:todoId/subtodos/:subTodoId", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.subTodos.pull(req.params.subTodoId);
    await todo.save();
    res.json({ message: "Subtodo deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete todo (existing route)
app.delete("/api/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all todos with their subtodos (existing endpoint)
app.get("/api/todos", async (req, res) => {
  try {
    console.log("Fetching todos");
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get subtodos for a specific todo
app.get("/api/todos/:todoId/subtodos", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo.subTodos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific subtodo
app.get("/api/todos/:todoId/subtodos/:subTodoId", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const subTodo = todo.subTodos.id(req.params.subTodoId);
    if (!subTodo) {
      return res.status(404).json({ message: "Subtodo not found" });
    }

    res.json(subTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
