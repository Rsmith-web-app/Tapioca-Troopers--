const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const {MongoClient, ServerApiVersion, version} = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;


//Mongo Client setup
const client = MongoClient(connectionString, {
    ServerApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

//connect to MongoDb
const MongoConnect = async ()  => {
    try {
        client.connect();
        console.log('conneced to MongoDB')
    } catch (error) {
        console.log(`the following error occured: ${error}`)
    }
}

//Insert MongoDB Connection - Dani Baker
app.set('view engine', 'ejs');
//add mongodb connection logic


try {
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
} catch (error) {
    console.log(`something went wrong: ${error.message}`)
}