import express from "express";
import homeRoutes from "./routes/home.routes.js";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT();

app.use("/api/todo", homeRoutes);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
