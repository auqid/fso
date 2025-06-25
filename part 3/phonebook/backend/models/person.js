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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Format should be XX-XXXXXX or XXX-XXXXX with minimum 8 characters total.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
