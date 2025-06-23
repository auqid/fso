const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((response) => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("cannot connect", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
