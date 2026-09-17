import express from "express";
import homeRoutes from "./routes/home.routes.js";

const app = express();

app.use("/api/home", homeRoutes);

app.listen(5001, () => {
  console.log("Server is running on PORT:5000");
});
