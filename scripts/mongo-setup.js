const mongoose = require('mongoose');
(async function connectMongo(){
    const uri = "mongodb+srv://mongoemailtemp:FSD4nNFTYOLWn7g8@cluster0.4naee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.set('strictQuery', false);
    try {
      await mongoose.connect(uri);
    } catch (error) {
      throw new Error(error);
    }
    console.log("Mongo Connected");
})();