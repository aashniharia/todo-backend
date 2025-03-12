import mongoose, { Schema } from "mongoose";
const subTodoSchema = new Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  isComplete: { type: Boolean, default: false },
});

const todoSchema = new Schema({
  title: { type: String, required: true },
  subTodos: [subTodoSchema], // Array of subtodos
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
