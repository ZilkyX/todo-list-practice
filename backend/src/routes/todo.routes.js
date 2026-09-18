import { Router } from "express";
import {
  createToDo,
  deleteToDo,
  getToDos,
  toggleToDo,
  updateToDo,
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getToDos);
router.post("/create", createToDo);
router.post("/toggle", toggleToDo);
router.put("/:id", updateToDo);
router.delete("/:id", deleteToDo);

export default router;
