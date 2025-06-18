const express = require("express");
const app = express();
const morgan = require("morgan");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

// get all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// get Total numbers of persons
app.get("/info", (request, response) => {
  const length = persons.length;
  const date = new Date();
  response.send(`<p>Phonebook has info for ${length} people <br/> ${date}</p>`);
});

//get Person by id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete person
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((x) => x.id !== id);
  response.status(202).end();
});

// add a person
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "Content missing",
    });
  }
  const nameExists = persons.find((x) => x.name === body.name);
  if (nameExists) {
    return response.status(404).json({
      error: "name must be unique",
    });
  }
  const person = {
    number: body.number,
    name: body.name,
    id: Math.floor(Math.random() * 10000).toString(),
  };

  persons = persons.concat(person);
  response.json(person);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
