const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
const passwordOnly = process.argv.length === 3;
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
if (!passwordOnly && (!name || !number)) {
  console.log("Please provide both name and number");
  process.exit(1);
}
const url = `mongodb+srv://auqidirfan100:${password}@cluster0-test.icgy7b8.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0-test`;
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((response) => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log("error connecting to database", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
});

if (passwordOnly) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((x) => {
      console.log(x.name + " " + x.number);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((result) => {
    console.log(`added ${name} ${number} to phonebook`);
    mongoose.connection.close();
  });
}
