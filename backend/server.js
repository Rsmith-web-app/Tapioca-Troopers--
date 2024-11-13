const path = require('path');
const authRoutes = require('./routes/auth');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const userModel = require('./models/user.model');
const { error } = require('console');



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

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public folder

app.get('/', (req, res) => {
    res.redirect('/login')
})
app.get('/login', (req, res) => {
    res.render('Login', { message: null });
});

app.use('/api', authRoutes)

//add mongodb connection logic


try {
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
} catch (error) {
    console.log(`something went wrong: ${error.message}`)
}