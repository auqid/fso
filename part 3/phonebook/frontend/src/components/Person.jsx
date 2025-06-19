import personService from "../services/numbers";
const Person = ({ persons, onDelete }) => {
  console.log("persons", persons);
  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name} ?`)) {
      onDelete(id);
    }
  };
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} : {person.number}
          </p>
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Person;
