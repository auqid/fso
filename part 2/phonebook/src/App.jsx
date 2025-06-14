import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Person from "./components/Person";
import personService from "./services/numbers";
import "./index.css";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        console.log(response);
        setPersons(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    const copyName = {
      name: newName,
      number: newNumber,
    };
    if (newName === "" || newNumber === "") {
      window.alert("Name or number cannot be empty");
      return;
    }

    if (persons.some((x) => x.name === newName)) {
      const id = persons.find((x) => x.name === newName).id;
      if (
        window.confirm(
          `${newName} already present, replace the old number with new one? `
        )
      ) {
        personService.update(id, copyName).then((response) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : response))
          );
          setNewName("");
          setNewNumber("");
          setSuccess("Person Replaced Successfully");
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        });
      }
      return;
    }

    personService.create(copyName).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
      setSuccess("Person Added Successfully");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    });
  };
  const handleDelete = (id) => {
    personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)));
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={success} />
      <Filter search={search} onChange={handleSearch} />

      <h1>add a new</h1>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Person persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
