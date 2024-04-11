import React from "react";

import servicePerson from "../services/person";
import person from "../services/person";
import HandleNotification from "./HandleNotification";

const PersonForm = ({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setPersons,
  setFiltered,
  setNotification,
}) => {
  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const keyExists = persons.some(
      (object) => object.name === personObject.name
    );

    const target = persons.find((object) => {
      return object.name === personObject.name;
    });

    console.log(target, personObject);

    if (keyExists && target.number !== personObject.number) {
      return window.confirm(
        `${target.name} is already added to the phonebook, replace the old number with a new one?`
      )
        ? servicePerson
            .update(target.id, personObject)
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== target.id ? person : response.data
                )
              );

              HandleNotification(
                { setNotification },
                `${personObject.name}'s number successfully changed `
              );
            })
            .catch((error) => {
              HandleNotification(
                { setNotification },
                `${personObject.name} has been already deleted from the server `
              );
              console.log(error);
            })
        : target;
    } else if (keyExists) {
      HandleNotification(
        { setNotification },
        `${personObject.name} is already on the list `
      );

      return;
    } else {
      servicePerson
        .create(personObject)
        .then((response) => {
          console.log(response.data);
          setPersons(persons.concat(response.data));
          HandleNotification(
            { setNotification },
            `${personObject.name} successfully added to the list `
          );

          setNewName("");
          setNewNumber(" ");
          console.log(persons);
          setFiltered([]); // Reset filtered list
        })
        .catch((err) => {
          HandleNotification({ setNotification }, err.response.data.error);
        });
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
