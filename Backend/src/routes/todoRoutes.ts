import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// all routes require authentication
router.use(authMiddleware);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
