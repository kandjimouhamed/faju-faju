const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    mongoose.set('strictQuery' , true)
    mongoose
      .connect(process.env.MONGO_URL, { autoIndex: false })
      .then((res) => console.log("Connected to mongoDB, Happy coding"))
      .catch(console.log);
  } catch (error) {
    console.error("Connextion DataBaseError" + error);
  }
};

module.exports = connectToMongoDB;
