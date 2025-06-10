import React from "react";

const Person = ({ persons }) => {
  console.log("persons", persons);
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} : {person.number}
        </p>
      ))}
    </div>
  );
};

export default Person;
