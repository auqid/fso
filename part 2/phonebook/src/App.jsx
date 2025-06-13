import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
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
    if (newName === "" || newNumber === "") {
      window.alert("Name or number cannot be empty");
      return;
    }
    if (persons.some((x) => x.name === newName)) {
      window.alert(`${newName} already present`);
      return;
    }

    const copyName = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    console.log(copyName);
    setPersons(persons.concat(copyName));
    setNewName("");
    setNewNumber("");
  };

  // Filter persons based on search input
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
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
      <Person persons={filteredPersons} />
    </div>
  );
};

export default App;
