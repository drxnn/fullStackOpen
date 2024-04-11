import servicePerson from "../services/person";
import React from "react";
import HandleNotification from "./HandleNotification";

export const Person = ({ person, setPersons, persons, setNotification }) => {
  return (
    <li>
      {person.name} - {person.number}
      <button
        onClick={() => {
          window.confirm("are you sure you want to delete?")
            ? servicePerson
                .deleteUser(person.id)
                .then((response) => {
                  setPersons(persons.filter((el) => el.id !== person.id));

                  HandleNotification(
                    { setNotification },
                    `${person.name} successfully deleted`
                  );
                })
                .catch((error) => {
                  HandleNotification(
                    { setNotification },
                    `User has already been deleted from the server `
                  );
                  console.log(error);
                })
            : persons;
        }}
      >
        delete
      </button>
    </li>
  );
};
