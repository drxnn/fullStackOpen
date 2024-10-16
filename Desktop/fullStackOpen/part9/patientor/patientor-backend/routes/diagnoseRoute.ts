import express from "express";
import diagnosesData from "../data/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnosesData);
});

export default diagnosesRouter;
