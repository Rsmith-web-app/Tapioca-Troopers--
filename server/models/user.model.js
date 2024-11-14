const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//model for user accounts
const userSchema = new mongoose.Schema({
    username: { type: String, maxlength: [20, 'Username cannot exceed 20 characters'], required: [true, 'Username is required'], trim: true },
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']  },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

