import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { login, register } from "./controllers/auth";
import { errorHandler, notFoundHandler } from "./controllers/error";
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "./controllers/todos";
import { ensureCorrectUser } from "./middleware/auth";

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.post("/api/auth/login", login);
app.post("/api/auth/register", register);
app.post("/api/user/:userId/todos", ensureCorrectUser, createTodo);
app.get("/api/user/:userId/todos/", ensureCorrectUser, getTodos);
app.put("/api/user/:userId/todos/:id", ensureCorrectUser, updateTodo);
app.delete("/api/user/:userId/todos/:id", ensureCorrectUser, deleteTodo);
app.use(notFoundHandler);
app.use(errorHandler);

const IP = String(process.env.IP);
const PORT = Number(process.env.PORT);
app.listen(PORT, IP, () => {
    console.log(`App is running on ${IP}:${PORT}`);
});
