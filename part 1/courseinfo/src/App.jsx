const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((x) => {
        return <Part part={x.name} exercises={x.exercises} />;
      })}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  console.log(total);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
