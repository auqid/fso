const Header = (props) => <h1>{props.course}</h1>;

const Total = (props) => {
  return <p>Total of {props.total}</p>;
};
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};
const Content = ({ name, exercises }) => {
  return (
    <div>
      <Part name={name} exercises={exercises} />
    </div>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  const total = parts.reduce((a, c) => a + c.exercises, 0);
  return (
    <>
      <Header course={name} />
      {parts.map((part) => (
        <Content name={part.name} exercises={part.exercises} />
      ))}
      <Total total={total} />
    </>
  );
};
export default Course;
