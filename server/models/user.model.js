import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import {Schema} from 'mongoose';

//user model
const userSchema = new Schema({
  alias: {type: String, maxLength: [12, 'Alias cannot be longer thant 12 characters'], required: [true, 'An alias is required'], trim: true},
  email: {type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Enter a valid email'] },
  password: {type: String, required: true },
  avatar: {type: String, required: false},
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
});

const User = mongoose.model('User', userSchema);
export default User;