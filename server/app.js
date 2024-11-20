import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";


dotenv.config();

const port = process.env.PORT || 3060;
const app = express();
const url = process.env.MONGO_DB_CONNECTION_STRING;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Verify and connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`The following error occurred: ${error}`));

// Post Routes
app.use('/api', postRoutes);

// Login Routes
app.use('/api', authRoutes);

try {
    app.listen(port, () => console.log(`Server started on port ${port}`));
} catch (error) {
    console.log(`An error occurred: ${error.message}`);
}
