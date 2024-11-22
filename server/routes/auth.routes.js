import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const router = express.Router();

//Login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    //checks database for user
    try {
        const userCheck = await User.findOne({email});
        if (!userCheck) {return res.status(401).json({error: "invalid email or password"})};
        //validate password
        const isPassword = await bcrypt.compare(password, userCheck.password);
        if (!isPassword) {return res.status(401).json({error: "incorrect password"})};

        const jwtSecret = process.env.JWT_SECRET || "auth_code";
        //Generate a token
        const token = jwt.sign(
           { id: userCheck._id, alias: userCheck.alias},
            jwtSecret, {expiresIn: "1h"}
        );

        return res.status(200).json({alias: userCheck.alias, token });

    } catch (error) {
        return res.status(500).json({error: `${error}`})
    }
});

//Register
router.post('/register', async (req, res) => {
    let {alias, email, password } = req.body;

    try {
        if (!alias || typeof alias !== 'string' || alias.trim().length < 3) {
            return res.status(400).json({
                message: "alias must be at least 3 characters",
            });
        }

        if (!email || typeof alias !== 'string') {
            return res.status(400).json({error: 'Invalid email provided'});
        }
        if (!password || typeof password !== 'string' || password.trim().length < 6) {
            return res.status(400).json({error: "password must be longer that 6 characters"})
        }

        //checks for existing user
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }
        //check for duplicates
        const duplicateALias = await User.findOne({alias});
        if (duplicateALias) {return res.status(400).json({error: 'Alias taken, please try another one'})};

        //create a new user
        const newUser = new User({alias, email, password});
        await newUser.save()
        .then((data) => {res.status(201).json({message: `user ${data.alias} created`})})

    } catch (error) {
        console.log(`Registration failed due to error: ${error}`)
    }
});

export default router;