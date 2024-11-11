import mongoose from 'mongoose';

//model for user accounts
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    isVerified: {type: Boolean, default: false},
});

export const User = mongoose.model('User', userSchema);