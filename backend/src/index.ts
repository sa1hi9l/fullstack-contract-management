import express from "express";
import cors from "cors";
import blueprintRoutes from "./routes/blueprint.routes";
import contractRoutes from "./routes/contract.routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/blueprints", blueprintRoutes);
app.use("/contracts", contractRoutes);

app.get("/health", (_, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
