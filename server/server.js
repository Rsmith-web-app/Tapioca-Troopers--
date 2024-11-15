const path = require('path');
const cors = require("cors");
const authRoutes = require('./routes/auth');
const postRoutes = require("./routes/Post")
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { error } = require('console');


app.use(express.json());
dotenv.config();
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

//Mongo Client setup
const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, { useUnifiedTopology: true, });
        console.log('connected to MongoDB')
    } catch (error) {
        console.log(`the following error occured: ${error}`) 
    }
}
connectToDB();
//Insert MongoDB Connection - Dani Baker
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors({ origin: "http://localhost:3000" }));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public folder



app.use('/api', authRoutes) // login and registration routes
app.use('/api', postRoutes); //Posts route



//add mongodb connection logic


try {
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
} catch (error) {
    console.log(`something went wrong: ${error.message}`)
}