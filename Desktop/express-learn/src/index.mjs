import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "hello" });
});

app.get("/api/users", (req, res) => {
  res.send({ user: "1" });
});

app.listen(PORT, () => {
  console.log(` runnning on ${PORT}`);
});
