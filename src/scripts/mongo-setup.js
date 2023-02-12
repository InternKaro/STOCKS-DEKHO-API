const mongoose = require('mongoose');
(async function connectMongo(){
    const uri = "mongodb+srv://test:test@cluster0.2xnfc.mongodb.net/?retryWrites=true&w=majority";
    mongoose.set('strictQuery', false);
    try {
      await mongoose.connect(uri);
    } catch (error) {
      throw new Error(error);
    }
    console.log("Mongo Connected");
})();
