import express from "express";
import livrosRoutes from "./routes/livros.routes";

const app = express();
app.use(express.json());

app.use("/api/livros", livrosRoutes);

export default app;
