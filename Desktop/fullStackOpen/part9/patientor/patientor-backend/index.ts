import express from "express";
const app = express();
import cors from "cors";

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_request, response) => {
  response.send("HELLO THERE SIR");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
