const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGED":
      return action.payload.value;

    default:
      return state;
  }
};

export const filterAnecdotes = (value) => {
  return {
    type: "CHANGED",
    payload: { value },
  };
};

export default filterReducer;
