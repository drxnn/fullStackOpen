import { useState, useEffect } from "react";

import { Person } from "./Components/Persons";

import Notification from "./Components/Notification";

import Filter from "./Components/Filter";

import axios from "axios";

import PersonForm from "./Components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/persons").then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <div>
        <Filter persons={persons} setAppState={setFiltered} />
      </div>

      <h2>Add new:</h2>

      <PersonForm
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setFiltered={setFiltered}
        setNotification={setNotification}
      />
      <h2>Contact</h2>

      {filtered.length > 0
        ? filtered.map((x) => (
            <Person
              key={x.id}
              person={x}
              setPersons={setPersons}
              persons={persons}
              setNotification={setNotification}
            />
          ))
        : persons.map((x) => (
            <Person
              key={x.id}
              person={x}
              setPersons={setPersons}
              persons={persons}
              setNotification={setNotification}
            />
          ))}

      <div>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear the list?")) {
              setFiltered([]);
              setPersons([]);
            }
          }}
        >
          {" "}
          clear
        </button>
      </div>
    </div>
  );
};

export default App;
