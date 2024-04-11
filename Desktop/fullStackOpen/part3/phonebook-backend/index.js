const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/persons");

const PORT = process.env.PORT;
const app = express();

app.use(express.static("dist"));

const morgan = require("morgan");
app.use(cors());

morgan.token("person", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :person"
  )
);

app.use(express.json());

// const uuid = require("uuid");

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    console.log("people loaded");
    res.json(people);
  });
});

app.get("/info", (req, res) => {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const dateString = currentDate.toLocaleString("en-US", options);

  Person.countDocuments().then((count) =>
    res
      .send(
        `<h1>Phonebook has info for ${count} people</h1> <p>${dateString}</p>`
      )
      .end()
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end("Person does not exist");
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;
  try {
    const personExists = await Person.findOne({ name: body.name });
    if (personExists) {
      return res.status(400).json({ error: "Name already in phonebook" });
    }

    if (!body.name || !body.number) {
      return res.status(400).json({ error: "missing information" });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("WORKS");
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this.
app.use(errorHandler);
