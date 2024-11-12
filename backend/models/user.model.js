const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//model for user accounts
const userSchema = new mongoose.Schema({
    username: {type: String, maxlength: [10], default: 'Anonymous', unique: true},
    name: {type: String, maxlength: [30]},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
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

