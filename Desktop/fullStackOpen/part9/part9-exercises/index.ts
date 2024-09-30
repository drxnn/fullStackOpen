import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLO");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
