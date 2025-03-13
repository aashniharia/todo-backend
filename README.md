# 📌 TODO App API

A simple and efficient RESTful API for managing TODO lists, built with Node.js and Express. It supports creating, updating, deleting, and retrieving TODOs and their subtasks.

## 🚀 Features

- CRUD operations for TODOs and subtasks
- MongoDB integration using Mongoose
- Environment variables support using `dotenv`
- CORS enabled
- Error handling middleware

## 📡 API Endpoints

### Base URL
The API is hosted at:
**[Tidy Tasks API](https://tidy-tasks-dev.netlify.app/)**

### TODOs
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/todos`         | Get all TODOs            |
| POST   | `/api/todos`         | Create a new TODO        |
| PUT    | `/api/todos/:id`     | Update a TODO            |
| DELETE | `/api/todos/:id`     | Delete a TODO            |

### SubTODOs
| Method | Endpoint                                  | Description                     |
|--------|------------------------------------------|---------------------------------|
| GET    | `/api/todos/:todoId/subtodos`           | Get all subtodos for a TODO     |
| GET    | `/api/todos/:todoId/subtodos/:subTodoId` | Get a specific subtodo          |
| POST   | `/api/todos/:todoId/subtodos`           | Create a new subtodo            |
| PUT    | `/api/todos/:todoId/subtodos/:subTodoId` | Update a subtodo                |
| DELETE | `/api/todos/:todoId/subtodos/:subTodoId` | Delete a subtodo                |


