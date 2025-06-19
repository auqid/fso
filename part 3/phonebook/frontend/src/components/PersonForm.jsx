import React from "react";

const PersonForm = ({
  newName,
  handleChange,
  newNumber,
  handleNumberChange,
  addName,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleChange} />
        <br />
        number:{" "}
        <input value={newNumber} onChange={handleNumberChange} type="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
