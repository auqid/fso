import React from "react";

const Filter = ({ search, onChange }) => {
  return (
    <>
      Filter shown with :<input value={search} onChange={onChange} />
    </>
  );
};

export default Filter;
