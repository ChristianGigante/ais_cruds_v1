//DBConfig
const mongoose = require("mongoose");
const dbConfig = "mongodb://localhost:27017/dbShop";

mongoose.Promise = global.Promise;
console.log("Connecting to the Server..,");
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
).then(() => {
    console.log("Successfully connected to the database..,");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});