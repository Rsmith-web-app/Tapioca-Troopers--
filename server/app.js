import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import  mongoose  from 'mongoose';
import express from 'express';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const url = process.env.MONGODB_CONNECTIONSTRING;

app.use(cors());


// verify and connect to MongoDB

mongoose.connect(url)
.then(() => console.log('connected to MongoDB'))
.catch((error) => `the following error occured: ${error}`)

try {
    app.listen(port, () => console.log(`server started on port ${port}`))
} catch (error) {
    console.log(`An error occured: ${error}`)
}